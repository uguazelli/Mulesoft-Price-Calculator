const form = document.querySelector("#leadForm");
const resultPanel = document.querySelector("#resultPanel");
const formError = document.querySelector("#formError");
const preview = document.querySelector("#preview");
const utilizationInput = document.querySelector('input[name="utilizationPct"]');
const utilizationValue = document.querySelector("#utilizationValue");
const submitButton = form.querySelector('button[type="submit"]');

const footprintFields = [
  "deploymentModel",
  "commercialModel",
  "productionCores",
  "sandboxCores",
  "runningApplications",
  "managedApis",
  "renewalTimeline"
];

function getPayload() {
  const data = new FormData(form);
  return {
    deploymentModel: data.get("deploymentModel"),
    commercialModel: data.get("commercialModel"),
    productionCores: data.get("productionCores"),
    sandboxCores: data.get("sandboxCores"),
    runningApplications: data.get("runningApplications"),
    utilizationPct: data.get("utilizationPct"),
    managedApis: data.get("managedApis"),
    addons: data.getAll("addons"),
    renewalTimeline: data.get("renewalTimeline"),
    fullName: data.get("fullName"),
    email: data.get("email"),
    company: data.get("company")
  };
}

function updatePreview() {
  utilizationValue.value = utilizationInput.value;
  const data = new FormData(form);
  const footprintComplete = footprintFields.every((field) => data.get(field) !== "");
  preview.hidden = !footprintComplete;
}

function showError(message) {
  formError.textContent = message;
  formError.hidden = false;
}

function clearError() {
  formError.textContent = "";
  formError.hidden = true;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderResult(result) {
  const severityClass = result.risk.severity;
  const signals = result.signals
    .map(
      (signal) => `
        <li class="signal ${escapeHtml(signal.severity)}">
          <strong>${escapeHtml(signal.title)}</strong>
          <p>${escapeHtml(signal.message)}</p>
        </li>
      `
    )
    .join("");

  const recommendations = result.recommendations
    .map((recommendation) => `<li>${escapeHtml(recommendation)}</li>`)
    .join("");

  resultPanel.className = "result-panel";
  resultPanel.innerHTML = `
    <div class="score-card">
      <span class="mono">VDP / REPORT CAPTURED</span>
      <h2>${escapeHtml(result.risk.level)} utilization risk</h2>

      <div class="risk-row">
        <div class="risk-meter" style="--score: ${result.risk.score}">
          <span>${result.risk.score}</span>
        </div>
        <div>
          <span class="risk-pill ${escapeHtml(severityClass)}">${escapeHtml(result.risk.level)}</span>
          <p>${escapeHtml(result.disclaimer)}</p>
        </div>
      </div>

      <div class="waste-box">
        <strong>${result.waste.estimatedPercent}%</strong>
        <p>${escapeHtml(result.waste.message)}</p>
      </div>

      <div class="waste-box">
        <strong>${escapeHtml(result.footprint.deploymentModel)}</strong>
        <p>
          ${escapeHtml(result.footprint.commercialModel)} · ${escapeHtml(result.footprint.renewalTimeline)}
          · ${escapeHtml(result.footprint.totalCores)} total cores/vCores
        </p>
      </div>

      <div>
        <h3>Optimization signals</h3>
        <ul class="signal-list">${signals}</ul>
      </div>

      <div>
        <h3>Recommended actions</h3>
        <ul class="recommendations">${recommendations}</ul>
      </div>

      <div class="cta">
        <h3>${escapeHtml(result.cta.headline)}</h3>
        <p>${escapeHtml(result.cta.message)}</p>
        <div class="cta-actions">
          <a href="mailto:contact@veridatapro.com?subject=MuleSoft%20optimization%20audit">Request audit follow-up</a>
          <a href="https://veridatapro.com/" target="_blank" rel="noreferrer">Visit veridatapro.com</a>
        </div>
      </div>
    </div>
  `;
}

async function submitForm(event) {
  event.preventDefault();
  clearError();

  if (!form.checkValidity()) {
    form.reportValidity();
    showError("Complete the required fields to generate the report.");
    return;
  }

  submitButton.disabled = true;
  submitButton.querySelector("span").textContent = "Calculating...";

  try {
    const response = await fetch("/api/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(getPayload())
    });

    const body = await response.json();

    if (!response.ok) {
      const fieldErrors = body.fields ? Object.values(body.fields).join(" ") : body.error;
      throw new Error(fieldErrors || "Unable to calculate the report.");
    }

    renderResult(body.result);
    resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    showError(error.message || "Unable to calculate the report. Please try again.");
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector("span").textContent = "Calculate risk report";
  }
}

form.addEventListener("input", updatePreview);
form.addEventListener("change", updatePreview);
form.addEventListener("submit", submitForm);
updatePreview();
