const { createApp, normalizeBasePath } = require("./app");

const port = Number(process.env.PORT || 3000);
const basePath = normalizeBasePath(process.env.BASE_PATH || "/mulesoft-calculator") || "/";
const app = createApp();

app.listen(port, () => {
  console.log(`MuleSoft calculator listening on http://localhost:${port}${basePath}`);
});
