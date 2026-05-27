const form = document.querySelector("#assessmentForm");
const resultPanel = document.querySelector("#resultPanel");
const formError = document.querySelector("#formError");
const preview = document.querySelector("#preview");
const submitButton = form.querySelector('button[type="submit"]');
const submitLabel = submitButton.querySelector("[data-submit-label]");
const languageButtons = document.querySelectorAll("[data-language-button]");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector("[data-menu-toggle]");
const headerMenu = document.querySelector("[data-header-menu]");
const progressBar = document.querySelector("#progressBar");
const progressLabel = document.querySelector("#progressLabel");
const progressTrack = document.querySelector("#progressTrack");
const TOTAL_QUESTIONS = 12;
const APP_BASE_PATH = window.APP_BASE_PATH || "";

const LANGUAGES = new Set(["en", "pt", "es"]);
const HTML_LANG = {
  en: "en",
  pt: "pt-BR",
  es: "es-419"
};

const CATEGORY_KEYS = ["systemComplexity", "manualWork", "dataReadiness", "apiReadiness", "operationalRisk"];

const ANSWER_FIELDS = [
  "systemsCount",
  "manualCopyFrequency",
  "spreadsheetDependency",
  "apiAvailability",
  "sourceOfTruth",
  "dataQuality",
  "reportingConsistency",
  "integrationReliability",
  "systemOwnership",
  "upcomingMigration",
  "biggestProblem"
];

