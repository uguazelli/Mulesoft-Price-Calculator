const { DEPLOYMENT_LABELS, COMMERCIAL_MODEL_LABELS, RENEWAL_LABELS } = require("./calculator");

const ADDONS = new Set(["apiManager", "mq", "objectStore", "monitoring", "flexGateway", "other", "unsure"]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function parseNumber(value, field, errors, { integer = false, min = 0, max = 10000 } = {}) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    errors[field] = "Enter a valid number.";
    return 0;
  }

  if (number < min || number > max) {
    errors[field] = `Enter a number from ${min} to ${max}.`;
    return 0;
  }

  if (integer && !Number.isInteger(number)) {
    errors[field] = "Enter a whole number.";
    return 0;
  }

  return number;
}

function validateSubmission(body) {
  const errors = {};
  const fullName = cleanString(body.fullName);
  const email = cleanString(body.email).toLowerCase();
  const company = cleanString(body.company);
  const deploymentModel = cleanString(body.deploymentModel);
  const commercialModel = cleanString(body.commercialModel);
  const renewalTimeline = cleanString(body.renewalTimeline);
  const addons = Array.isArray(body.addons) ? body.addons.map(cleanString).filter(Boolean) : [];

  if (!fullName) errors.fullName = "Name is required.";
  if (fullName.length > 100) errors.fullName = "Name must be 100 characters or fewer.";

  if (!email) errors.email = "Business email is required.";
  if (email && (!EMAIL_PATTERN.test(email) || email.length > 160)) errors.email = "Enter a valid email address.";

  if (!company) errors.company = "Company is required.";
  if (company.length > 120) errors.company = "Company must be 120 characters or fewer.";

  if (!Object.hasOwn(DEPLOYMENT_LABELS, deploymentModel)) errors.deploymentModel = "Choose a deployment model.";
  if (!Object.hasOwn(COMMERCIAL_MODEL_LABELS, commercialModel)) errors.commercialModel = "Choose a commercial model.";
  if (!Object.hasOwn(RENEWAL_LABELS, renewalTimeline)) errors.renewalTimeline = "Choose a renewal timeline.";

  const productionCores = parseNumber(body.productionCores, "productionCores", errors, { min: 0, max: 10000 });
  const sandboxCores = parseNumber(body.sandboxCores, "sandboxCores", errors, { min: 0, max: 10000 });
  const runningApplications = parseNumber(body.runningApplications, "runningApplications", errors, {
    integer: true,
    min: 0,
    max: 10000
  });
  const utilizationPct = parseNumber(body.utilizationPct, "utilizationPct", errors, { min: 0, max: 100 });
  const managedApis = parseNumber(body.managedApis, "managedApis", errors, { integer: true, min: 0, max: 100000 });

  const invalidAddon = addons.find((addon) => !ADDONS.has(addon));
  if (invalidAddon) errors.addons = "Choose only supported add-ons.";

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: {
      fullName,
      email,
      company,
      deploymentModel,
      commercialModel,
      productionCores,
      sandboxCores,
      runningApplications,
      utilizationPct,
      managedApis,
      addons: [...new Set(addons)],
      renewalTimeline
    }
  };
}

module.exports = {
  validateSubmission
};
