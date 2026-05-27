function mountNotFoundHandler(app) {
  app.use((req, res) => {
    res.status(404).json({ error: "Not found." });
  });
}

function mountErrorHandler(app) {
  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: "Unexpected server error." });
  });
}

module.exports = {
  mountErrorHandler,
  mountNotFoundHandler
};
