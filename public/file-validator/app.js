const fileInput = document.querySelector("#fileInput");
const dropZone = document.querySelector("#dropZone");
const delimiterOverride = document.querySelector("#delimiterOverride");
const fileMeta = document.querySelector("#fileMeta");
const fileError = document.querySelector("#fileError");
const previewSection = document.querySelector("#previewSection");
const previewTable = document.querySelector("#previewTable");
const columnsTable = document.querySelector("#columnsTable");
const detailsSection = document.querySelector("#detailsSection");
const resultPanel = document.querySelector("#resultPanel");
const languageButtons = document.querySelectorAll("[data-language-button]");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector("[data-menu-toggle]");
const headerMenu = document.querySelector("[data-header-menu]");

const LANGUAGES = new Set(["en", "pt", "es"]);
const HTML_LANG = {
  en: "en",
  pt: "pt-BR",
  es: "es-419"
};

const DELIMITERS = {
  comma: { char: ",", labelKey: "delimiter.comma" },
  pipe: { char: "|", labelKey: "delimiter.pipe" },
  semicolon: { char: ";", labelKey: "delimiter.semicolon" },
  tab: { char: "\t", labelKey: "delimiter.tab" },
  space: { char: " ", labelKey: "delimiter.space" },
  fixed: { char: null, labelKey: "delimiter.fixed" }
};

const TYPE_KEYS = ["integer", "decimal", "date", "boolean", "string"];
const ISSUE_WEIGHT = { error: 0, warning: 1, info: 2 };

