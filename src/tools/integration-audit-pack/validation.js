const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEBSITE_PATTERN = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;

const ALLOWED = {
  language: new Set(["en", "pt", "es"]),
  companySize: new Set(["1-10", "11-50", "51-200", "201-1000", "1000+"]),
  timeline: new Set(["now", "1-3", "3-6", "exploring"])
};

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateIntegrationAuditPackRequest(body) {
  const errors = {};
  const language = cleanString(body.language) || "en";
  const fullName = cleanString(body.fullName);
  const email = cleanString(body.email).toLowerCase();
  const company = cleanString(body.company);
  const role = cleanString(body.role);
  const website = cleanString(body.website);
  const companySize = cleanString(body.companySize);
  const timeline = cleanString(body.timeline);
  const primaryChallenge = cleanString(body.primaryChallenge);

  if (!ALLOWED.language.has(language)) errors.language = "Choose a supported language.";
  if (!fullName) errors.fullName = "Name is required.";
  if (fullName.length > 100) errors.fullName = "Name must be 100 characters or fewer.";
  if (!email) errors.email = "Business email is required.";
  if (email && (!EMAIL_PATTERN.test(email) || email.length > 160)) errors.email = "Enter a valid email address.";
  if (!company) errors.company = "Company is required.";
  if (company.length > 120) errors.company = "Company must be 120 characters or fewer.";
  if (role.length > 120) errors.role = "Role must be 120 characters or fewer.";
  if (website && (!WEBSITE_PATTERN.test(website) || website.length > 180)) errors.website = "Enter a valid website.";
  if (!ALLOWED.companySize.has(companySize)) errors.companySize = "Choose a valid company size.";
  if (!ALLOWED.timeline.has(timeline)) errors.timeline = "Choose a valid timeline.";
  if (!primaryChallenge) errors.primaryChallenge = "Choose the main reason you want the audit pack.";
  if (primaryChallenge.length > 240) errors.primaryChallenge = "Keep the challenge under 240 characters.";

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: {
      language,
      fullName,
      email,
      company,
      role,
      website,
      companySize,
      timeline,
      primaryChallenge
    }
  };
}

module.exports = {
  validateIntegrationAuditPackRequest
};