const TRANSLATIONS = {
  en: {
    "meta.title": "API Readiness Assessment Tool | VeriDataPro",
    "meta.description": "A short API and integration readiness assessment from Veri Data.",
    "brand.subtitle": "Systems integration and automation",
    "header.note": "3-minute integration check",
    "menu.open": "Open menu",
    "menu.close": "Close menu",
    "hero.eyebrow": "API readiness assessment",
    "hero.title": "Find out if your systems are ready to integrate",
    "hero.lede":
      "Answer a short 3-minute assessment and see where APIs, data, ownership, and manual work may block automation.",
    "hero.scoreTitle": "Integration score",
    "hero.scoreText": "0 to 100 readiness view",
    "hero.painTitle": "Main blockers",
    "hero.painText": "Manual work, data, APIs, ownership",
    "hero.nextTitle": "Next steps",
    "hero.nextText": "A practical integration review path",
    "hero.positioning":
      "Veri Data helps companies connect Odoo, CRMs, ecommerce, finance tools, spreadsheets, databases, and internal systems.",
    "hero.scrollCue": "Start assessment",
    "form.assessmentTitle": "Integration readiness",
    "form.assessmentText": "Use the option that best describes today. Estimates are enough.",
    "form.contactTitle": "Unlock full report",
    "form.contactText": "Lead details are saved with the assessment inputs for follow-up.",
    "form.name": "Name",
    "form.email": "Business email",
    "form.company": "Company",
    "form.website": "Website",
    "form.companySize": "Company size",
    "form.timeline": "Timeline",
    "form.chooseOne": "Choose one",
    "form.submit": "Generate readiness report",
    "form.calculating": "Generating...",
    "q.systemsCount": "How many business systems do you use regularly?",
    "q.systemTypes": "Which systems are part of your operation?",
    "q.manualCopyFrequency": "How often does someone copy data manually between systems?",
    "q.spreadsheetDependency": "How much does the company depend on spreadsheets to keep work moving?",
    "q.apiAvailability": "Do your main systems have usable APIs?",
    "q.sourceOfTruth": "Is there a clear source of truth for customer, order, product, or financial data?",
    "q.dataQuality": "What is the current data quality?",
    "q.reportingConsistency": "Do teams report the same numbers?",
    "q.integrationReliability": "How reliable are your current integrations or imports?",
    "q.systemOwnership": "Is there a clear owner for each important system?",
    "q.upcomingMigration": "Do you have an ERP, CRM, or ecommerce migration coming?",
    "q.biggestProblem": "What is your biggest integration or automation problem?",
    "problem.placeholder": "Example: orders are copied from ecommerce into ERP every morning.",
    "systems.odoo": "Odoo / ERP",
    "systems.crm": "CRM",
    "systems.ecommerce": "Ecommerce",
    "systems.finance": "Finance tools",
    "systems.spreadsheets": "Spreadsheets",
    "systems.databases": "Databases",
    "systems.internal": "Internal systems",
    "systems.support": "Support tools",
    "common.other": "Other",
    "manual.rarely": "Rarely",
    "manual.weekly": "Weekly",
    "manual.daily": "Daily",
    "manual.multipleDaily": "Multiple times per day",
    "spreadsheet.low": "Low",
    "spreadsheet.medium": "Some key processes",
    "spreadsheet.heavy": "Many critical processes",
    "api.most": "Most do",
    "api.some": "Some do",
    "api.unknown": "Not sure",
    "api.none": "No usable APIs",
    "source.clear": "Yes, clear",
    "source.mostly": "Mostly clear",
    "source.unclear": "Unclear",
    "source.none": "No",
    "data.clean": "Clean enough to automate",
    "data.minor": "Minor cleanup needed",
    "data.inconsistent": "Inconsistent",
    "data.poor": "Poor / duplicated",
    "reporting.consistent": "Yes",
    "reporting.minorDifferences": "Small differences",
    "reporting.differentTeams": "Different teams, different numbers",
    "reporting.manualReports": "Reports are built manually",
    "reliability.reliable": "Reliable",
    "reliability.occasional": "Occasional issues",
    "reliability.oftenBreak": "Break often",
    "reliability.manualFixes": "Need manual fixes",
    "owners.clearOwners": "Yes",
    "owners.someOwners": "Some systems",
    "owners.unclear": "Unclear",
    "owners.noOwner": "No clear owner",
    "migration.none": "No migration planned",
    "migration.ready": "Yes, data is ready",
    "migration.plannedDataConcerns": "Planned, with data concerns",
    "migration.activePoorReadiness": "Active or soon, data not ready",
    "timeline.now": "Now",
    "timeline.1-3": "1-3 months",
    "timeline.3-6": "3-6 months",
    "timeline.exploring": "Just exploring",
    "preview.kicker": "Assessment ready",
    "preview.title": "The full report can be generated from these answers.",
    "preview.text": "Add your contact details to unlock the score and recommendations.",
    "result.emptyKicker": "VDP / READINESS CHECK",
    "result.emptyTitle": "Report preview",
    "result.emptyText": "Complete the assessment to see readiness score, pain points, category scores, and next steps.",
    "result.emptyScore": "Integration readiness score",
    "result.emptyPain": "Top integration blockers",
    "result.emptyNext": "Recommended review path",
    "result.capturedKicker": "VDP / REPORT CAPTURED",
    "result.scoreHeading": "{status} readiness",
    "result.scoreHelp": "Higher scores mean fewer blockers before integration or automation work.",
    "result.painHeading": "Top detected pain points",
    "result.noPain": "No major blockers detected from these answers.",
    "result.categoryHeading": "Category scores",
    "result.recommendationHeading": "Recommended next step",
    "result.ctaTitle": "Book an integration review with Veri Data",
    "result.ctaText": "Use this report as a starting point for a focused review of systems, data, APIs, and automation opportunities.",
    "result.ctaMailLabel": "Request integration review",
    "result.visitSite": "Visit veridatapro.com",
    "category.systemComplexity": "System Complexity",
    "category.manualWork": "Manual Work",
    "category.dataReadiness": "Data Readiness",
    "category.apiReadiness": "API Readiness",
    "category.operationalRisk": "Operational Risk",
    "references.vdp": "Visit VeriDataPro",
    "references.note": "Systems integration, API automation, data cleanup, and operational workflow reviews.",
    "errors.completeRequired": "Complete the required fields to generate the report.",
    "errors.systemTypes": "Choose at least one system type.",
    "errors.unable": "Unable to generate the report. Please try again."
  },
  pt: {
    "meta.title": "Avaliação de prontidão para APIs | VeriDataPro",
    "meta.description": "Uma avaliação curta de prontidão para APIs e integração da Veri Data.",
    "brand.subtitle": "Integração de sistemas e automação",
    "header.note": "Diagnóstico de 3 minutos",
    "menu.open": "Abrir menu",
    "menu.close": "Fechar menu",
    "hero.eyebrow": "Avaliação de prontidão para APIs",
    "hero.title": "Veja se seus sistemas estão prontos para integração",
    "hero.lede":
      "Responda uma avaliação de 3 minutos e veja onde APIs, dados, responsáveis e trabalho manual podem travar automações.",
    "hero.scoreTitle": "Nota de prontidão",
    "hero.scoreText": "Visão de 0 a 100",
    "hero.painTitle": "Principais travas",
    "hero.painText": "Trabalho manual, dados, APIs, responsáveis",
    "hero.nextTitle": "Próximos passos",
    "hero.nextText": "Caminho prático para revisão",
    "hero.positioning":
      "A Veri Data ajuda empresas a conectar Odoo, CRMs, ecommerce, ferramentas financeiras, planilhas, bancos de dados e sistemas internos.",
    "hero.scrollCue": "Começar avaliação",
    "form.assessmentTitle": "Prontidão para integração",
    "form.assessmentText": "Use a opção que melhor descreve o cenário atual. Estimativas são suficientes.",
    "form.contactTitle": "Liberar relatório completo",
    "form.contactText": "Os dados do lead são salvos com as respostas da avaliação para follow-up.",
    "form.name": "Nome",
    "form.email": "E-mail corporativo",
    "form.company": "Empresa",
    "form.website": "Site",
    "form.companySize": "Tamanho da empresa",
    "form.timeline": "Prazo",
    "form.chooseOne": "Escolha uma opção",
    "form.submit": "Gerar relatório",
    "form.calculating": "Gerando...",
    "q.systemsCount": "Quantos sistemas de negócio vocês usam com frequência?",
    "q.systemTypes": "Quais sistemas fazem parte da operação?",
    "q.manualCopyFrequency": "Com que frequência alguém copia dados manualmente entre sistemas?",
    "q.spreadsheetDependency": "Quanto a empresa depende de planilhas para manter a operação andando?",
    "q.apiAvailability": "Os principais sistemas têm APIs utilizáveis?",
    "q.sourceOfTruth": "Existe uma fonte de verdade clara para clientes, pedidos, produtos ou dados financeiros?",
    "q.dataQuality": "Como está a qualidade dos dados hoje?",
    "q.reportingConsistency": "As equipes reportam os mesmos números?",
    "q.integrationReliability": "Quão confiáveis são as integrações ou importações atuais?",
    "q.systemOwnership": "Existe um responsável claro para cada sistema importante?",
    "q.upcomingMigration": "Há uma migração de ERP, CRM ou ecommerce chegando?",
    "q.biggestProblem": "Qual é o maior problema de integração ou automação hoje?",
    "problem.placeholder": "Exemplo: pedidos do ecommerce são copiados para o ERP toda manhã.",
    "systems.odoo": "Odoo / ERP",
    "systems.crm": "CRM",
    "systems.ecommerce": "Ecommerce",
    "systems.finance": "Ferramentas financeiras",
    "systems.spreadsheets": "Planilhas",
    "systems.databases": "Bancos de dados",
    "systems.internal": "Sistemas internos",
    "systems.support": "Suporte / atendimento",
    "common.other": "Outro",
    "manual.rarely": "Raramente",
    "manual.weekly": "Semanalmente",
    "manual.daily": "Todos os dias",
    "manual.multipleDaily": "Várias vezes ao dia",
    "spreadsheet.low": "Baixa",
    "spreadsheet.medium": "Alguns processos importantes",
    "spreadsheet.heavy": "Muitos processos críticos",
    "api.most": "A maioria tem",
    "api.some": "Alguns têm",
    "api.unknown": "Não sei",
    "api.none": "Não há APIs utilizáveis",
    "source.clear": "Sim, claro",
    "source.mostly": "Quase claro",
    "source.unclear": "Não está claro",
    "source.none": "Não",
    "data.clean": "Bom o suficiente para automatizar",
    "data.minor": "Precisa de pequenos ajustes",
    "data.inconsistent": "Inconsistente",
    "data.poor": "Ruim / duplicado",
    "reporting.consistent": "Sim",
    "reporting.minorDifferences": "Pequenas diferenças",
    "reporting.differentTeams": "Equipes diferentes, números diferentes",
    "reporting.manualReports": "Relatórios são feitos manualmente",
    "reliability.reliable": "Confiáveis",
    "reliability.occasional": "Problemas ocasionais",
    "reliability.oftenBreak": "Quebram com frequência",
    "reliability.manualFixes": "Precisam de correção manual",
    "owners.clearOwners": "Sim",
    "owners.someOwners": "Em alguns sistemas",
    "owners.unclear": "Não está claro",
    "owners.noOwner": "Não há responsável claro",
    "migration.none": "Não há migração planejada",
    "migration.ready": "Sim, e os dados estão prontos",
    "migration.plannedDataConcerns": "Planejada, com dúvidas sobre dados",
    "migration.activePoorReadiness": "Ativa ou próxima, dados não prontos",
    "timeline.now": "Agora",
    "timeline.1-3": "1-3 meses",
    "timeline.3-6": "3-6 meses",
    "timeline.exploring": "Só pesquisando",
    "preview.kicker": "Avaliação pronta",
    "preview.title": "O relatório completo pode ser gerado com essas respostas.",
    "preview.text": "Adicione seus dados de contato para ver a nota e as recomendações.",
    "result.emptyKicker": "VDP / DIAGNÓSTICO",
    "result.emptyTitle": "Prévia do relatório",
    "result.emptyText": "Complete a avaliação para ver nota, principais travas, notas por categoria e próximos passos.",
    "result.emptyScore": "Nota de prontidão para integração",
    "result.emptyPain": "Principais travas de integração",
    "result.emptyNext": "Caminho recomendado de revisão",
    "result.capturedKicker": "VDP / RELATÓRIO CAPTURADO",
    "result.scoreHeading": "Prontidão: {status}",
    "result.scoreHelp": "Notas mais altas indicam menos bloqueios antes de projetos de integração ou automação.",
    "result.painHeading": "Principais pontos detectados",
    "result.noPain": "Nenhum bloqueio importante foi detectado com essas respostas.",
    "result.categoryHeading": "Notas por categoria",
    "result.recommendationHeading": "Próximo passo recomendado",
    "result.ctaTitle": "Agendar uma revisão de integração com a Veri Data",
    "result.ctaText": "Use este relatório como ponto de partida para revisar sistemas, dados, APIs e oportunidades de automação.",
    "result.ctaMailLabel": "Solicitar revisão",
    "result.visitSite": "Visitar veridatapro.com",
    "category.systemComplexity": "Complexidade dos sistemas",
    "category.manualWork": "Trabalho manual",
    "category.dataReadiness": "Qualidade dos dados",
    "category.apiReadiness": "APIs disponíveis",
    "category.operationalRisk": "Risco operacional",
    "references.vdp": "Visitar VeriDataPro",
    "references.note": "Integração de sistemas, automação por APIs, limpeza de dados e revisão de fluxos operacionais.",
    "errors.completeRequired": "Complete os campos obrigatórios para gerar o relatório.",
    "errors.systemTypes": "Escolha pelo menos um tipo de sistema.",
    "errors.unable": "Não foi possível gerar o relatório. Tente novamente."
  },
  es: {
    "meta.title": "Evaluación de preparación para APIs | VeriDataPro",
    "meta.description": "Una evaluación corta de preparación para APIs e integración de Veri Data.",
    "brand.subtitle": "Integración de sistemas y automatización",
    "header.note": "Diagnóstico de 3 minutos",
    "menu.open": "Abrir menú",
    "menu.close": "Cerrar menú",
    "hero.eyebrow": "Evaluación de preparación para APIs",
    "hero.title": "Ve si tus sistemas están listos para integrarse",
    "hero.lede":
      "Responde una evaluación de 3 minutos y ve dónde APIs, datos, responsables y trabajo manual pueden frenar automatizaciones.",
    "hero.scoreTitle": "Puntaje de preparación",
    "hero.scoreText": "Vista de 0 a 100",
    "hero.painTitle": "Principales bloqueos",
    "hero.painText": "Trabajo manual, datos, APIs, responsables",
    "hero.nextTitle": "Próximos pasos",
    "hero.nextText": "Ruta práctica de revisión",
    "hero.positioning":
      "Veri Data ayuda a empresas a conectar Odoo, CRMs, ecommerce, herramientas financieras, hojas de cálculo, bases de datos y sistemas internos.",
    "hero.scrollCue": "Comenzar evaluación",
    "form.assessmentTitle": "Preparación para integración",
    "form.assessmentText": "Usa la opción que mejor describe el escenario actual. Las estimaciones son suficientes.",
    "form.contactTitle": "Desbloquear reporte completo",
    "form.contactText": "Los datos del lead se guardan con las respuestas de la evaluación para seguimiento.",
    "form.name": "Nombre",
    "form.email": "Email corporativo",
    "form.company": "Empresa",
    "form.website": "Sitio web",
    "form.companySize": "Tamaño de la empresa",
    "form.timeline": "Plazo",
    "form.chooseOne": "Elige una opción",
    "form.submit": "Generar reporte",
    "form.calculating": "Generando...",
    "q.systemsCount": "¿Cuántos sistemas de negocio usan con frecuencia?",
    "q.systemTypes": "¿Qué sistemas forman parte de la operación?",
    "q.manualCopyFrequency": "¿Con qué frecuencia alguien copia datos manualmente entre sistemas?",
    "q.spreadsheetDependency": "¿Cuánto depende la empresa de hojas de cálculo para operar?",
    "q.apiAvailability": "¿Los sistemas principales tienen APIs utilizables?",
    "q.sourceOfTruth": "¿Existe una fuente de verdad clara para clientes, pedidos, productos o datos financieros?",
    "q.dataQuality": "¿Cómo está la calidad de los datos hoy?",
    "q.reportingConsistency": "¿Los equipos reportan los mismos números?",
    "q.integrationReliability": "¿Qué tan confiables son las integraciones o importaciones actuales?",
    "q.systemOwnership": "¿Existe un responsable claro para cada sistema importante?",
    "q.upcomingMigration": "¿Viene una migración de ERP, CRM o ecommerce?",
    "q.biggestProblem": "¿Cuál es el mayor problema de integración o automatización hoy?",
    "problem.placeholder": "Ejemplo: los pedidos del ecommerce se copian al ERP cada mañana.",
    "systems.odoo": "Odoo / ERP",
    "systems.crm": "CRM",
    "systems.ecommerce": "Ecommerce",
    "systems.finance": "Herramientas financieras",
    "systems.spreadsheets": "Hojas de cálculo",
    "systems.databases": "Bases de datos",
    "systems.internal": "Sistemas internos",
    "systems.support": "Soporte / atención",
    "common.other": "Otro",
    "manual.rarely": "Rara vez",
    "manual.weekly": "Semanalmente",
    "manual.daily": "Todos los días",
    "manual.multipleDaily": "Varias veces al día",
    "spreadsheet.low": "Baja",
    "spreadsheet.medium": "Algunos procesos importantes",
    "spreadsheet.heavy": "Muchos procesos críticos",
    "api.most": "La mayoría tiene",
    "api.some": "Algunos tienen",
    "api.unknown": "No sé",
    "api.none": "No hay APIs utilizables",
    "source.clear": "Sí, clara",
    "source.mostly": "Casi clara",
    "source.unclear": "No está clara",
    "source.none": "No",
    "data.clean": "Suficiente para automatizar",
    "data.minor": "Necesita pequeños ajustes",
    "data.inconsistent": "Inconsistente",
    "data.poor": "Mala / duplicada",
    "reporting.consistent": "Sí",
    "reporting.minorDifferences": "Pequeñas diferencias",
    "reporting.differentTeams": "Equipos diferentes, números diferentes",
    "reporting.manualReports": "Reportes creados manualmente",
    "reliability.reliable": "Confiables",
    "reliability.occasional": "Problemas ocasionales",
    "reliability.oftenBreak": "Fallan con frecuencia",
    "reliability.manualFixes": "Necesitan corrección manual",
    "owners.clearOwners": "Sí",
    "owners.someOwners": "En algunos sistemas",
    "owners.unclear": "No está claro",
    "owners.noOwner": "No hay responsable claro",
    "migration.none": "No hay migración planeada",
    "migration.ready": "Sí, y los datos están listos",
    "migration.plannedDataConcerns": "Planeada, con dudas sobre datos",
    "migration.activePoorReadiness": "Activa o próxima, datos no listos",
    "timeline.now": "Ahora",
    "timeline.1-3": "1-3 meses",
    "timeline.3-6": "3-6 meses",
    "timeline.exploring": "Solo explorando",
    "preview.kicker": "Evaluación lista",
    "preview.title": "El reporte completo puede generarse con estas respuestas.",
    "preview.text": "Agrega tus datos de contacto para ver el puntaje y las recomendaciones.",
    "result.emptyKicker": "VDP / DIAGNÓSTICO",
    "result.emptyTitle": "Vista previa del reporte",
    "result.emptyText": "Completa la evaluación para ver puntaje, bloqueos principales, puntajes por categoría y próximos pasos.",
    "result.emptyScore": "Puntaje de preparación para integración",
    "result.emptyPain": "Principales bloqueos de integración",
    "result.emptyNext": "Ruta recomendada de revisión",
    "result.capturedKicker": "VDP / REPORTE CAPTURADO",
    "result.scoreHeading": "Preparación: {status}",
    "result.scoreHelp": "Puntajes más altos indican menos bloqueos antes de proyectos de integración o automatización.",
    "result.painHeading": "Principales puntos detectados",
    "result.noPain": "No se detectaron bloqueos importantes con estas respuestas.",
    "result.categoryHeading": "Puntajes por categoría",
    "result.recommendationHeading": "Siguiente paso recomendado",
    "result.ctaTitle": "Agendar una revisión de integración con Veri Data",
    "result.ctaText": "Usa este reporte como punto de partida para revisar sistemas, datos, APIs y oportunidades de automatización.",
    "result.ctaMailLabel": "Solicitar revisión",
    "result.visitSite": "Visitar veridatapro.com",
    "category.systemComplexity": "Complejidad de sistemas",
    "category.manualWork": "Trabajo manual",
    "category.dataReadiness": "Calidad de datos",
    "category.apiReadiness": "APIs disponibles",
    "category.operationalRisk": "Riesgo operativo",
    "references.vdp": "Visitar VeriDataPro",
    "references.note": "Integración de sistemas, automatización con APIs, limpieza de datos y revisión de flujos operativos.",
    "errors.completeRequired": "Completa los campos obligatorios para generar el reporte.",
    "errors.systemTypes": "Elige al menos un tipo de sistema.",
    "errors.unable": "No fue posible generar el reporte. Inténtalo nuevamente."
  }
};

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
    lead: {
      fullName: data.get("fullName"),
      email: data.get("email"),
      company: data.get("company"),
      website: data.get("website"),
      companySize: data.get("companySize"),
      timeline: data.get("timeline")
    },
    answers: {
      systemsCount: data.get("systemsCount"),
      systemTypes: data.getAll("systemTypes"),
      manualCopyFrequency: data.get("manualCopyFrequency"),
      spreadsheetDependency: data.get("spreadsheetDependency"),
      apiAvailability: data.get("apiAvailability"),
      sourceOfTruth: data.get("sourceOfTruth"),
      dataQuality: data.get("dataQuality"),
      reportingConsistency: data.get("reportingConsistency"),
      integrationReliability: data.get("integrationReliability"),
      systemOwnership: data.get("systemOwnership"),
      upcomingMigration: data.get("upcomingMigration"),
      biggestProblem: data.get("biggestProblem")
    }
  };
}

