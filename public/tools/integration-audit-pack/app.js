const form = document.querySelector("#auditForm");
const resultPanel = document.querySelector("#resultPanel");
const formError = document.querySelector("#formError");
const submitButton = form.querySelector('button[type="submit"]');
const submitLabel = submitButton.querySelector("[data-submit-label]");
const languageButtons = document.querySelectorAll("[data-language-button]");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector("[data-menu-toggle]");
const headerMenu = document.querySelector("[data-header-menu]");
const APP_BASE_PATH = window.APP_BASE_PATH || "";

const LANGUAGES = new Set(["en", "pt", "es"]);
const HTML_LANG = {
  en: "en",
  pt: "pt-BR",
  es: "es-419"
};

const TRANSLATIONS = {
  en: {
    "meta.title": "Integration Audit Template Pack | VeriDataPro",
    "meta.description":
      "Download VeriDataPro's integration audit template pack for mapping systems, ownership, manual work, API readiness, risk, and next steps.",
    "brand.subtitle": "Systems integration and automation",
    "header.note": "Word document download",
    "menu.open": "Open menu",
    "menu.close": "Close menu",
    "hero.eyebrow": "Integration audit pack",
    "hero.title": "Get the template pack to map systems, risk, and next steps",
    "hero.lede":
      "Use the audit pack to identify manual work, spreadsheet dependency, ownership gaps, API readiness, migration risk, and the first fixes worth prioritizing.",
    "hero.snapshotTitle": "Executive snapshot",
    "hero.snapshotText": "Five questions to qualify risk quickly",
    "hero.scorecardTitle": "Risk scorecards",
    "hero.scorecardText": "Manual work, data, APIs, reporting, ownership",
    "hero.planTitle": "30-day action plan",
    "hero.planText": "Turn findings into practical next steps",
    "hero.note":
      "This is a practical Word document for internal workshops. The form unlocks the download and helps VeriDataPro understand who is using the pack.",
    "hero.scrollCue": "Get the audit pack",
    "preview.inventoryTitle": "Map the systems involved",
    "preview.inventoryText":
      "Capture system purpose, owner, users, criticality, API availability, and pain level before choosing a solution.",
    "preview.manualTitle": "Expose hidden manual work",
    "preview.manualText":
      "Identify CSV exports, spreadsheet cleanup, duplicate entry, report reconciliation, and single-person process risk.",
    "preview.roiTitle": "Build the business case",
    "preview.roiText":
      "Estimate cost of inaction, score API readiness, compare vendors, and define the first 30 days of integration work.",
    "form.title": "Unlock the audit document",
    "form.text": "Enter your details and receive the Word template pack immediately.",
    "form.name": "Name",
    "form.email": "Business email",
    "form.company": "Company",
    "form.role": "Role",
    "form.website": "Website",
    "form.companySize": "Company size",
    "form.challenge": "Main reason for the audit",
    "form.timeline": "Timeline",
    "form.chooseOne": "Choose one",
    "form.submit": "Unlock audit pack",
    "form.loading": "Preparing download...",
    "challenge.manualWork": "Manual work or CSV processes",
    "challenge.dataQuality": "Data quality or duplicate records",
    "challenge.reporting": "Reports do not match",
    "challenge.migration": "ERP / CRM / ecommerce migration",
    "challenge.architecture": "Need an integration architecture map",
    "timeline.now": "Now",
    "timeline.1-3": "1-3 months",
    "timeline.3-6": "3-6 months",
    "timeline.exploring": "Just exploring",
    "result.emptyKicker": "VDP / AUDIT PACK",
    "result.emptyTitle": "What you get",
    "result.emptyText": "A Word document your team can use in a 10-minute executive review or a deeper 1.5-2 hour workshop.",
    "result.itemOne": "Systems inventory and ownership map",
    "result.itemTwo": "Manual work, ROI, API readiness, and risk scorecards",
    "result.itemThree": "Migration checklist and 30-day action plan",
    "result.readyKicker": "VDP / DOWNLOAD READY",
    "result.readyTitle": "Your audit pack is ready",
    "result.summaryTitle": "Inside the document",
    "result.summaryText":
      "The pack includes 14 sections covering executive snapshot, systems inventory, ownership, manual work, ROI, API readiness, data flows, architecture, risk, vendor comparison, migration planning, and next steps.",
    "result.downloadTitle": "VeriDataPro Integration Audit Pack",
    "result.downloadText": "Word document (.docx)",
    "result.downloadButton": "Download audit pack",
    "result.ctaTitle": "Want VeriDataPro to run the audit with your team?",
    "result.ctaText": "Use the pack internally, or book a review to turn the findings into an integration plan.",
    "result.ctaMailLabel": "Book an integration review",
    "result.visitSite": "Visit veridatapro.com",
    "errors.completeRequired": "Complete the required fields to unlock the audit pack.",
    "errors.unable": "Unable to prepare the download. Please try again."
  },
  pt: {
    "meta.title": "Pacote de templates para auditoria de integração | VeriDataPro",
    "meta.description": "Baixe o pacote de templates da VeriDataPro para mapear sistemas, responsáveis, trabalho manual, APIs, riscos e próximos passos.",
    "brand.subtitle": "Toolkit de auditoria de integração",
    "header.note": "Download em Word",
    "menu.open": "Abrir menu",
    "menu.close": "Fechar menu",
    "hero.eyebrow": "Pacote de auditoria de integração",
    "hero.title": "Baixe o pacote para mapear sistemas, riscos e próximos passos",
    "hero.lede":
      "Use o pacote para identificar trabalho manual, dependência de planilhas, falta de responsáveis, prontidão de APIs, risco de migração e prioridades de melhoria.",
    "hero.snapshotTitle": "Resumo executivo",
    "hero.snapshotText": "Cinco perguntas para qualificar risco rapidamente",
    "hero.scorecardTitle": "Scorecards de risco",
    "hero.scorecardText": "Trabalho manual, dados, APIs, relatórios, responsáveis",
    "hero.planTitle": "Plano de 30 dias",
    "hero.planText": "Transforme achados em próximos passos práticos",
    "hero.note":
      "Este é um documento Word prático para workshops internos. O formulário libera o download e ajuda a VeriDataPro a entender quem está usando o pacote.",
    "hero.scrollCue": "Baixar pacote",
    "preview.inventoryTitle": "Mapeie os sistemas envolvidos",
    "preview.inventoryText":
      "Capture finalidade, responsável, usuários, criticidade, disponibilidade de API e nível de dor antes de escolher uma solução.",
    "preview.manualTitle": "Mostre o trabalho manual escondido",
    "preview.manualText":
      "Identifique exportações CSV, limpeza de planilhas, entrada duplicada, reconciliação de relatórios e risco concentrado em uma pessoa.",
    "preview.roiTitle": "Monte o caso de negócio",
    "preview.roiText":
      "Estime custo de não agir, pontue prontidão de APIs, compare fornecedores e defina os primeiros 30 dias de integração.",
    "form.title": "Liberar documento de auditoria",
    "form.text": "Informe seus dados e receba o template em Word imediatamente.",
    "form.name": "Nome",
    "form.email": "E-mail corporativo",
    "form.company": "Empresa",
    "form.role": "Cargo / função",
    "form.website": "Site",
    "form.companySize": "Tamanho da empresa",
    "form.challenge": "Principal motivo da auditoria",
    "form.timeline": "Prazo",
    "form.chooseOne": "Escolha uma opção",
    "form.submit": "Liberar pacote",
    "form.loading": "Preparando download...",
    "challenge.manualWork": "Trabalho manual ou processos com CSV",
    "challenge.dataQuality": "Qualidade de dados ou duplicidade",
    "challenge.reporting": "Relatórios não batem",
    "challenge.migration": "Migração de ERP / CRM / ecommerce",
    "challenge.architecture": "Preciso mapear a arquitetura de integração",
    "timeline.now": "Agora",
    "timeline.1-3": "1-3 meses",
    "timeline.3-6": "3-6 meses",
    "timeline.exploring": "Só pesquisando",
    "result.emptyKicker": "VDP / PACOTE DE AUDITORIA",
    "result.emptyTitle": "O que você recebe",
    "result.emptyText": "Um documento Word para uma revisão executiva de 10 minutos ou um workshop mais profundo de 1,5-2 horas.",
    "result.itemOne": "Inventário de sistemas e mapa de responsáveis",
    "result.itemTwo": "Trabalho manual, ROI, APIs e scorecards de risco",
    "result.itemThree": "Checklist de migração e plano de 30 dias",
    "result.readyKicker": "VDP / DOWNLOAD PRONTO",
    "result.readyTitle": "Seu pacote está pronto",
    "result.summaryTitle": "Dentro do documento",
    "result.summaryText":
      "O pacote tem 14 seções: resumo executivo, inventário, responsáveis, trabalho manual, ROI, APIs, fluxos de dados, arquitetura, riscos, fornecedores, migração e próximos passos.",
    "result.downloadTitle": "VeriDataPro Integration Audit Pack",
    "result.downloadText": "Documento Word (.docx)",
    "result.downloadButton": "Baixar pacote",
    "result.ctaTitle": "Quer que a VeriDataPro conduza a auditoria com sua equipe?",
    "result.ctaText": "Use o pacote internamente ou agende uma revisão para transformar os achados em plano de integração.",
    "result.ctaMailLabel": "Agendar revisão",
    "result.visitSite": "Visitar veridatapro.com",
    "errors.completeRequired": "Complete os campos obrigatórios para liberar o pacote.",
    "errors.unable": "Não foi possível preparar o download. Tente novamente."
  },
  es: {
    "meta.title": "Pack de templates para auditoría de integración | VeriDataPro",
    "meta.description": "Descarga el pack de templates de VeriDataPro para mapear sistemas, responsables, trabajo manual, APIs, riesgos y próximos pasos.",
    "brand.subtitle": "Toolkit de auditoría de integración",
    "header.note": "Descarga en Word",
    "menu.open": "Abrir menú",
    "menu.close": "Cerrar menú",
    "hero.eyebrow": "Pack de auditoría de integración",
    "hero.title": "Descarga el pack para mapear sistemas, riesgos y próximos pasos",
    "hero.lede":
      "Usa el pack para identificar trabajo manual, dependencia de hojas de cálculo, falta de responsables, preparación de APIs, riesgo de migración y prioridades de mejora.",
    "hero.snapshotTitle": "Resumen ejecutivo",
    "hero.snapshotText": "Cinco preguntas para calificar riesgo rápido",
    "hero.scorecardTitle": "Scorecards de riesgo",
    "hero.scorecardText": "Trabajo manual, datos, APIs, reportes, responsables",
    "hero.planTitle": "Plan de 30 días",
    "hero.planText": "Convierte hallazgos en próximos pasos prácticos",
    "hero.note":
      "Este es un documento Word práctico para workshops internos. El formulario libera la descarga y ayuda a VeriDataPro a entender quién usa el pack.",
    "hero.scrollCue": "Descargar pack",
    "preview.inventoryTitle": "Mapea los sistemas involucrados",
    "preview.inventoryText":
      "Captura propósito, responsable, usuarios, criticidad, disponibilidad de API y nivel de dolor antes de elegir una solución.",
    "preview.manualTitle": "Muestra el trabajo manual escondido",
    "preview.manualText":
      "Identifica exportaciones CSV, limpieza de hojas, entrada duplicada, conciliación de reportes y riesgo concentrado en una persona.",
    "preview.roiTitle": "Construye el caso de negocio",
    "preview.roiText":
      "Estima costo de no actuar, puntúa preparación de APIs, compara proveedores y define los primeros 30 días de integración.",
    "form.title": "Desbloquear documento de auditoría",
    "form.text": "Ingresa tus datos y recibe el template en Word inmediatamente.",
    "form.name": "Nombre",
    "form.email": "Email corporativo",
    "form.company": "Empresa",
    "form.role": "Cargo / función",
    "form.website": "Sitio web",
    "form.companySize": "Tamaño de la empresa",
    "form.challenge": "Motivo principal de la auditoría",
    "form.timeline": "Plazo",
    "form.chooseOne": "Elige una opción",
    "form.submit": "Desbloquear pack",
    "form.loading": "Preparando descarga...",
    "challenge.manualWork": "Trabajo manual o procesos con CSV",
    "challenge.dataQuality": "Calidad de datos o duplicados",
    "challenge.reporting": "Reportes no coinciden",
    "challenge.migration": "Migración de ERP / CRM / ecommerce",
    "challenge.architecture": "Necesito mapear la arquitectura de integración",
    "timeline.now": "Ahora",
    "timeline.1-3": "1-3 meses",
    "timeline.3-6": "3-6 meses",
    "timeline.exploring": "Solo explorando",
    "result.emptyKicker": "VDP / PACK DE AUDITORÍA",
    "result.emptyTitle": "Qué recibes",
    "result.emptyText": "Un documento Word para una revisión ejecutiva de 10 minutos o un workshop más profundo de 1,5-2 horas.",
    "result.itemOne": "Inventario de sistemas y mapa de responsables",
    "result.itemTwo": "Trabajo manual, ROI, APIs y scorecards de riesgo",
    "result.itemThree": "Checklist de migración y plan de 30 días",
    "result.readyKicker": "VDP / DESCARGA LISTA",
    "result.readyTitle": "Tu pack está listo",
    "result.summaryTitle": "Dentro del documento",
    "result.summaryText":
      "El pack tiene 14 secciones: resumen ejecutivo, inventario, responsables, trabajo manual, ROI, APIs, flujos de datos, arquitectura, riesgos, proveedores, migración y próximos pasos.",
    "result.downloadTitle": "VeriDataPro Integration Audit Pack",
    "result.downloadText": "Documento Word (.docx)",
    "result.downloadButton": "Descargar pack",
    "result.ctaTitle": "¿Quieres que VeriDataPro conduzca la auditoría con tu equipo?",
    "result.ctaText": "Usa el pack internamente o agenda una revisión para convertir hallazgos en un plan de integración.",
    "result.ctaMailLabel": "Agendar revisión",
    "result.visitSite": "Visitar veridatapro.com",
    "errors.completeRequired": "Completa los campos obligatorios para desbloquear el pack.",
    "errors.unable": "No fue posible preparar la descarga. Inténtalo nuevamente."
  }
};

