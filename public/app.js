const form = document.querySelector("#leadForm");
const resultPanel = document.querySelector("#resultPanel");
const formError = document.querySelector("#formError");
const preview = document.querySelector("#preview");
const utilizationInput = document.querySelector('input[name="utilizationPct"]');
const utilizationValue = document.querySelector("#utilizationValue");
const submitButton = form.querySelector('button[type="submit"]');
const submitLabel = submitButton.querySelector("[data-submit-label]");
const languageButtons = document.querySelectorAll("[data-language-button]");

const LANGUAGES = new Set(["en", "pt", "es"]);
const HTML_LANG = {
  en: "en",
  pt: "pt-BR",
  es: "es-419"
};

const TRANSLATIONS = {
  en: {
    "meta.title": "MuleSoft Cost & Utilization Risk Calculator | VeriDataPro",
    "meta.description": "A directional MuleSoft utilization and renewal risk calculator from VeriDataPro.",
    "brand.subtitle": "MuleSoft integration services",
    "header.note": "Directional signals, not official pricing",
    "hero.eyebrow": "MuleSoft cost review",
    "hero.title": "Find MuleSoft waste before renewal",
    "hero.lede":
      "Enter your footprint and get a directional view of paid capacity that may be idle, misallocated, or hard to defend in commercial conversations.",
    "hero.riskTitle": "Risk level",
    "hero.riskText": "Low to Critical",
    "hero.wasteTitle": "Waste estimate",
    "hero.wasteText": "Directional capacity review",
    "hero.actionsTitle": "Next actions",
    "hero.actionsText": "Audit recommendations",
    "hero.disclaimer":
      "This tool provides directional optimization signals, not official MuleSoft pricing. MuleSoft commercial terms may vary by legacy core/vCore contracts, flow/message packaging, deployment model, Salesforce bundle, and negotiated terms.",
    "form.usageTitle": "MuleSoft usage",
    "form.usageText": "Best estimates are enough for a first-pass risk signal.",
    "form.deploymentModel": "Deployment model",
    "form.commercialModel": "Commercial model",
    "form.chooseOne": "Choose one",
    "form.productionCapacity": "Production capacity",
    "form.sandboxCapacity": "Sandbox/pre-prod capacity",
    "form.runningApplications": "Running applications",
    "form.managedApis": "Managed APIs",
    "form.utilization": "Average vCore/Core utilization",
    "form.addons": "Add-ons in use",
    "form.renewalTimeline": "Renewal timeline",
    "form.contactTitle": "Unlock full report",
    "form.contactText": "Lead details are saved with the assessment inputs for follow-up.",
    "form.name": "Name",
    "form.email": "Business email",
    "form.company": "Company",
    "form.submit": "Calculate risk report",
    "form.calculating": "Calculating...",
    "common.other": "Other",
    "common.unsure": "Unsure",
    "deployment.hybrid": "Hybrid",
    "commercial.flowMessage": "Flow/Message usage-based",
    "renewal.0-3": "0-3 months",
    "renewal.3-6": "3-6 months",
    "renewal.6-12": "6-12 months",
    "renewal.notSure": "Not sure",
    "preview.kicker": "Preview ready",
    "preview.title": "We can produce a directional risk report from these inputs.",
    "preview.text": "Share your contact details to unlock the full utilization score, waste estimate, and audit next step.",
    "result.emptyKicker": "VDP / AUDIT SIGNALS",
    "result.emptyTitle": "Result preview",
    "result.emptyText": "Submit the calculator to see one clear risk level, a waste estimate, and specific optimization signals.",
    "result.emptyRisk": "Utilization risk score",
    "result.emptyWaste": "Capacity waste estimate",
    "result.emptyNext": "Renewal audit next step",
    "result.capturedKicker": "VDP / REPORT CAPTURED",
    "result.utilizationRisk": "{level} utilization risk",
    "result.totalCores": "{count} total cores/vCores",
    "result.signalsHeading": "Optimization signals",
    "result.recommendationsHeading": "Recommended actions",
    "result.auditMailLabel": "Request audit follow-up",
    "result.visitSite": "Visit veridatapro.com",
    "references.vdp": "Visit VeriDataPro",
    "references.title": "Pricing model references",
    "errors.completeRequired": "Complete the required fields to generate the report.",
    "errors.unable": "Unable to calculate the report. Please try again."
  },
  pt: {
    "meta.title": "Calculadora de custo e utilização do MuleSoft | VeriDataPro",
    "meta.description": "Uma calculadora direcional de utilização e risco de renovação do MuleSoft da VeriDataPro.",
    "brand.subtitle": "Serviços de integração MuleSoft",
    "header.note": "Sinais direcionais, não preços oficiais",
    "hero.eyebrow": "Revisão de custos MuleSoft",
    "hero.title": "Encontre desperdício no MuleSoft antes da renovação",
    "hero.lede":
      "Informe seu ambiente e receba uma visão direcional da capacidade paga que pode estar ociosa, mal alocada ou difícil de defender em conversas comerciais.",
    "hero.riskTitle": "Nível de risco",
    "hero.riskText": "Baixo a Crítico",
    "hero.wasteTitle": "Estimativa de desperdício",
    "hero.wasteText": "Revisão direcional de capacidade",
    "hero.actionsTitle": "Próximas ações",
    "hero.actionsText": "Recomendações de auditoria",
    "hero.disclaimer":
      "Esta ferramenta fornece sinais direcionais de otimização, não preços oficiais do MuleSoft. Os termos comerciais do MuleSoft podem variar por contratos legados core/vCore, modelo por flows/messages, modelo de implantação, pacote Salesforce e termos negociados.",
    "form.usageTitle": "Uso do MuleSoft",
    "form.usageText": "Estimativas são suficientes para um primeiro sinal de risco.",
    "form.deploymentModel": "Modelo de implantação",
    "form.commercialModel": "Modelo comercial",
    "form.chooseOne": "Escolha uma opção",
    "form.productionCapacity": "Capacidade de produção",
    "form.sandboxCapacity": "Capacidade sandbox/pré-prod",
    "form.runningApplications": "Aplicações em execução",
    "form.managedApis": "APIs gerenciadas",
    "form.utilization": "Utilização média de vCore/Core",
    "form.addons": "Add-ons em uso",
    "form.renewalTimeline": "Prazo de renovação",
    "form.contactTitle": "Liberar relatório completo",
    "form.contactText": "Os dados do lead são salvos com as entradas da avaliação para follow-up.",
    "form.name": "Nome",
    "form.email": "E-mail corporativo",
    "form.company": "Empresa",
    "form.submit": "Calcular relatório de risco",
    "form.calculating": "Calculando...",
    "common.other": "Outro",
    "common.unsure": "Não sei",
    "deployment.hybrid": "Híbrido",
    "commercial.flowMessage": "Uso por Flow/Message",
    "renewal.0-3": "0-3 meses",
    "renewal.3-6": "3-6 meses",
    "renewal.6-12": "6-12 meses",
    "renewal.notSure": "Não sei",
    "preview.kicker": "Prévia pronta",
    "preview.title": "Podemos gerar um relatório direcional de risco com esses dados.",
    "preview.text":
      "Compartilhe seus dados de contato para liberar a pontuação completa, a estimativa de desperdício e o próximo passo de auditoria.",
    "result.emptyKicker": "VDP / SINAIS DE AUDITORIA",
    "result.emptyTitle": "Prévia do resultado",
    "result.emptyText": "Envie a calculadora para ver um nível de risco claro, uma estimativa de desperdício e sinais específicos de otimização.",
    "result.emptyRisk": "Pontuação de risco de utilização",
    "result.emptyWaste": "Estimativa de desperdício de capacidade",
    "result.emptyNext": "Próximo passo de auditoria",
    "result.capturedKicker": "VDP / RELATÓRIO CAPTURADO",
    "result.utilizationRisk": "Risco de utilização {level}",
    "result.totalCores": "{count} cores/vCores totais",
    "result.signalsHeading": "Sinais de otimização",
    "result.recommendationsHeading": "Ações recomendadas",
    "result.auditMailLabel": "Solicitar follow-up de auditoria",
    "result.visitSite": "Visitar veridatapro.com",
    "references.vdp": "Visitar VeriDataPro",
    "references.title": "Referências do modelo de preços",
    "errors.completeRequired": "Complete os campos obrigatórios para gerar o relatório.",
    "errors.unable": "Não foi possível calcular o relatório. Tente novamente."
  },
  es: {
    "meta.title": "Calculadora de costo y utilización de MuleSoft | VeriDataPro",
    "meta.description": "Una calculadora direccional de utilización y riesgo de renovación de MuleSoft de VeriDataPro.",
    "brand.subtitle": "Servicios de integración MuleSoft",
    "header.note": "Señales direccionales, no precios oficiales",
    "hero.eyebrow": "Revisión de costos MuleSoft",
    "hero.title": "Encuentra desperdicio en MuleSoft antes de renovar",
    "hero.lede":
      "Ingresa tu huella de uso y obtén una vista direccional de la capacidad pagada que podría estar ociosa, mal asignada o difícil de defender en conversaciones comerciales.",
    "hero.riskTitle": "Nivel de riesgo",
    "hero.riskText": "Bajo a Crítico",
    "hero.wasteTitle": "Estimación de desperdicio",
    "hero.wasteText": "Revisión direccional de capacidad",
    "hero.actionsTitle": "Próximas acciones",
    "hero.actionsText": "Recomendaciones de auditoría",
    "hero.disclaimer":
      "Esta herramienta entrega señales direccionales de optimización, no precios oficiales de MuleSoft. Los términos comerciales de MuleSoft pueden variar por contratos heredados core/vCore, modelo por flows/messages, modelo de despliegue, paquete Salesforce y términos negociados.",
    "form.usageTitle": "Uso de MuleSoft",
    "form.usageText": "Las mejores estimaciones bastan para una primera señal de riesgo.",
    "form.deploymentModel": "Modelo de despliegue",
    "form.commercialModel": "Modelo comercial",
    "form.chooseOne": "Elige una opción",
    "form.productionCapacity": "Capacidad de producción",
    "form.sandboxCapacity": "Capacidad sandbox/pre-prod",
    "form.runningApplications": "Aplicaciones en ejecución",
    "form.managedApis": "APIs administradas",
    "form.utilization": "Utilización promedio de vCore/Core",
    "form.addons": "Add-ons en uso",
    "form.renewalTimeline": "Fecha de renovación",
    "form.contactTitle": "Desbloquear reporte completo",
    "form.contactText": "Los datos del lead se guardan con las entradas de la evaluación para seguimiento.",
    "form.name": "Nombre",
    "form.email": "Email corporativo",
    "form.company": "Empresa",
    "form.submit": "Calcular reporte de riesgo",
    "form.calculating": "Calculando...",
    "common.other": "Otro",
    "common.unsure": "No sé",
    "deployment.hybrid": "Híbrido",
    "commercial.flowMessage": "Uso por Flow/Message",
    "renewal.0-3": "0-3 meses",
    "renewal.3-6": "3-6 meses",
    "renewal.6-12": "6-12 meses",
    "renewal.notSure": "No sé",
    "preview.kicker": "Vista previa lista",
    "preview.title": "Podemos generar un reporte direccional de riesgo con estos datos.",
    "preview.text":
      "Comparte tus datos de contacto para desbloquear la puntuación completa, la estimación de desperdicio y el siguiente paso de auditoría.",
    "result.emptyKicker": "VDP / SEÑALES DE AUDITORÍA",
    "result.emptyTitle": "Vista previa del resultado",
    "result.emptyText": "Envía la calculadora para ver un nivel de riesgo claro, una estimación de desperdicio y señales específicas de optimización.",
    "result.emptyRisk": "Puntuación de riesgo de utilización",
    "result.emptyWaste": "Estimación de desperdicio de capacidad",
    "result.emptyNext": "Siguiente paso de auditoría",
    "result.capturedKicker": "VDP / REPORTE CAPTURADO",
    "result.utilizationRisk": "Riesgo de utilización {level}",
    "result.totalCores": "{count} cores/vCores totales",
    "result.signalsHeading": "Señales de optimización",
    "result.recommendationsHeading": "Acciones recomendadas",
    "result.auditMailLabel": "Solicitar seguimiento de auditoría",
    "result.visitSite": "Visitar veridatapro.com",
    "references.vdp": "Visitar VeriDataPro",
    "references.title": "Referencias del modelo de precios",
    "errors.completeRequired": "Completa los campos obligatorios para generar el reporte.",
    "errors.unable": "No fue posible calcular el reporte. Inténtalo nuevamente."
  }
};