function applyTranslations() {
  document.documentElement.lang = HTML_LANG[currentLanguage];
  document.title = t("meta.title");
  document.querySelector('meta[name="description"]').setAttribute("content", t("meta.description"));

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === currentLanguage;
    button.setAttribute("aria-pressed", String(isActive));
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
            <div class="teaser-line" style="width:60%"></div>
          </div>
        </div>
        <div class="teaser-bars">
          <div class="teaser-bar-row"><div class="teaser-bar-label"></div><div class="teaser-bar-fill" style="width:72%"></div></div>
          <div class="teaser-bar-row"><div class="teaser-bar-label"></div><div class="teaser-bar-fill" style="width:44%"></div></div>
          <div class="teaser-bar-row"><div class="teaser-bar-label"></div><div class="teaser-bar-fill" style="width:63%"></div></div>
          <div class="teaser-bar-row"><div class="teaser-bar-label"></div><div class="teaser-bar-fill" style="width:55%"></div></div>
          <div class="teaser-bar-row"><div class="teaser-bar-label"></div><div class="teaser-bar-fill" style="width:38%"></div></div>
        </div>
      </div>
      <ul class="empty-list">
        <li>${escapeHtml(t("result.emptyScore"))}</li>
        <li>${escapeHtml(t("result.emptyPain"))}</li>
        <li>${escapeHtml(t("result.emptyNext"))}</li>
      </ul>
    </div>
  `;
}

function renderCategoryScores(categoryScores) {
  return CATEGORY_KEYS.map((key) => {
    const value = Number(categoryScores[key] || 0);
    return `
      <div class="category-row">
        <span>${escapeHtml(t(`category.${key}`))}</span>
        <strong>${value}</strong>
        <div class="category-track" aria-hidden="true"><i style="--value: ${value}"></i></div>
      </div>
    `;
  }).join("");
}

function renderPainPoints(painPoints) {
  if (!painPoints.length) {
    return `<li>${escapeHtml(t("result.noPain"))}</li>`;
  }

  return painPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join("");
}

function renderResult(result) {
  resultPanel.className = "result-panel";
  resultPanel.innerHTML = `
    <div class="score-card">
      <span class="mono">${escapeHtml(t("result.capturedKicker"))}</span>
      <h2>${escapeHtml(t("result.scoreHeading", { status: result.status }))}</h2>

      <div class="readiness-row">
        <div class="readiness-meter" style="--score: ${result.score}">
          <span>${result.score}</span>
        </div>
        <div>
          <span class="status-pill ${escapeHtml(result.statusKey)}">${escapeHtml(result.status)}</span>
          <p>${escapeHtml(t("result.scoreHelp"))}</p>
        </div>
      </div>

      <div>
        <h3>${escapeHtml(t("result.painHeading"))}</h3>
        <ul class="pain-list">${renderPainPoints(result.painPoints)}</ul>
      </div>

      <div>
        <h3>${escapeHtml(t("result.categoryHeading"))}</h3>
        <div class="category-list">${renderCategoryScores(result.categoryScores)}</div>
      </div>

      <div>
        <h3>${escapeHtml(t("result.recommendationHeading"))}</h3>
        <div class="recommendation-box">${escapeHtml(result.recommendation)}</div>
      </div>

      <div class="cta">
        <h3>${escapeHtml(t("result.ctaTitle"))}</h3>
        <p>${escapeHtml(t("result.ctaText"))}</p>
        <div class="cta-actions">
          <a href="mailto:contact@veridatapro.com?subject=API%20readiness%20review">${escapeHtml(t("result.ctaMailLabel"))}</a>
          <a href="https://veridatapro.com/" target="_blank" rel="noreferrer">${escapeHtml(t("result.visitSite"))}</a>
        </div>
      </div>
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

function isAssessmentComplete() {
  const data = new FormData(form);
  return ANSWER_FIELDS.every((field) => String(data.get(field) || "").trim() !== "") && data.getAll("systemTypes").length > 0;
}

function updateProgress() {
  if (!progressBar || !progressLabel || !progressTrack) return;
  const data = new FormData(form);
  const answered =
    ANSWER_FIELDS.filter((f) => String(data.get(f) || "").trim() !== "").length +
    (data.getAll("systemTypes").length > 0 ? 1 : 0);
  const pct = Math.round((answered / TOTAL_QUESTIONS) * 100);
  progressBar.style.setProperty("--progress", pct + "%");
  progressTrack.setAttribute("aria-valuenow", answered);
  progressLabel.textContent = `${answered} / ${TOTAL_QUESTIONS}`;
}

function updatePreview() {
  updateProgress();
  preview.hidden = !isAssessmentComplete();
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

  if (new FormData(form).getAll("systemTypes").length === 0) {
    showError(t("errors.systemTypes"));
    return;
  }

  submitButton.disabled = true;
  submitLabel.textContent = t("form.calculating");

  try {
    const response = await fetch(`${APP_BASE_PATH}/api/assess`, {
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

    lastResult = { ...body.result, language: currentLanguage };
    renderResult(lastResult);
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
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
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

form.addEventListener("input", updatePreview);
form.addEventListener("change", updatePreview);
form.addEventListener("submit", submitForm);
setLanguage(LANGUAGES.has(currentLanguage) ? currentLanguage : "en", { resetResult: false });
