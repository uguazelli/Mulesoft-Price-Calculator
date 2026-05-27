function normalizeBasePath(value = "/mulesoft-calculator") {
  const trimmed = String(value || "").trim();
  if (!trimmed || trimmed === "/") return "";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

module.exports = {
  normalizeBasePath
};