const TRANSLATIONS = {
  en: {
    "meta.title": "Flat File Validation Tool | VeriDataPro",
    "meta.description":
      "Client-side flat file structure analysis and validation for CSV, TXT, DAT, fixed-width, and delimited files.",
    "brand.subtitle": "Data integration readiness",
    "header.note": "Browser-side file analysis",
    "menu.open": "Open menu",
    "menu.close": "Close menu",
    "hero.eyebrow": "Flat file validation",
    "hero.title": "Inspect messy files before they break an integration",
    "hero.lede":
      "Drop a CSV, TXT, DAT, pipe-delimited, space-delimited, or fixed-width file and get a structure and quality report in seconds.",
    "hero.detectTitle": "Format detection",
    "hero.detectText": "Delimiter, encoding, headers",
    "hero.qualityTitle": "Data quality",
    "hero.qualityText": "Types, nulls, duplicates",
    "hero.exportTitle": "Exportable report",
    "hero.exportText": "Download JSON or PDF",
    "hero.privacy": "Files are analyzed in your browser. They are not uploaded to VeriDataPro or saved on this server.",
    "hero.scrollCue": "Analyze a file",
    "upload.title": "Upload a flat file",
    "upload.text": "The tool reads the file locally and detects the structure automatically.",
    "upload.dropTitle": "Drag a file here or choose one",
    "upload.dropText": "CSV, TXT, DAT, tab, pipe, semicolon, space, or fixed-width",
    "upload.override": "Delimiter override",
    "delimiter.auto": "Auto-detect",
    "delimiter.comma": "Comma",
    "delimiter.pipe": "Pipe",
    "delimiter.semicolon": "Semicolon",
    "delimiter.tab": "Tab",
    "delimiter.space": "Space",
    "delimiter.fixed": "Fixed-width",
    "preview.title": "First 10 rows",
    "preview.text": "A quick preview helps confirm the detected structure.",
    "columns.title": "Column breakdown",
    "columns.text": "Types, nulls, unique values, and samples per column.",
    "result.emptyKicker": "VDP / FILE CHECK",
    "result.emptyTitle": "Validation report",
    "result.emptyText": "Upload a file to inspect structure, delimiter, encoding, data types, nulls, duplicates, and row anomalies.",
    "result.emptyOne": "Delimiter and encoding detection",
    "result.emptyTwo": "Column-by-column profiling",
    "result.emptyThree": "Downloadable report",
    "result.kicker": "VDP / FILE REPORT",
    "result.summary": "Summary",
    "result.issues": "Ranked issues",
    "result.noIssues": "No major issues detected in the sampled structure.",
    "result.exports": "Export report",
    "result.downloadJson": "Download JSON",
    "result.downloadPdf": "Download PDF",
    "result.copySummary": "Copy summary",
    "result.copied": "Summary copied.",
    "result.ctaTitle": "Need to integrate this data into your systems?",
    "result.ctaText": "Veridata can help. Book a free 30-min call to review the file, target systems, and integration path.",
    "result.ctaButton": "Book a free 30-min call",
    "metric.fileSize": "File size",
    "metric.rows": "Rows",
    "metric.columns": "Columns",
    "metric.delimiter": "Delimiter",
    "metric.encoding": "Encoding",
    "metric.header": "Header",
    "metric.yes": "Yes",
    "metric.no": "No",
    "metric.errors": "Errors",
    "metric.warnings": "Warnings",
    "metric.info": "Info",
    "table.column": "Column",
    "table.type": "Type",
    "table.nulls": "Nulls",
    "table.unique": "Unique",
    "table.samples": "Samples",
    "type.integer": "integer",
    "type.decimal": "decimal",
    "type.date": "date",
    "type.boolean": "boolean",
    "type.string": "string",
    "type.empty": "empty",
    "severity.error": "error",
    "severity.warning": "warning",
    "severity.info": "info",
    "issue.encodingTitle": "Encoding fallback used",
    "issue.encodingDetail": "The file was not valid UTF-8 and was decoded as {encoding}. Verify special characters before integration.",
    "issue.controlTitle": "Possible encoding or control characters",
    "issue.controlDetail": "Unexpected control characters were found in the file content.",
    "issue.columnsTitle": "Rows with wrong number of columns",
    "issue.columnsDetail": "{count} row(s) do not match the expected {expected} columns. First rows: {rows}.",
    "issue.nullsTitle": "Empty fields detected",
    "issue.nullsDetail": "{columns} contain empty values.",
    "issue.mixedTitle": "Mixed data types",
    "issue.mixedDetail": "{columns} contain more than one likely data type.",
    "issue.datesTitle": "Date format inconsistencies",
    "issue.datesDetail": "{columns} contain multiple date formats.",
    "issue.duplicatesTitle": "Duplicate rows detected",
    "issue.duplicatesDetail": "{count} duplicate row(s) found. First rows: {rows}.",
    "issue.lengthTitle": "Rows with unusual length",
    "issue.lengthDetail": "{count} row(s) are much shorter or longer than average. First rows: {rows}.",
    "issue.headerTitle": "Header row detected",
    "issue.headerDetail": "The first row appears to contain column names.",
    "issue.noHeaderTitle": "No clear header detected",
    "issue.noHeaderDetail": "Columns are labeled by position because row 1 looks like data.",
    "issue.fixedTitle": "Fixed-width parsing is approximate",
    "issue.fixedDetail": "Column breaks were inferred from whitespace patterns. Confirm the preview before using the output.",
    "file.name": "Name",
    "file.modified": "Modified",
    "errors.read": "Unable to read this file.",
    "errors.empty": "This file appears to be empty.",
    "errors.noFile": "Choose a file first."
  },
  pt: {
    "meta.title": "Validador de arquivos flat | VeriDataPro",
    "meta.description": "Analise estrutura e qualidade de CSV, TXT, DAT, fixo e delimitado direto no navegador.",
    "brand.subtitle": "Prontidão de dados para integração",
    "header.note": "Análise local no navegador",
    "menu.open": "Abrir menu",
    "menu.close": "Fechar menu",
    "hero.eyebrow": "Validação de arquivo flat",
    "hero.title": "Revise arquivos confusos antes que eles quebrem uma integração",
    "hero.lede":
      "Envie um CSV, TXT, DAT, arquivo com pipe, espaços ou largura fixa e receba um relatório de estrutura e qualidade em segundos.",
    "hero.detectTitle": "Formato",
    "hero.detectText": "Delimitador, encoding, cabeçalho",
    "hero.qualityTitle": "Qualidade dos dados",
    "hero.qualityText": "Tipos, vazios, duplicados",
    "hero.exportTitle": "Relatório exportável",
    "hero.exportText": "Baixe JSON ou PDF",
    "hero.privacy": "Os arquivos são analisados no seu navegador. Eles não são enviados para a VeriDataPro nem salvos neste servidor.",
    "hero.scrollCue": "Analisar arquivo",
    "upload.title": "Envie um arquivo flat",
    "upload.text": "A ferramenta lê o arquivo localmente e detecta a estrutura automaticamente.",
    "upload.dropTitle": "Arraste um arquivo aqui ou escolha um",
    "upload.dropText": "CSV, TXT, DAT, tab, pipe, ponto e vírgula, espaço ou largura fixa",
    "upload.override": "Ajustar delimitador",
    "delimiter.auto": "Detectar automaticamente",
    "delimiter.comma": "Vírgula",
    "delimiter.pipe": "Pipe",
    "delimiter.semicolon": "Ponto e vírgula",
    "delimiter.tab": "Tab",
    "delimiter.space": "Espaço",
    "delimiter.fixed": "Largura fixa",
    "preview.title": "Primeiras 10 linhas",
    "preview.text": "A prévia ajuda a confirmar se a estrutura foi detectada corretamente.",
    "columns.title": "Detalhe das colunas",
    "columns.text": "Tipos, vazios, valores únicos e amostras por coluna.",
    "result.emptyKicker": "VDP / CHECAGEM DE ARQUIVO",
    "result.emptyTitle": "Relatório de validação",
    "result.emptyText": "Envie um arquivo para revisar estrutura, delimitador, encoding, tipos, vazios, duplicados e anomalias.",
    "result.emptyOne": "Detecção de delimitador e encoding",
    "result.emptyTwo": "Perfil de cada coluna",
    "result.emptyThree": "Relatório para baixar",
    "result.kicker": "VDP / RELATÓRIO",
    "result.summary": "Resumo",
    "result.issues": "Pontos encontrados",
    "result.noIssues": "Nenhum problema relevante foi detectado na estrutura analisada.",
    "result.exports": "Exportar relatório",
    "result.downloadJson": "Baixar JSON",
    "result.downloadPdf": "Baixar PDF",
    "result.copySummary": "Copiar resumo",
    "result.copied": "Resumo copiado.",
    "result.ctaTitle": "Precisa integrar estes dados aos seus sistemas?",
    "result.ctaText": "A Veridata pode ajudar. Agende uma conversa gratuita de 30 minutos para revisar o arquivo, os sistemas de destino e o caminho de integração.",
    "result.ctaButton": "Agendar conversa de 30 min",
    "metric.fileSize": "Tamanho",
    "metric.rows": "Linhas",
    "metric.columns": "Colunas",
    "metric.delimiter": "Delimitador",
    "metric.encoding": "Encoding",
    "metric.header": "Cabeçalho",
    "metric.yes": "Sim",
    "metric.no": "Não",
    "metric.errors": "Erros",
    "metric.warnings": "Avisos",
    "metric.info": "Info",
    "table.column": "Coluna",
    "table.type": "Tipo",
    "table.nulls": "Vazios",
    "table.unique": "Únicos",
    "table.samples": "Amostras",
    "type.integer": "inteiro",
    "type.decimal": "decimal",
    "type.date": "data",
    "type.boolean": "booleano",
    "type.string": "texto",
    "type.empty": "vazio",
    "severity.error": "erro",
    "severity.warning": "aviso",
    "severity.info": "info",
    "issue.encodingTitle": "Encoding alternativo usado",
    "issue.encodingDetail": "O arquivo não era UTF-8 válido e foi lido como {encoding}. Revise caracteres especiais antes da integração.",
    "issue.controlTitle": "Possíveis caracteres de encoding ou controle",
    "issue.controlDetail": "Foram encontrados caracteres de controle inesperados no conteúdo.",
    "issue.columnsTitle": "Linhas com número incorreto de colunas",
    "issue.columnsDetail": "{count} linha(s) não batem com as {expected} colunas esperadas. Primeiras linhas: {rows}.",
    "issue.nullsTitle": "Campos vazios detectados",
    "issue.nullsDetail": "{columns} têm valores vazios.",
    "issue.mixedTitle": "Tipos de dados misturados",
    "issue.mixedDetail": "{columns} têm mais de um tipo provável de dado.",
    "issue.datesTitle": "Formatos de data inconsistentes",
    "issue.datesDetail": "{columns} têm mais de um formato de data.",
    "issue.duplicatesTitle": "Linhas duplicadas detectadas",
    "issue.duplicatesDetail": "{count} linha(s) duplicada(s). Primeiras linhas: {rows}.",
    "issue.lengthTitle": "Linhas com tamanho fora do padrão",
    "issue.lengthDetail": "{count} linha(s) são muito menores ou maiores que a média. Primeiras linhas: {rows}.",
    "issue.headerTitle": "Cabeçalho detectado",
    "issue.headerDetail": "A primeira linha parece conter nomes de colunas.",
    "issue.noHeaderTitle": "Nenhum cabeçalho claro detectado",
    "issue.noHeaderDetail": "As colunas foram nomeadas pela posição porque a linha 1 parece conter dados.",
    "issue.fixedTitle": "A leitura de largura fixa é aproximada",
    "issue.fixedDetail": "As quebras de coluna foram inferidas por padrões de espaço. Confirme a prévia antes de usar o resultado.",
    "file.name": "Nome",
    "file.modified": "Modificado",
    "errors.read": "Não foi possível ler este arquivo.",
    "errors.empty": "Este arquivo parece estar vazio.",
    "errors.noFile": "Escolha um arquivo primeiro."
  },
  es: {
    "meta.title": "Validador de archivos planos | VeriDataPro",
    "meta.description": "Analiza estructura y calidad de CSV, TXT, DAT, fijo y delimitado desde el navegador.",
    "brand.subtitle": "Preparación de datos para integración",
    "header.note": "Análisis local en el navegador",
    "menu.open": "Abrir menú",
    "menu.close": "Cerrar menú",
    "hero.eyebrow": "Validación de archivo plano",
    "hero.title": "Revisa archivos problemáticos antes de que rompan una integración",
    "hero.lede":
      "Sube un CSV, TXT, DAT, archivo con pipe, espacios o ancho fijo y recibe un reporte de estructura y calidad en segundos.",
    "hero.detectTitle": "Formato",
    "hero.detectText": "Delimitador, encoding, encabezado",
    "hero.qualityTitle": "Calidad de datos",
    "hero.qualityText": "Tipos, vacíos, duplicados",
    "hero.exportTitle": "Reporte exportable",
    "hero.exportText": "Descarga JSON o PDF",
    "hero.privacy": "Los archivos se analizan en tu navegador. No se suben a VeriDataPro ni se guardan en este servidor.",
    "hero.scrollCue": "Analizar archivo",
    "upload.title": "Sube un archivo plano",
    "upload.text": "La herramienta lee el archivo localmente y detecta la estructura automáticamente.",
    "upload.dropTitle": "Arrastra un archivo aquí o elige uno",
    "upload.dropText": "CSV, TXT, DAT, tab, pipe, punto y coma, espacio o ancho fijo",
    "upload.override": "Ajustar delimitador",
    "delimiter.auto": "Detectar automáticamente",
    "delimiter.comma": "Coma",
    "delimiter.pipe": "Pipe",
    "delimiter.semicolon": "Punto y coma",
    "delimiter.tab": "Tab",
    "delimiter.space": "Espacio",
    "delimiter.fixed": "Ancho fijo",
    "preview.title": "Primeras 10 filas",
    "preview.text": "La vista previa ayuda a confirmar si la estructura fue detectada correctamente.",
    "columns.title": "Detalle de columnas",
    "columns.text": "Tipos, vacíos, valores únicos y muestras por columna.",
    "result.emptyKicker": "VDP / CHEQUEO DE ARCHIVO",
    "result.emptyTitle": "Reporte de validación",
    "result.emptyText": "Sube un archivo para revisar estructura, delimitador, encoding, tipos, vacíos, duplicados y anomalías.",
    "result.emptyOne": "Detección de delimitador y encoding",
    "result.emptyTwo": "Perfil de cada columna",
    "result.emptyThree": "Reporte descargable",
    "result.kicker": "VDP / REPORTE",
    "result.summary": "Resumen",
    "result.issues": "Puntos encontrados",
    "result.noIssues": "No se detectaron problemas relevantes en la estructura analizada.",
    "result.exports": "Exportar reporte",
    "result.downloadJson": "Descargar JSON",
    "result.downloadPdf": "Descargar PDF",
    "result.copySummary": "Copiar resumen",
    "result.copied": "Resumen copiado.",
    "result.ctaTitle": "¿Necesitas integrar estos datos a tus sistemas?",
    "result.ctaText": "Veridata puede ayudar. Agenda una llamada gratis de 30 minutos para revisar el archivo, los sistemas destino y el camino de integración.",
    "result.ctaButton": "Agendar llamada de 30 min",
    "metric.fileSize": "Tamaño",
    "metric.rows": "Filas",
    "metric.columns": "Columnas",
    "metric.delimiter": "Delimitador",
    "metric.encoding": "Encoding",
    "metric.header": "Encabezado",
    "metric.yes": "Sí",
    "metric.no": "No",
    "metric.errors": "Errores",
    "metric.warnings": "Avisos",
    "metric.info": "Info",
    "table.column": "Columna",
    "table.type": "Tipo",
    "table.nulls": "Vacíos",
    "table.unique": "Únicos",
    "table.samples": "Muestras",
    "type.integer": "entero",
    "type.decimal": "decimal",
    "type.date": "fecha",
    "type.boolean": "booleano",
    "type.string": "texto",
    "type.empty": "vacío",
    "severity.error": "error",
    "severity.warning": "aviso",
    "severity.info": "info",
    "issue.encodingTitle": "Encoding alternativo usado",
    "issue.encodingDetail": "El archivo no era UTF-8 válido y fue leído como {encoding}. Revisa caracteres especiales antes de integrarlo.",
    "issue.controlTitle": "Posibles caracteres de encoding o control",
    "issue.controlDetail": "Se encontraron caracteres de control inesperados en el contenido.",
    "issue.columnsTitle": "Filas con número incorrecto de columnas",
    "issue.columnsDetail": "{count} fila(s) no coinciden con las {expected} columnas esperadas. Primeras filas: {rows}.",
    "issue.nullsTitle": "Campos vacíos detectados",
    "issue.nullsDetail": "{columns} tienen valores vacíos.",
    "issue.mixedTitle": "Tipos de datos mezclados",
    "issue.mixedDetail": "{columns} tienen más de un tipo probable de dato.",
    "issue.datesTitle": "Formatos de fecha inconsistentes",
    "issue.datesDetail": "{columns} tienen más de un formato de fecha.",
    "issue.duplicatesTitle": "Filas duplicadas detectadas",
    "issue.duplicatesDetail": "{count} fila(s) duplicada(s). Primeras filas: {rows}.",
    "issue.lengthTitle": "Filas con longitud fuera de patrón",
    "issue.lengthDetail": "{count} fila(s) son mucho menores o mayores que el promedio. Primeras filas: {rows}.",
    "issue.headerTitle": "Encabezado detectado",
    "issue.headerDetail": "La primera fila parece contener nombres de columnas.",
    "issue.noHeaderTitle": "No se detectó un encabezado claro",
    "issue.noHeaderDetail": "Las columnas fueron nombradas por posición porque la fila 1 parece contener datos.",
    "issue.fixedTitle": "La lectura de ancho fijo es aproximada",
    "issue.fixedDetail": "Los cortes de columna se infirieron por patrones de espacio. Confirma la vista previa antes de usar el resultado.",
    "file.name": "Nombre",
    "file.modified": "Modificado",
    "errors.read": "No fue posible leer este archivo.",
    "errors.empty": "Este archivo parece estar vacío.",
    "errors.noFile": "Elige un archivo primero."
  }
};

