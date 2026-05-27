export const DELIMITERS = {
  comma: { char: ",", labelKey: "delimiter.comma" },
  pipe: { char: "|", labelKey: "delimiter.pipe" },
  semicolon: { char: ";", labelKey: "delimiter.semicolon" },
  tab: { char: "\t", labelKey: "delimiter.tab" },
  space: { char: " ", labelKey: "delimiter.space" },
  fixed: { char: null, labelKey: "delimiter.fixed" }
};

const TYPE_KEYS = ["integer", "decimal", "date", "boolean", "string"];
const ISSUE_WEIGHT = { error: 0, warning: 1, info: 2 };

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function decodeBuffer(buffer) {
  const bytes = new Uint8Array(buffer);
  const startsWithUtf8Bom = bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf;
  const isAscii = bytes.every((byte) => byte <= 0x7f);

  if (startsWithUtf8Bom) {
    return {
      text: new TextDecoder("utf-8").decode(bytes.slice(3)),
      encoding: "UTF-8 BOM",
      fallback: false
    };
  }

  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return {
      text,
      encoding: isAscii ? "ASCII" : "UTF-8",
      fallback: false
    };
  } catch {
    return {
      text: new TextDecoder("windows-1252").decode(bytes),
      encoding: "Windows-1252 / Latin-1",
      fallback: true
    };
  }
}

function splitLines(text) {
  return text
    .replace(/\u0000/g, "")
    .split(/\r\n|\n|\r/)
    .filter((line, index, lines) => line.length > 0 || index < lines.length - 1);
}

function parseDelimitedLine(line, delimiterKey) {
  if (delimiterKey === "space") {
    return line.trim().length ? line.trim().split(/\s+/) : [""];
  }

  const delimiter = DELIMITERS[delimiterKey].char;
  const cells = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === delimiter && !inQuotes) {
      cells.push(cell.trim());
      cell = "";
      continue;
    }

    cell += char;
  }

  cells.push(cell.trim());
  return cells;
}

function mode(values) {
  const counts = new Map();
  values.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || 0;
}

function scoreDelimiter(lines, delimiterKey) {
  const counts = lines.map((line) => parseDelimitedLine(line, delimiterKey).length);
  const expected = mode(counts);
  const consistent = counts.filter((count) => count === expected).length / Math.max(counts.length, 1);
  const avg = counts.reduce((sum, count) => sum + count, 0) / Math.max(counts.length, 1);

  return {
    delimiterKey,
    expected,
    consistent,
    score: expected > 1 ? expected * consistent + avg * 0.15 : 0
  };
}

function detectFixedBoundaries(lines) {
  const maxLength = Math.max(...lines.map((line) => line.length), 0);
  if (maxLength < 8 || lines.length < 2) return [];

  const blankPositions = [];
  for (let index = 0; index < maxLength; index += 1) {
    const blankCount = lines.filter((line) => !line[index] || /\s/.test(line[index])).length;
    if (blankCount / lines.length >= 0.82) blankPositions.push(index);
  }

  const groups = [];
  blankPositions.forEach((position) => {
    const current = groups.at(-1);
    if (current && position === current.end + 1) {
      current.end = position;
    } else {
      groups.push({ start: position, end: position });
    }
  });

  const breaks = groups
    .filter((group) => group.end - group.start >= 1 && group.start > 0 && group.end < maxLength - 1)
    .map((group) => group.end + 1);

  return [0, ...breaks, maxLength].filter((value, index, list) => index === 0 || value > list[index - 1]);
}

function parseFixedLine(line, boundaries) {
  return boundaries.slice(0, -1).map((start, index) => line.slice(start, boundaries[index + 1]).trim());
}

function detectDelimiter(lines, override) {
  const sample = lines.filter((line) => line.trim()).slice(0, 50);
  if (override && override !== "auto") {
    const boundaries = override === "fixed" ? detectFixedBoundaries(sample) : [];
    return { key: override, boundaries };
  }

  const candidates = ["comma", "pipe", "semicolon", "tab", "space"].map((key) => scoreDelimiter(sample, key));
  const best = candidates.sort((a, b) => b.score - a.score)[0];
  const boundaries = detectFixedBoundaries(sample);
  const fixedScore = boundaries.length > 2 ? (boundaries.length - 1) * 0.9 : 0;

  if ((!best || best.score < 1.8) && fixedScore > 1.6) {
    return { key: "fixed", boundaries };
  }

  return { key: best?.delimiterKey || "comma", boundaries: [] };
}

function parseRows(lines, delimiterInfo) {
  if (delimiterInfo.key === "fixed") {
    const boundaries = delimiterInfo.boundaries.length > 1 ? delimiterInfo.boundaries : detectFixedBoundaries(lines.slice(0, 50));
    return {
      boundaries,
      rows: lines.map((line, index) => ({ lineNumber: index + 1, raw: line, cells: parseFixedLine(line, boundaries) }))
    };
  }

  return {
    boundaries: [],
    rows: lines.map((line, index) => ({ lineNumber: index + 1, raw: line, cells: parseDelimitedLine(line, delimiterInfo.key) }))
  };
}

