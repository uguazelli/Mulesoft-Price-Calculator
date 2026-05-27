const fs = require("node:fs");
const path = require("node:path");
const express = require("express");

function readToolHtml(publicDir, htmlPath, basePath) {
  const template = fs.readFileSync(path.join(publicDir, htmlPath), "utf8");
  return template.replaceAll("__BASE_PATH__", basePath || "");
}

function mountStaticTool(app, { basePath, publicDir, htmlPath }) {
  const html = readToolHtml(publicDir, htmlPath, basePath);

  if (basePath) {
    app.get(basePath, (req, res, next) => {
      if (req.path === basePath) {
        return res.redirect(308, `${basePath}/`);
      }
      return next();
    });
  }

  app.get(`${basePath || ""}/`, (req, res) => {
    res.type("html").send(html);
  });

  app.use(basePath || "/", express.static(publicDir, { index: false }));
}

function mountToolHealth(app, basePath) {
  app.get(`${basePath || ""}/health`, (req, res) => {
    res.json({ status: "ok", basePath: basePath || "/" });
  });
}

module.exports = {
  mountStaticTool,
  mountToolHealth,
  readToolHtml
};
