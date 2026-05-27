export function safeFilename(name, extension) {
  const base = String(name || "file-report")
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9_-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return `${base || "file-report"}-validation-report.${extension}`;
}

export function downloadBlob(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function buildSummaryText(report) {
  const issueLines = report.issues.slice(0, 6).map((issue) => `- ${issue.severity.toUpperCase()}: ${issue.title} - ${issue.detail}`);
  return [
    "VeriDataPro flat file validation report",
    `File: ${report.file.name}`,
    `Rows: ${report.structure.rows}`,
    `Columns: ${report.structure.columns}`,
    `Delimiter: ${report.structure.delimiterLabel}`,
    `Encoding: ${report.structure.encoding}`,
    `Header detected: ${report.structure.headerDetected ? "yes" : "no"}`,
    "",
    "Issues:",
    issueLines.join("\n") || "- No major issues",
    "",
    "Need to integrate this data into your systems? VeriDataPro can help."
  ].join("\n");
}

function escapePdfText(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[^\x20-\x7e]/g, "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

export function buildPdf(report) {
  const lines = buildSummaryText(report).split("\n").slice(0, 42);
  const textCommands = lines
    .map((line, index) => `${index === 0 ? "50 790 Td" : "0 -16 Td"} (${escapePdfText(line).slice(0, 92)}) Tj`)
    .join("\n");
  const stream = `BT\n/F1 11 Tf\n${textCommands}\nET`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

export async function copySummary(report) {
  const summary = buildSummaryText(report);
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(summary);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = summary;
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}