function getDateParts(value) {
  const trimmed = value.trim();
  const patterns = [
    { key: "YYYY-MM-DD", regex: /^(\d{4})-(\d{1,2})-(\d{1,2})$/, order: ["year", "month", "day"] },
    { key: "YYYY/MM/DD", regex: /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/, order: ["year", "month", "day"] },
    { key: "DD-MM-YYYY", regex: /^(\d{1,2})-(\d{1,2})-(\d{4})$/, order: ["day", "month", "year"] },
    { key: "DD/MM/YYYY", regex: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, order: ["day", "month", "year"] },
    { key: "MM/DD/YYYY", regex: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, order: ["month", "day", "year"] }
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern.regex);
    if (!match) continue;
    const parts = {};
    pattern.order.forEach((name, index) => {
      parts[name] = Number(match[index + 1]);
    });
    const date = new Date(parts.year, parts.month - 1, parts.day);
    const valid =
      date.getFullYear() === parts.year && date.getMonth() === parts.month - 1 && date.getDate() === parts.day;
    if (valid) return { format: pattern.key, ...parts };
  }

  return null;
}

function detectDateFormat(value) {
  return getDateParts(value)?.format || "";
}

function isDateLike(value) {
  return Boolean(getDateParts(value));
}

function inferCellType(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "empty";
  if (/^(true|false|yes|no|sim|não|nao|si)$/i.test(trimmed)) return "boolean";
  if (/^[+-]?\d+$/.test(trimmed)) return "integer";
  if (/^[+-]?(?:\d+\.\d+|\d+,\d+)$/.test(trimmed)) return "decimal";
  if (isDateLike(trimmed)) return "date";
  return "string";
}

function detectHeader(rows, expectedColumns) {
  if (rows.length < 2 || expectedColumns < 2) return false;
  const first = rows[0].cells.slice(0, expectedColumns);
  const rest = rows.slice(1, 6).flatMap((row) => row.cells.slice(0, expectedColumns));
  const firstNonEmpty = first.filter(Boolean);
  const firstStringRatio = first.filter((cell) => inferCellType(cell) === "string").length / expectedColumns;
  const uniqueFirst = new Set(firstNonEmpty.map((cell) => cell.toLowerCase())).size === firstNonEmpty.length;
  const dataHasTypes = rest.some((cell) => {
    const type = inferCellType(cell);
    return type !== "string" && type !== "empty";
  });

  return firstNonEmpty.length === expectedColumns && firstStringRatio >= 0.75 && uniqueFirst && dataHasTypes;
}

function buildColumns(rows, hasHeader, expectedColumns) {
  const header = hasHeader ? rows[0].cells : [];
  const dataRows = hasHeader ? rows.slice(1) : rows;

  return Array.from({ length: expectedColumns }, (_, index) => {
    const name = hasHeader && header[index] ? header[index] : `Column ${index + 1}`;
    const values = dataRows.map((row) => (row.cells[index] === undefined ? "" : row.cells[index]));
    const nonEmpty = values.filter((value) => String(value).trim() !== "");
    const typeCounts = TYPE_KEYS.reduce((memo, key) => ({ ...memo, [key]: 0 }), {});
    const dateFormats = new Set();

    nonEmpty.forEach((value) => {
      const type = inferCellType(value);
      if (type !== "empty") typeCounts[type] += 1;
      if (type === "date") dateFormats.add(detectDateFormat(value));
    });

    const numericOnly = typeCounts.integer + typeCounts.decimal === nonEmpty.length && nonEmpty.length > 0;
    const dominant = numericOnly
      ? typeCounts.decimal > 0
        ? "decimal"
        : "integer"
      : Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0][0];
    const dominantCount = numericOnly ? nonEmpty.length : typeCounts[dominant];
    const mixedTypes =
      nonEmpty.length > 0 && !numericOnly && Object.values(typeCounts).filter(Boolean).length > 1 && dominantCount / nonEmpty.length < 0.9;

    return {
      index: index + 1,
      name,
      type: nonEmpty.length ? dominant : "empty",
      nulls: values.length - nonEmpty.length,
      uniqueValues: new Set(nonEmpty).size,
      samples: [...new Set(nonEmpty)].slice(0, 4),
      mixedTypes,
      dateFormats: [...dateFormats]
    };
  });
}

function addIssue(issues, t, severity, titleKey, detailKey, values = {}) {
  issues.push({
    severity,
    title: t(titleKey),
    detail: t(detailKey, values)
  });
}

function detectLengthOutliers(rows) {
  const lengths = rows.map((row) => row.raw.length).filter((length) => length > 0);
  const avg = lengths.reduce((sum, length) => sum + length, 0) / Math.max(lengths.length, 1);
  if (!avg) return [];
  return rows.filter((row) => row.raw.length > avg * 1.8 || row.raw.length < avg * 0.35).map((row) => row.lineNumber);
}

