const path = require("node:path");
const { calculateAssessment } = require("./calculator");
const { appendLead } = require("./store");
const { validateSubmission } = require("./validation");

const MULESOFT_CALCULATOR_HTML_PATH = path.join("tools", "mulesoft-calculator", "index.html");

function mountMulesoftCalculatorApi(app, { basePath, leadsCsvPath }) {
  app.post(`${basePath || ""}/api/calculate`, async (req, res, next) => {
    try {
      const validation = validateSubmission(req.body || {});
      if (!validation.valid) {
        return res.status(400).json({ error: "Validation failed.", fields: validation.errors });
      }

      const result = calculateAssessment(validation.data);
      await appendLead(leadsCsvPath, validation.data, result, req.get("user-agent"));

      return res.json({ result });
    } catch (error) {
      return next(error);
    }
  });
}

module.exports = {
  MULESOFT_CALCULATOR_HTML_PATH,
  mountMulesoftCalculatorApi
};
