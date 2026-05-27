const { SUPPORTED_LANGUAGES } = require("./scoringService");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEBSITE_PATTERN = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;

const ALLOWED = {
  systemsCount: new Set(["1-3", "4-7", "8-12", "13+"]),
  systemTypes: new Set(["odoo", "crm", "ecommerce", "finance", "spreadsheets", "databases", "internal", "support", "other"]),
  manualCopyFrequency: new Set(["rarely", "weekly", "daily", "multipleDaily"]),
  spreadsheetDependency: new Set(["low", "medium", "heavy"]),
  apiAvailability: new Set(["most", "some", "unknown", "none"]),
  sourceOfTruth: new Set(["clear", "mostly", "unclear", "none"]),
  dataQuality: new Set(["clean", "minor", "inconsistent", "poor"]),
  reportingConsistency: new Set(["consistent", "minorDifferences", "differentTeams", "manualReports"]),
  integrationReliability: new Set(["reliable", "occasional", "oftenBreak", "manualFixes"]),
  systemOwnership: new Set(["clearOwners", "someOwners", "unclear", "noOwner"]),
  upcomingMigration: new Set(["none", "ready", "plannedDataConcerns", "activePoorReadiness"]),
  companySize: new Set(["1-10", "11-50", "51-200", "201-1000", "1000+"]),
  timeline: new Set(["now", "1-3", "3-6", "exploring"])
};

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateEnum(value, field, errors) {
  const cleaned = cleanString(value);
  if (!ALLOWED[field].has(cleaned)) {
    errors[field] = "Choose a valid option.";
    return "";
  }
  return cleaned;
}

function validateApiReadinessSubmission(body) {
  const errors = {};
  const lead = body && typeof body.lead === "object" ? body.lead : {};
  const answers = body && typeof body.answers === "object" ? body.answers : {};
  const language = cleanString(body.language) || "en";
  const fullName = cleanString(lead.fullName);
  const email = cleanString(lead.email).toLowerCase();
  const company = cleanString(lead.company);
  const website = cleanString(lead.website);
  const biggestProblem = cleanString(answers.biggestProblem);

  if (!SUPPORTED_LANGUAGES.has(language)) errors.language = "Choose a supported language.";
  if (!fullName) errors.fullName = "Name is required.";
  if (fullName.length > 100) errors.fullName = "Name must be 100 characters or fewer.";
  if (!email) errors.email = "Business email is required.";
  if (email && (!EMAIL_PATTERN.test(email) || email.length > 160)) errors.email = "Enter a valid email address.";
  if (!company) errors.company = "Company is required.";
  if (company.length > 120) errors.company = "Company must be 120 characters or fewer.";
  if (website && (!WEBSITE_PATTERN.test(website) || website.length > 180)) errors.website = "Enter a valid website.";
  if (!biggestProblem) errors.biggestProblem = "Describe the biggest integration or automation problem.";
  if (biggestProblem.length > 600) errors.biggestProblem = "Keep the problem description under 600 characters.";

  const systemTypes = Array.isArray(answers.systemTypes) ? answers.systemTypes.map(cleanString).filter(Boolean) : [];
  if (systemTypes.length === 0) errors.systemTypes = "Choose at least one system type.";
  if (systemTypes.some((type) => !ALLOWED.systemTypes.has(type))) errors.systemTypes = "Choose only supported system types.";

  const data = {
    language,
    lead: {
      fullName,
      email,
      company,
      website,
      companySize: validateEnum(lead.companySize, "companySize", errors),
      timeline: validateEnum(lead.timeline, "timeline", errors)
    },
    answers: {
      systemsCount: validateEnum(answers.systemsCount, "systemsCount", errors),
      systemTypes: [...new Set(systemTypes)],
      manualCopyFrequency: validateEnum(answers.manualCopyFrequency, "manualCopyFrequency", errors),
      spreadsheetDependency: validateEnum(answers.spreadsheetDependency, "spreadsheetDependency", errors),
      apiAvailability: validateEnum(answers.apiAvailability, "apiAvailability", errors),
      sourceOfTruth: validateEnum(answers.sourceOfTruth, "sourceOfTruth", errors),
      dataQuality: validateEnum(answers.dataQuality, "dataQuality", errors),
      reportingConsistency: validateEnum(answers.reportingConsistency, "reportingConsistency", errors),
      integrationReliability: validateEnum(answers.integrationReliability, "integrationReliability", errors),
      systemOwnership: validateEnum(answers.systemOwnership, "systemOwnership", errors),
      upcomingMigration: validateEnum(answers.upcomingMigration, "upcomingMigration", errors),
      biggestProblem
    }
  };

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data
  };
}

module.exports = {
  validateApiReadinessSubmission
};