let currentLanguage = localStorage.getItem("calculatorLanguage") || "en";
let lastDownload = null;

function t(key, values = {}) {
  const text = TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS.en[key] || key;
  return Object.entries(values).reduce((memo, [name, value]) => memo.replaceAll(`{${name}}`, value), text);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getPayload() {
  const data = new FormData(form);
  return {
    language: currentLanguage,
    fullName: data.get("fullName"),
    email: data.get("email"),
    company: data.get("company"),
    role: data.get("role"),
    website: data.get("website"),
    companySize: data.get("companySize"),
    primaryChallenge: data.get("primaryChallenge"),
    timeline: data.get("timeline")
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
    button.setAttribute("aria-pressed", String(button.dataset.lang === currentLanguage));
  });

  syncMenuLabel();
}

function isMenuOpen() {
  return menuToggle?.getAttribute("aria-expanded") === "true";
}

function syncMenuLabel() {
  if (!menuToggle) return;
  menuToggle.setAttribute("aria-label", t(isMenuOpen() ? "menu.close" : "menu.open"));
}

function setMenuOpen(open) {
  if (!menuToggle || !siteHeader) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  siteHeader.classList.toggle("menu-open", open);
  syncMenuLabel();
}

function renderEmptyResult() {
  resultPanel.className = "result-panel idle";
  resultPanel.innerHTML = `
    <div class="result-empty">
      <span class="mono">${escapeHtml(t("result.emptyKicker"))}</span>
      <h2>${escapeHtml(t("result.emptyTitle"))}</h2>
      <p>${escapeHtml(t("result.emptyText"))}</p>
      <div class="result-teaser" aria-hidden="true">
        <div class="teaser-score-row">
          <div class="teaser-meter"><div class="teaser-meter-inner">?</div></div>
          <div class="teaser-lines">
            <div class="teaser-pill"></div>
            <div class="teaser-line"></div>
            <div class="teaser-line" style="width:65%"></div>
          </div>
        </div>
        <div class="teaser-bars">
          <div class="teaser-bar-row"><div class="teaser-bar-label"></div><div class="teaser-bar-fill" style="width:68%"></div></div>
          <div class="teaser-bar-row"><div class="teaser-bar-label"></div><div class="teaser-bar-fill" style="width:52%"></div></div>
          <div class="teaser-bar-row"><div class="teaser-bar-label"></div><div class="teaser-bar-fill" style="width:79%"></div></div>
        </div>
      </div>
      <ul class="document-list">
        <li>${escapeHtml(t("result.itemOne"))}</li>
        <li>${escapeHtml(t("result.itemTwo"))}</li>
        <li>${escapeHtml(t("result.itemThree"))}</li>
      </ul>
    </div>
  `;
}

