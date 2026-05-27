const fs = require("node:fs/promises");
const path = require("node:path");

function escapeCsv(value) {
  const text = value === undefined || value === null ? "" : String(value);
  const escaped = text.replace(/"/g, '""');
  return /[",\n\r]/.test(escaped) ? `"${escaped}"` : escaped;
}

async function ensureCsv(filePath, headers) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, `${headers.join(",")}\n`, "utf8");
  }
}

module.exports = {
  ensureCsv,
  escapeCsv
};
