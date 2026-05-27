const path = require("node:path");
const { calculateAssessmentResult } = require("./scoringService");
const { validateApiReadinessSubmission } = require("./validation");
const { appendApiReadinessLead } = require("./store");

const API_READINESS_HTML_PATH = path.join("tools", "api-readiness", "index.html");

function mountApiReadinessApi(app, { basePath, csvPath }) {
  app.post(`${basePath || ""}/api/assess`, async (req, res, next) => {
    try {
      const validation = validateApiReadinessSubmission(req.body || {});
      if (!validation.valid) {
        return res.status(400).json({ error: "Validation failed.", fields: validation.errors });
      }

      const result = calculateAssessmentResult({
        language: validation.data.language,
        ...validation.data.answers
      });
      await appendApiReadinessLead(csvPath, validation.data, result, req.get("user-agent"));

      return res.json({ result });
    } catch (error) {
      return next(error);
    }
  });
}

module.exports = {
  API_READINESS_HTML_PATH,
  mountApiReadinessApi
};