function renderReadyResult(download) {
  resultPanel.className = "result-panel";
  resultPanel.innerHTML = `
    <div class="score-card">
      <span class="mono">${escapeHtml(t("result.readyKicker"))}</span>
      <h2>${escapeHtml(t("result.readyTitle"))}</h2>

      <div class="document-summary">
        <strong>${escapeHtml(t("result.summaryTitle"))}</strong>
        <p>${escapeHtml(t("result.summaryText"))}</p>
      </div>

      <div class="download-card">
        <strong>${escapeHtml(t("result.downloadTitle"))}</strong>
        <span>${escapeHtml(t("result.downloadText"))}</span>
        <a href="${escapeHtml(download.url)}" download="${escapeHtml(download.fileName)}">${escapeHtml(t("result.downloadButton"))}</a>
      </div>

      <div class="cta">
        <h3>${escapeHtml(t("result.ctaTitle"))}</h3>
        <p>${escapeHtml(t("result.ctaText"))}</p>
        <div class="cta-actions">
          <a href="mailto:contact@veridatapro.com?subject=Integration%20audit%20review">${escapeHtml(t("result.ctaMailLabel"))}</a>
          <a href="https://veridatapro.com/" target="_blank" rel="noreferrer">${escapeHtml(t("result.visitSite"))}</a>
        </div>
      </div>
    </div>
  `;
}