export function analyzeText(file, text, encodingInfo, override, t) {
  const lines = splitLines(text);
  if (!lines.some((line) => line.trim())) throw new Error(t("errors.empty"));

  const delimiterInfo = detectDelimiter(lines, override);
  const parsed = parseRows(lines, delimiterInfo);
  const rows = parsed.rows;
  const columnCounts = rows.map((row) => row.cells.length);
  const expectedColumns = Math.max(mode(columnCounts), 1);
  const hasHeader = detectHeader(rows, expectedColumns);
  const columns = buildColumns(rows, hasHeader, expectedColumns);
  const issues = [];

  if (encodingInfo.fallback) {
    addIssue(issues, t, "warning", "issue.encodingTitle", "issue.encodingDetail", { encoding: encodingInfo.encoding });
  }

  if (/[\u0001-\u0008\u000b\u000c\u000e-\u001f\ufffd]/.test(text)) {
    addIssue(issues, t, "warning", "issue.controlTitle", "issue.controlDetail");
  }

  const wrongColumnRows = rows.filter((row) => row.cells.length !== expectedColumns).map((row) => row.lineNumber);
  if (wrongColumnRows.length) {
    addIssue(issues, t, "error", "issue.columnsTitle", "issue.columnsDetail", {
      count: wrongColumnRows.length,
      expected: expectedColumns,
      rows: wrongColumnRows.slice(0, 8).join(", ")
    });
  }

  const columnsWithNulls = columns.filter((column) => column.nulls > 0);
  if (columnsWithNulls.length) {
    addIssue(issues, t, "warning", "issue.nullsTitle", "issue.nullsDetail", {
      columns: columnsWithNulls.map((column) => `${column.name} (${column.nulls})`).join(", ")
    });
  }

  const mixedColumns = columns.filter((column) => column.mixedTypes);
  if (mixedColumns.length) {
    addIssue(issues, t, "warning", "issue.mixedTitle", "issue.mixedDetail", {
      columns: mixedColumns.map((column) => column.name).join(", ")
    });
  }

  const dateColumns = columns.filter((column) => column.dateFormats.length > 1);
  if (dateColumns.length) {
    addIssue(issues, t, "warning", "issue.datesTitle", "issue.datesDetail", {
      columns: dateColumns.map((column) => `${column.name} (${column.dateFormats.join(" / ")})`).join(", ")
    });
  }

  const seenRows = new Map();
  const duplicateRows = [];
  rows.slice(hasHeader ? 1 : 0).forEach((row) => {
    const key = row.cells.map((cell) => String(cell).trim()).join("\u001f");
    if (seenRows.has(key)) duplicateRows.push(row.lineNumber);
    seenRows.set(key, true);
  });
  if (duplicateRows.length) {
    addIssue(issues, t, "warning", "issue.duplicatesTitle", "issue.duplicatesDetail", {
      count: duplicateRows.length,
      rows: duplicateRows.slice(0, 8).join(", ")
    });
  }

  const lengthOutliers = detectLengthOutliers(rows);
  if (lengthOutliers.length) {
    addIssue(issues, t, "warning", "issue.lengthTitle", "issue.lengthDetail", {
      count: lengthOutliers.length,
      rows: lengthOutliers.slice(0, 8).join(", ")
    });
  }

  addIssue(issues, t, "info", hasHeader ? "issue.headerTitle" : "issue.noHeaderTitle", hasHeader ? "issue.headerDetail" : "issue.noHeaderDetail");

  if (delimiterInfo.key === "fixed") {
    addIssue(issues, t, "info", "issue.fixedTitle", "issue.fixedDetail");
  }

  const sortedIssues = issues.sort((a, b) => ISSUE_WEIGHT[a.severity] - ISSUE_WEIGHT[b.severity]);

  return {
    generatedAt: new Date().toISOString(),
    file: {
      name: file.name,
      size: file.size,
      sizeLabel: formatBytes(file.size),
      lastModified: file.lastModified ? new Date(file.lastModified).toISOString() : ""
    },
    structure: {
      rows: rows.length,
      columns: expectedColumns,
      delimiter: delimiterInfo.key,
      delimiterLabel: t(DELIMITERS[delimiterInfo.key].labelKey),
      encoding: encodingInfo.encoding,
      headerDetected: hasHeader
    },
    issueCounts: {
      error: sortedIssues.filter((issue) => issue.severity === "error").length,
      warning: sortedIssues.filter((issue) => issue.severity === "warning").length,
      info: sortedIssues.filter((issue) => issue.severity === "info").length
    },
    columns,
    issues: sortedIssues,
    previewRows: rows.slice(0, 10).map((row) => ({ lineNumber: row.lineNumber, cells: row.cells.slice(0, expectedColumns) }))
  };
}