const footprintFields = [
  "deploymentModel",
  "commercialModel",
  "productionCores",
  "sandboxCores",
  "runningApplications",
  "managedApis",
  "renewalTimeline"
];

let currentLanguage = localStorage.getItem("calculatorLanguage") || "en";
let lastResult = null;

function t(key, values = {}) {
  const text = TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS.en[key] || key;
  return Object.entries(values).reduce((memo, [name, value]) => memo.replaceAll(`{${name}}`, value), text);
}

function getPayload() {
  const data = new FormData(form);
  return {
    language: currentLanguage,
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

function applyTranslations() {
  document.documentElement.lang = HTML_LANG[currentLanguage];
  document.title = t("meta.title");
  document.querySelector('meta[name="description"]').setAttribute("content", t("meta.description"));

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === currentLanguage;
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderEmptyResult() {
  resultPanel.className = "result-panel idle";
  resultPanel.innerHTML = `
    <div class="result-empty">
      <span class="mono">${escapeHtml(t("result.emptyKicker"))}</span>
      <h2>${escapeHtml(t("result.emptyTitle"))}</h2>
      <p>${escapeHtml(t("result.emptyText"))}</p>
      <ul class="empty-list">
        <li>${escapeHtml(t("result.emptyRisk"))}</li>
        <li>${escapeHtml(t("result.emptyWaste"))}</li>
        <li>${escapeHtml(t("result.emptyNext"))}</li>
      </ul>
    </div>
  `;
}

function setLanguage(language, { resetResult = true } = {}) {
  if (!LANGUAGES.has(language)) return;

  currentLanguage = language;
  localStorage.setItem("calculatorLanguage", language);
  applyTranslations();
  clearError();

  if (resetResult && lastResult && lastResult.language !== currentLanguage) {
    lastResult = null;
  }

  if (lastResult) {
    renderResult(lastResult);
  } else {
    renderEmptyResult();
  }

  updatePreview();
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
      <span class="mono">${escapeHtml(t("result.capturedKicker"))}</span>
      <h2>${escapeHtml(t("result.utilizationRisk", { level: result.risk.level }))}</h2>

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
          · ${escapeHtml(t("result.totalCores", { count: result.footprint.totalCores }))}
        </p>
      </div>

      <div>
        <h3>${escapeHtml(t("result.signalsHeading"))}</h3>
        <ul class="signal-list">${signals}</ul>
      </div>

      <div>
        <h3>${escapeHtml(t("result.recommendationsHeading"))}</h3>
        <ul class="recommendations">${recommendations}</ul>
      </div>

      <div class="cta">
        <h3>${escapeHtml(result.cta.headline)}</h3>
        <p>${escapeHtml(result.cta.message)}</p>
        <div class="cta-actions">
          <a href="mailto:contact@veridatapro.com?subject=MuleSoft%20optimization%20audit">${escapeHtml(t("result.auditMailLabel"))}</a>
          <a href="https://veridatapro.com/" target="_blank" rel="noreferrer">${escapeHtml(t("result.visitSite"))}</a>
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
    showError(t("errors.completeRequired"));
    return;
  }

  submitButton.disabled = true;
  submitLabel.textContent = t("form.calculating");

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
      throw new Error(fieldErrors || t("errors.unable"));
    }

    lastResult = body.result;
    renderResult(body.result);
    resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    showError(error.message || t("errors.unable"));
  } finally {
    submitButton.disabled = false;
    submitLabel.textContent = t("form.submit");
  }
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

form.addEventListener("input", updatePreview);
form.addEventListener("change", updatePreview);
form.addEventListener("submit", submitForm);
setLanguage(LANGUAGES.has(currentLanguage) ? currentLanguage : "en", { resetResult: false });