function setLanguage(language) {
  if (!LANGUAGES.has(language)) return;
  currentLanguage = language;
  localStorage.setItem("calculatorLanguage", language);
  applyTranslations();
  clearError();

  if (lastDownload) {
    renderReadyResult(lastDownload);
  } else {
    renderEmptyResult();
  }
}

function showError(message) {
  formError.textContent = message;
  formError.hidden = false;
}

function clearError() {
  formError.textContent = "";
  formError.hidden = true;
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
  submitLabel.textContent = t("form.loading");

  try {
    const response = await fetch(`${APP_BASE_PATH}/api/request`, {
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

    lastDownload = body.download;
    renderReadyResult(lastDownload);
    resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    showError(error.message || t("errors.unable"));
  } finally {
    submitButton.disabled = false;
    submitLabel.textContent = t("form.submit");
  }
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
    setMenuOpen(false);
  });
});

menuToggle?.addEventListener("click", () => {
  setMenuOpen(!isMenuOpen());
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

document.addEventListener("click", (event) => {
  if (!isMenuOpen()) return;
  if (siteHeader.contains(event.target)) {
    if (event.target.closest("[data-menu-toggle]")) return;
    if (event.target.closest("[data-header-menu]")) return;
  }
  setMenuOpen(false);
});

headerMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

form.addEventListener("submit", submitForm);
setLanguage(LANGUAGES.has(currentLanguage) ? currentLanguage : "en");