let currentLanguage = localStorage.getItem("calculatorLanguage") || "en";
let currentFile = null;
let currentText = "";
let currentEncoding = null;
let currentReport = null;

function t(key, values = {}) {
  const text = TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS.en[key] || key;
  return Object.entries(values).reduce((memo, [name, value]) => memo.replaceAll(`{${name}}`, value), text);
}

function applyTranslations() {
  document.documentElement.lang = HTML_LANG[currentLanguage];
  document.title = t("meta.title");
  document.querySelector('meta[name="description"]').setAttribute("content", t("meta.description"));

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === currentLanguage));
  });

  syncMenuLabel();
}

function isMenuOpen() {
  return menuToggle?.getAttribute("aria-expanded") === "true";
}

function syncMenuLabel() {
  if (!menuToggle) return;
  menuToggle.setAttribute("aria-label", t(isMenuOpen() ? "menu.close" : "menu.open"));
}

function setMenuOpen(open) {
  if (!menuToggle || !siteHeader) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  siteHeader.classList.toggle("menu-open", open);
  syncMenuLabel();
}

function setLanguage(language) {
  if (!LANGUAGES.has(language)) return;
  currentLanguage = language;
  localStorage.setItem("calculatorLanguage", language);
  applyTranslations();
  clearError();

  if (currentFile && currentText && currentEncoding) {
    analyzeCurrentText();
  } else {
    renderEmptyResult();
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function showError(message) {
  fileError.textContent = message;
  fileError.hidden = false;
}

function clearError() {
  fileError.textContent = "";
  fileError.hidden = true;
}

function decodeBuffer(buffer) {
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
  return text.replace(/\u0000/g, "").split(/\r\n|\n|\r/).filter((line, index, lines) => line.length > 0 || index < lines.length - 1);
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
    const mixedTypes = nonEmpty.length > 0 && !numericOnly && Object.values(typeCounts).filter(Boolean).length > 1 && dominantCount / nonEmpty.length < 0.9;

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

function addIssue(issues, severity, titleKey, detailKey, values = {}) {
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
  return rows
    .filter((row) => row.raw.length > avg * 1.8 || row.raw.length < avg * 0.35)
    .map((row) => row.lineNumber);
}

function analyzeText(file, text, encodingInfo, override) {
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
    addIssue(issues, "warning", "issue.encodingTitle", "issue.encodingDetail", { encoding: encodingInfo.encoding });
  }

  if (/[\u0001-\u0008\u000b\u000c\u000e-\u001f\ufffd]/.test(text)) {
    addIssue(issues, "warning", "issue.controlTitle", "issue.controlDetail");
  }

  const wrongColumnRows = rows.filter((row) => row.cells.length !== expectedColumns).map((row) => row.lineNumber);
  if (wrongColumnRows.length) {
    addIssue(issues, "error", "issue.columnsTitle", "issue.columnsDetail", {
      count: wrongColumnRows.length,
      expected: expectedColumns,
      rows: wrongColumnRows.slice(0, 8).join(", ")
    });
  }

  const columnsWithNulls = columns.filter((column) => column.nulls > 0);
  if (columnsWithNulls.length) {
    addIssue(issues, "warning", "issue.nullsTitle", "issue.nullsDetail", {
      columns: columnsWithNulls.map((column) => `${column.name} (${column.nulls})`).join(", ")
    });
  }

  const mixedColumns = columns.filter((column) => column.mixedTypes);
  if (mixedColumns.length) {
    addIssue(issues, "warning", "issue.mixedTitle", "issue.mixedDetail", {
      columns: mixedColumns.map((column) => column.name).join(", ")
    });
  }

  const dateColumns = columns.filter((column) => column.dateFormats.length > 1);
  if (dateColumns.length) {
    addIssue(issues, "warning", "issue.datesTitle", "issue.datesDetail", {
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
    addIssue(issues, "warning", "issue.duplicatesTitle", "issue.duplicatesDetail", {
      count: duplicateRows.length,
      rows: duplicateRows.slice(0, 8).join(", ")
    });
  }

  const lengthOutliers = detectLengthOutliers(rows);
  if (lengthOutliers.length) {
    addIssue(issues, "warning", "issue.lengthTitle", "issue.lengthDetail", {
      count: lengthOutliers.length,
      rows: lengthOutliers.slice(0, 8).join(", ")
    });
  }

  addIssue(issues, "info", hasHeader ? "issue.headerTitle" : "issue.noHeaderTitle", hasHeader ? "issue.headerDetail" : "issue.noHeaderDetail");

  if (delimiterInfo.key === "fixed") {
    addIssue(issues, "info", "issue.fixedTitle", "issue.fixedDetail");
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

function renderEmptyResult() {
  resultPanel.className = "result-panel idle";
  resultPanel.innerHTML = `
    <div class="result-empty">
      <span class="mono">${escapeHtml(t("result.emptyKicker"))}</span>
      <h2>${escapeHtml(t("result.emptyTitle"))}</h2>
      <p>${escapeHtml(t("result.emptyText"))}</p>
      <ul class="empty-list">
        <li>${escapeHtml(t("result.emptyOne"))}</li>
        <li>${escapeHtml(t("result.emptyTwo"))}</li>
        <li>${escapeHtml(t("result.emptyThree"))}</li>
      </ul>
    </div>
  `;
  previewSection.hidden = true;
  detailsSection.hidden = true;
}

function renderFileMeta(report) {
  fileMeta.hidden = false;
  fileMeta.innerHTML = `
    <div class="meta-chip"><span>${escapeHtml(t("file.name"))}</span><strong>${escapeHtml(report.file.name)}</strong></div>
    <div class="meta-chip"><span>${escapeHtml(t("metric.fileSize"))}</span><strong>${escapeHtml(report.file.sizeLabel)}</strong></div>
    <div class="meta-chip"><span>${escapeHtml(t("metric.delimiter"))}</span><strong>${escapeHtml(report.structure.delimiterLabel)}</strong></div>
    <div class="meta-chip"><span>${escapeHtml(t("metric.encoding"))}</span><strong>${escapeHtml(report.structure.encoding)}</strong></div>
  `;
}

function renderPreview(report) {
  previewSection.hidden = false;
  const headerLabels = Array.from({ length: report.structure.columns }, (_, index) => {
    const column = report.columns[index];
    return column ? column.name : `Column ${index + 1}`;
  });

  const head = `<thead><tr><th>#</th>${headerLabels.map((name) => `<th>${escapeHtml(name)}</th>`).join("")}</tr></thead>`;
  const body = report.previewRows
    .map(
      (row) => `
        <tr>
          <td>${row.lineNumber}</td>
          ${headerLabels.map((_, index) => `<td>${escapeHtml(row.cells[index] || "")}</td>`).join("")}
        </tr>
      `
    )
    .join("");

  previewTable.innerHTML = `${head}<tbody>${body}</tbody>`;
}

function renderColumns(report) {
  detailsSection.hidden = false;
  const body = report.columns
    .map(
      (column) => `
        <tr>
          <td>${escapeHtml(column.name)}</td>
          <td>${escapeHtml(t(`type.${column.type}`))}</td>
          <td>${column.nulls}</td>
          <td>${column.uniqueValues}</td>
          <td>${escapeHtml(column.samples.join(", "))}</td>
        </tr>
      `
    )
    .join("");

  columnsTable.innerHTML = `
    <thead>
      <tr>
        <th>${escapeHtml(t("table.column"))}</th>
        <th>${escapeHtml(t("table.type"))}</th>
        <th>${escapeHtml(t("table.nulls"))}</th>
        <th>${escapeHtml(t("table.unique"))}</th>
        <th>${escapeHtml(t("table.samples"))}</th>
      </tr>
    </thead>
    <tbody>${body}</tbody>
  `;
}

function renderIssues(report) {
  if (!report.issues.length) {
    return `<li class="issue info"><strong>${escapeHtml(t("result.noIssues"))}</strong></li>`;
  }

  return report.issues
    .map(
      (issue) => `
        <li class="issue ${escapeHtml(issue.severity)}">
          <span class="severity-badge ${escapeHtml(issue.severity)}">${escapeHtml(t(`severity.${issue.severity}`))}</span>
          <strong>${escapeHtml(issue.title)}</strong>
          <span>${escapeHtml(issue.detail)}</span>
        </li>
      `
    )
    .join("");
}

function renderReport(report) {
  renderFileMeta(report);
  renderPreview(report);
  renderColumns(report);

  resultPanel.className = "result-panel";
  resultPanel.innerHTML = `
    <div class="score-card">
      <span class="mono">${escapeHtml(t("result.kicker"))}</span>
      <h2>${escapeHtml(report.file.name)}</h2>

      <div>
        <h3>${escapeHtml(t("result.summary"))}</h3>
        <div class="summary-grid">
          <div class="summary-metric"><span>${escapeHtml(t("metric.fileSize"))}</span><strong>${escapeHtml(report.file.sizeLabel)}</strong></div>
          <div class="summary-metric"><span>${escapeHtml(t("metric.rows"))}</span><strong>${report.structure.rows}</strong></div>
          <div class="summary-metric"><span>${escapeHtml(t("metric.columns"))}</span><strong>${report.structure.columns}</strong></div>
          <div class="summary-metric"><span>${escapeHtml(t("metric.delimiter"))}</span><strong>${escapeHtml(report.structure.delimiterLabel)}</strong></div>
          <div class="summary-metric"><span>${escapeHtml(t("metric.encoding"))}</span><strong>${escapeHtml(report.structure.encoding)}</strong></div>
          <div class="summary-metric"><span>${escapeHtml(t("metric.header"))}</span><strong>${escapeHtml(report.structure.headerDetected ? t("metric.yes") : t("metric.no"))}</strong></div>
        </div>
      </div>

      <div class="health-strip">
        <div class="health-item"><strong>${report.issueCounts.error}</strong><span>${escapeHtml(t("metric.errors"))}</span></div>
        <div class="health-item"><strong>${report.issueCounts.warning}</strong><span>${escapeHtml(t("metric.warnings"))}</span></div>
        <div class="health-item"><strong>${report.issueCounts.info}</strong><span>${escapeHtml(t("metric.info"))}</span></div>
      </div>

      <div>
        <h3>${escapeHtml(t("result.issues"))}</h3>
        <ul class="issues-list">${renderIssues(report)}</ul>
      </div>

      <div>
        <h3>${escapeHtml(t("result.exports"))}</h3>
        <div class="export-actions">
          <button type="button" data-export="json">${escapeHtml(t("result.downloadJson"))}</button>
          <button type="button" data-export="pdf">${escapeHtml(t("result.downloadPdf"))}</button>
          <button type="button" data-export="copy">${escapeHtml(t("result.copySummary"))}</button>
        </div>
      </div>

      <div class="cta">
        <h3>${escapeHtml(t("result.ctaTitle"))}</h3>
        <p>${escapeHtml(t("result.ctaText"))}</p>
        <div class="cta-actions">
          <a href="mailto:contact@veridatapro.com?subject=Flat%20file%20integration%20review">${escapeHtml(t("result.ctaButton"))}</a>
          <a href="https://veridatapro.com/" target="_blank" rel="noreferrer">veridatapro.com</a>
        </div>
      </div>
    </div>
  `;
}

function analyzeCurrentText() {
  try {
    clearError();
    const override = delimiterOverride.value || "auto";
    currentReport = analyzeText(currentFile, currentText, currentEncoding, override);
    delimiterOverride.disabled = false;
    renderReport(currentReport);
  } catch (error) {
    showError(error.message || t("errors.read"));
  }
}

async function handleFile(file) {
  if (!file) {
    showError(t("errors.noFile"));
    return;
  }

  try {
    clearError();
    currentFile = file;
    const buffer = await file.arrayBuffer();
    currentEncoding = decodeBuffer(buffer);
    currentText = currentEncoding.text;
    delimiterOverride.value = "auto";
    analyzeCurrentText();
  } catch (error) {
    showError(error.message || t("errors.read"));
  }
}

function safeFilename(name, extension) {
  const base = String(name || "file-report")
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9_-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return `${base || "file-report"}-validation-report.${extension}`;
}

function downloadBlob(filename, content, type) {
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

function buildSummaryText(report) {
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
    "Need to integrate this data into your systems? Veridata can help."
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

function buildPdf(report) {
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

async function copySummary(report) {
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

fileInput.addEventListener("change", () => {
  handleFile(fileInput.files[0]);
});

delimiterOverride.addEventListener("change", () => {
  if (currentFile && currentText) analyzeCurrentText();
});

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("drag-over");
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("drag-over");
  const file = event.dataTransfer.files[0];
  if (file) handleFile(file);
});

resultPanel.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-export]");
  if (!button || !currentReport) return;
  const action = button.dataset.export;

  if (action === "json") {
    downloadBlob(safeFilename(currentReport.file.name, "json"), JSON.stringify(currentReport, null, 2), "application/json");
  }

  if (action === "pdf") {
    downloadBlob(safeFilename(currentReport.file.name, "pdf"), buildPdf(currentReport), "application/pdf");
  }

  if (action === "copy") {
    await copySummary(currentReport);
    button.textContent = t("result.copied");
    window.setTimeout(() => {
      button.textContent = t("result.copySummary");
    }, 1600);
  }
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
    setMenuOpen(false);
  });
});

menuToggle?.addEventListener("click", () => {
  setMenuOpen(!isMenuOpen());
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

document.addEventListener("click", (event) => {
  if (!isMenuOpen()) return;
  if (siteHeader.contains(event.target)) {
    if (event.target.closest("[data-menu-toggle]")) return;
    if (event.target.closest("[data-header-menu]")) return;
  }
  setMenuOpen(false);
});

headerMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

setLanguage(LANGUAGES.has(currentLanguage) ? currentLanguage : "en");
