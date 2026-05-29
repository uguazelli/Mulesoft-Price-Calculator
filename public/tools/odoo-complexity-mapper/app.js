const systemGroupsRoot = document.querySelector("#systemGroups");
const moduleGroupsRoot = document.querySelector("#moduleGroups");
const mapperAlert = document.querySelector("#mapperAlert");
const systemCount = document.querySelector("[data-system-count]");
const moduleCount = document.querySelector("[data-module-count]");
const customSystemInput = document.querySelector("#customSystemInput");
const stackMap = document.querySelector("#stackMap");
const diagramWrap = document.querySelector("#diagramWrap");
const mapTooltip = document.querySelector("#mapTooltip");
const scopeSummary = document.querySelector("#scopeSummary");
const complexityTableBody = document.querySelector("#complexityTableBody");
const priorityList = document.querySelector("#priorityList");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector("[data-menu-toggle]");
const headerMenu = document.querySelector("[data-header-menu]");
const languageButtons = document.querySelectorAll("[data-language-button]");
const exportPdfButton = document.querySelector("[data-export-pdf]");

const LANGUAGES = new Set(["en", "pt", "es"]);
const HTML_LANG = {
  en: "en",
  pt: "pt-BR",
  es: "es-419"
};

import { TRANSLATIONS } from "../../shared/translations/odoo-complexity-mapper.js";

const SYSTEM_GROUPS = [
  {
    name: "CRM",
    systems: ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM", "Custom CRM", "Spreadsheet-based CRM"]
  },
  {
    name: "eCommerce",
    systems: ["Shopify", "WooCommerce", "Magento", "Custom eCommerce"]
  },
  {
    name: "Finance / Accounting",
    systems: ["QuickBooks", "Xero", "SAP", "Oracle NetSuite", "Custom ERP", "Spreadsheets"]
  },
  {
    name: "Logistics / Inventory",
    systems: ["Custom WMS", "Spreadsheet-based inventory", "3PL provider"]
  },
  {
    name: "Communication / Support",
    systems: ["WhatsApp (manual)", "WhatsApp Business API", "Zendesk", "Intercom"]
  },
  {
    name: "Data / Reporting",
    systems: ["Google Sheets / Excel exports", "Power BI / Tableau", "Custom data warehouse"]
  },
  {
    name: "Other",
    systems: ["Legacy flat files / CSV exports", "Custom internal tools", "I'm not sure what I have"]
  }
];

const MODULE_GROUPS = [
  {
    name: "Core operations",
    modules: ["Sales", "CRM (Odoo CRM)", "Inventory", "Purchase", "Accounting / Invoicing", "Manufacturing (MRP)"]
  },
  {
    name: "Commerce and channels",
    modules: ["eCommerce", "Point of Sale (POS)", "Website", "Email Marketing"]
  },
  {
    name: "Service and back office",
    modules: ["Project", "Helpdesk", "HR / Payroll", "Expenses"]
  }
];

const SYSTEM_ALIASES = {
  "Spreadsheets": "Spreadsheets (finance)",
  "Spreadsheet-based inventory": "Spreadsheet inventory",
  "Legacy flat files / CSV exports": "Legacy flat files / CSV"
};

const SYSTEM_COPY = {
  "Salesforce": {
    label: { pt: "Salesforce", es: "Salesforce" },
    note: {
      pt: "Não há sincronização nativa confiável; normalmente exige middleware como n8n, MuleSoft ou integração sob medida.",
      es: "No hay una sincronización nativa confiable; normalmente requiere middleware como n8n, MuleSoft o una integración a medida."
    }
  },
  "HubSpot": {
    label: { pt: "HubSpot", es: "HubSpot" },
    note: {
      pt: "Há conector nativo, mas campos, direção da sincronização e regras de duplicidade precisam ser configurados e testados.",
      es: "Existe conector nativo, pero campos, dirección de sincronización y reglas de duplicados deben configurarse y probarse."
    }
  },
  "Pipedrive": {
    label: { pt: "Pipedrive", es: "Pipedrive" },
    note: {
      pt: "A API está disponível, mas não há um conector nativo forte para Odoo; normalmente entra via n8n, Zapier ou integração configurada.",
      es: "La API está disponible, pero no hay un conector nativo fuerte para Odoo; normalmente se conecta con n8n, Zapier o una integración configurada."
    }
  },
  "Zoho CRM": {
    label: { pt: "Zoho CRM", es: "Zoho CRM" },
    note: {
      pt: "A API está disponível, mas o suporte nativo com Odoo é limitado; exige mapeamento e testes.",
      es: "La API está disponible, pero el soporte nativo con Odoo es limitado; requiere mapeo y pruebas."
    }
  },
  "Custom CRM": {
    label: { pt: "CRM personalizado", es: "CRM personalizado" },
    note: {
      pt: "Integração sob medida; o escopo depende da qualidade e disponibilidade da API.",
      es: "Integración a medida; el alcance depende de la calidad y disponibilidad de la API."
    }
  },
  "Spreadsheet-based CRM": {
    label: { pt: "CRM em planilhas", es: "CRM en hojas de cálculo" },
    note: {
      pt: "Não há API; exige estratégia de migração, limpeza ou ETL antes de automatizar.",
      es: "No hay API; requiere estrategia de migración, limpieza o ETL antes de automatizar."
    }
  },
  "Shopify": {
    label: { pt: "Shopify", es: "Shopify" },
    note: {
      pt: "Existe conector oficial, mas produtos, pedidos e reconciliação de estoque precisam ser validados.",
      es: "Existe conector oficial, pero productos, pedidos y conciliación de inventario deben validarse."
    }
  },
  "WooCommerce": {
    label: { pt: "WooCommerce", es: "WooCommerce" },
    note: {
      pt: "Há conectores disponíveis; webhooks e variações de produto costumam exigir atenção.",
      es: "Hay conectores disponibles; webhooks y variantes de producto suelen requerir atención."
    }
  },
  "Magento": {
    label: { pt: "Magento", es: "Magento" },
    note: {
      pt: "Catálogo e pedidos têm um modelo mais complexo; normalmente exigem middleware ou integração sob medida.",
      es: "Catálogo y pedidos tienen un modelo más complejo; normalmente requieren middleware o integración a medida."
    }
  },
  "Custom eCommerce": {
    label: { pt: "eCommerce personalizado", es: "eCommerce personalizado" },
    note: {
      pt: "Integração sob medida; é preciso revisar a API antes de estimar.",
      es: "Integración a medida; hay que revisar la API antes de estimar."
    }
  },
  "QuickBooks": {
    label: { pt: "QuickBooks", es: "QuickBooks" },
    note: {
      pt: "Não há conector oficial do Odoo; plano de contas e regras contábeis precisam de mapeamento sob medida.",
      es: "No hay conector oficial de Odoo; plan de cuentas y reglas contables requieren mapeo a medida."
    }
  },
  "Xero": {
    label: { pt: "Xero", es: "Xero" },
    note: {
      pt: "A API está disponível, mas a reconciliação contábil exige mapeamento cuidadoso.",
      es: "La API está disponible, pero la conciliación contable requiere mapeo cuidadoso."
    }
  },
  "SAP": {
    label: { pt: "SAP", es: "SAP" },
    note: {
      pt: "Integração corporativa; exige escopo técnico detalhado e normalmente é sob medida.",
      es: "Integración empresarial; requiere alcance técnico detallado y normalmente es a medida."
    }
  },
  "Oracle NetSuite": {
    label: { pt: "Oracle NetSuite", es: "Oracle NetSuite" },
    note: {
      pt: "Modelo de dados complexo; normalmente exige middleware dedicado.",
      es: "Modelo de datos complejo; normalmente requiere middleware dedicado."
    }
  },
  "Custom ERP": {
    label: { pt: "ERP personalizado", es: "ERP personalizado" },
    note: {
      pt: "Exige revisão da API; provavelmente será uma integração sob medida.",
      es: "Requiere revisión de API; probablemente sea una integración a medida."
    }
  },
  "Spreadsheets": {
    label: { pt: "Planilhas", es: "Hojas de cálculo" }
  },
  "Spreadsheets (finance)": {
    label: { pt: "Planilhas financeiras", es: "Hojas de cálculo financieras" },
    note: {
      pt: "Não há API; exige ETL estruturado ou migração controlada.",
      es: "No hay API; requiere ETL estructurado o migración controlada."
    }
  },
  "Custom WMS": {
    label: { pt: "WMS personalizado", es: "WMS personalizado" },
    note: {
      pt: "Depende totalmente da API do WMS; precisa de avaliação antes de estimar.",
      es: "Depende totalmente de la API del WMS; necesita evaluación antes de estimar."
    }
  },
  "Spreadsheet-based inventory": {
    label: { pt: "Estoque em planilhas", es: "Inventario en hojas de cálculo" }
  },
  "Spreadsheet inventory": {
    label: { pt: "Estoque em planilhas", es: "Inventario en hojas de cálculo" },
    note: {
      pt: "Não há API; serve para importação ou migração, mas não para sincronização contínua sem middleware.",
      es: "No hay API; sirve para importación o migración, pero no para sincronización continua sin middleware."
    }
  },
  "3PL provider": {
    label: { pt: "Operador 3PL", es: "Operador 3PL" },
    note: {
      pt: "Depende da qualidade da API do operador 3PL; existem padrões comuns, mas variam por fornecedor.",
      es: "Depende de la calidad de la API del operador 3PL; hay patrones comunes, pero varían por proveedor."
    }
  },
  "WhatsApp (manual)": {
    label: { pt: "WhatsApp (manual)", es: "WhatsApp (manual)" },
    note: {
      pt: "Pode ser automatizado com WhatsApp Business API e n8n; exige conta BSP e definição do fluxo.",
      es: "Puede automatizarse con WhatsApp Business API y n8n; requiere cuenta BSP y definición del flujo."
    }
  },
  "WhatsApp Business API": {
    label: { pt: "WhatsApp Business API", es: "WhatsApp Business API" },
    note: {
      pt: "Configurável; roteamento de leads e passagem para o CRM precisam ser definidos.",
      es: "Configurable; deben definirse enrutamiento de leads y traspaso al CRM."
    }
  },
  "Zendesk": {
    label: { pt: "Zendesk", es: "Zendesk" },
    note: {
      pt: "A API está disponível; sincronizar chamados com Odoo é um padrão comum.",
      es: "La API está disponible; sincronizar tickets con Odoo es un patrón común."
    }
  },
  "Intercom": {
    label: { pt: "Intercom", es: "Intercom" },
    note: {
      pt: "A API está disponível; contatos e conversas exigem mapeamento de campos.",
      es: "La API está disponible; contactos y conversaciones requieren mapeo de campos."
    }
  },
  "Google Sheets / Excel exports": {
    label: { pt: "Exportações Google Sheets / Excel", es: "Exportaciones Google Sheets / Excel" },
    note: {
      pt: "Não é uma integração real; indica falta de uma camada confiável de dados.",
      es: "No es una integración real; indica falta de una capa confiable de datos."
    }
  },
  "Power BI / Tableau": {
    label: { pt: "Power BI / Tableau", es: "Power BI / Tableau" },
    note: {
      pt: "Odoo oferece API de relatórios e acesso a views de banco; o conector costuma ser direto.",
      es: "Odoo ofrece API de reportes y acceso a vistas de base de datos; el conector suele ser directo."
    }
  },
  "Custom data warehouse": {
    label: { pt: "Data warehouse personalizado", es: "Data warehouse personalizado" },
    note: {
      pt: "Depende do warehouse; ETL do Odoo para o warehouse é um padrão comum.",
      es: "Depende del warehouse; ETL de Odoo hacia el warehouse es un patrón común."
    }
  },
  "Legacy flat files / CSV exports": {
    label: { pt: "Arquivos legados / exportações CSV", es: "Archivos planos heredados / exportaciones CSV" }
  },
  "Legacy flat files / CSV": {
    label: { pt: "Arquivos legados / CSV", es: "Archivos planos heredados / CSV" },
    note: {
      pt: "Exige processamento em lote; uma camada de validação é crítica antes de importar.",
      es: "Requiere procesamiento por lotes; una capa de validación es crítica antes de importar."
    }
  },
  "Custom internal tools": {
    label: { pt: "Ferramentas internas sob medida", es: "Herramientas internas a medida" },
    note: {
      pt: "Precisa de auditoria de API antes de qualquer estimativa.",
      es: "Necesita auditoría de API antes de cualquier estimación."
    }
  },
  "I'm not sure what I have": {
    label: { pt: "Não sei quais sistemas usamos", es: "No sé qué sistemas usamos" },
    note: {
      pt: "Antes de estimar, é preciso inventariar os sistemas, os dados e quem é dono de cada fluxo.",
      es: "Antes de estimar, hay que inventariar los sistemas, los datos y quién es dueño de cada flujo."
    }
  }
};

const MODULE_LABELS = {
  "Sales": { pt: "Vendas", es: "Ventas" },
  "CRM (Odoo CRM)": { pt: "CRM (Odoo CRM)", es: "CRM (Odoo CRM)" },
  "Inventory": { pt: "Estoque", es: "Inventario" },
  "Purchase": { pt: "Compras", es: "Compras" },
  "Accounting / Invoicing": { pt: "Contabilidade / Faturamento", es: "Contabilidad / Facturación" },
  "Manufacturing (MRP)": { pt: "Manufatura (MRP)", es: "Manufactura (MRP)" },
  "eCommerce": { pt: "eCommerce", es: "eCommerce" },
  "Point of Sale (POS)": { pt: "Ponto de Venda (POS)", es: "Punto de Venta (POS)" },
  "Project": { pt: "Projetos", es: "Proyectos" },
  "Helpdesk": { pt: "Helpdesk", es: "Mesa de ayuda" },
  "Email Marketing": { pt: "Email Marketing", es: "Email Marketing" },
  "Website": { pt: "Website", es: "Sitio web" },
  "HR / Payroll": { pt: "RH / Folha", es: "RR. HH. / Nómina" },
  "Expenses": { pt: "Despesas", es: "Gastos" }
};

const MODULE_TOKEN_LABELS = {
  "Any": { pt: "Qualquer módulo selecionado", es: "Cualquier módulo seleccionado" },
  "Sales": { pt: "Vendas", es: "Ventas" },
  "CRM": { pt: "CRM", es: "CRM" },
  "Inventory": { pt: "Estoque", es: "Inventario" },
  "Purchase": { pt: "Compras", es: "Compras" },
  "Accounting": { pt: "Contabilidade", es: "Contabilidad" },
  "ERP": { pt: "ERP", es: "ERP" },
  "eCommerce": { pt: "eCommerce", es: "eCommerce" },
  "Helpdesk": { pt: "Helpdesk", es: "Mesa de ayuda" },
  "Reporting": { pt: "Relatórios", es: "Reportes" }
};

const CATEGORY_LABEL_KEYS = {
  "CRM": "category.crm",
  "eCommerce": "category.ecommerce",
  "Finance / Accounting": "category.finance",
  "Logistics / Inventory": "category.logistics",
  "Communication / Support": "category.communication",
  "Data / Reporting": "category.reporting",
  "Other": "category.other",
  "Added systems": "category.added"
};

const MODULE_GROUP_LABEL_KEYS = {
  "Core operations": "moduleGroup.core",
  "Commerce and channels": "moduleGroup.channels",
  "Service and back office": "moduleGroup.backOffice"
};

const COMPLEXITY_MATRIX = {
  "Salesforce": {
    modules: "CRM / Sales",
    complexity: "High",
    note: "No reliable native sync; middleware required (n8n, MuleSoft, or custom)"
  },
  "HubSpot": {
    modules: "CRM / Sales",
    complexity: "Medium",
    note: "Native connector exists but field mapping and sync direction need configuration"
  },
  "Pipedrive": {
    modules: "CRM / Sales",
    complexity: "Medium",
    note: "API available; no native Odoo connector; configurable via n8n or Zapier"
  },
  "Zoho CRM": {
    modules: "CRM / Sales",
    complexity: "Medium",
    note: "API available; limited native support"
  },
  "Custom CRM": {
    modules: "CRM / Sales",
    complexity: "High",
    note: "Custom build required; depends on API availability"
  },
  "Spreadsheet-based CRM": {
    modules: "CRM / Sales",
    complexity: "High",
    note: "No API; requires ETL or manual migration strategy"
  },
  "Shopify": {
    modules: "eCommerce / Inventory",
    complexity: "Medium",
    note: "Official connector exists; product sync, order sync, and inventory reconciliation each need validation"
  },
  "WooCommerce": {
    modules: "eCommerce / Inventory",
    complexity: "Medium",
    note: "Connector available; webhook reliability and product variant mapping are common friction points"
  },
  "Magento": {
    modules: "eCommerce / Inventory",
    complexity: "High",
    note: "Complex catalog and order model; custom middleware typically required"
  },
  "Custom eCommerce": {
    modules: "eCommerce / Inventory",
    complexity: "High",
    note: "Custom build; API audit required before scoping"
  },
  "QuickBooks": {
    modules: "Accounting",
    complexity: "High",
    note: "No official Odoo connector; chart of accounts mapping is always custom"
  },
  "Xero": {
    modules: "Accounting",
    complexity: "High",
    note: "API available; double-entry reconciliation requires careful field mapping"
  },
  "SAP": {
    modules: "Accounting / ERP",
    complexity: "High",
    note: "Enterprise integration; always custom; significant scoping required"
  },
  "Oracle NetSuite": {
    modules: "Accounting / ERP",
    complexity: "High",
    note: "Complex object model; always custom middleware"
  },
  "Custom ERP": {
    modules: "Accounting / Inventory",
    complexity: "High",
    note: "Requires API audit; likely custom build"
  },
  "Spreadsheets (finance)": {
    modules: "Accounting",
    complexity: "High",
    note: "No API; structured ETL or migration required"
  },
  "Custom WMS": {
    modules: "Inventory",
    complexity: "High",
    note: "Depends entirely on WMS API; always needs assessment"
  },
  "Spreadsheet inventory": {
    modules: "Inventory",
    complexity: "High",
    note: "No API; import/migration required; ongoing sync not possible without middleware"
  },
  "3PL provider": {
    modules: "Inventory",
    complexity: "Medium",
    note: "Depends on 3PL API quality; common patterns exist but vary by provider"
  },
  "WhatsApp (manual)": {
    modules: "CRM / Sales",
    complexity: "Medium",
    note: "Can be automated via WhatsApp Business API + n8n; requires BSP account setup"
  },
  "WhatsApp Business API": {
    modules: "CRM / Sales",
    complexity: "Medium",
    note: "Configurable; lead routing and CRM handoff need definition"
  },
  "Zendesk": {
    modules: "Helpdesk",
    complexity: "Medium",
    note: "API available; ticket-to-Odoo sync is a well-trodden pattern"
  },
  "Intercom": {
    modules: "CRM / Helpdesk",
    complexity: "Medium",
    note: "API available; contact and conversation sync requires field mapping"
  },
  "Google Sheets / Excel exports": {
    modules: "Any",
    complexity: "High",
    note: "Not a real integration; signals a missing data layer"
  },
  "Power BI / Tableau": {
    modules: "Reporting",
    complexity: "Low",
    note: "Odoo has reporting API and direct DB views; connector setup is straightforward"
  },
  "Custom data warehouse": {
    modules: "Reporting",
    complexity: "Medium",
    note: "Depends on warehouse; Odoo to warehouse ETL is a common pattern"
  },
  "Legacy flat files / CSV": {
    modules: "Any",
    complexity: "High",
    note: "Batch processing required; validation layer critical; Veridata Pro's core pattern"
  },
  "Custom internal tools": {
    modules: "Any",
    complexity: "Unknown",
    note: "Requires API audit before any complexity estimate"
  },
  "I'm not sure what I have": {
    modules: "Any",
    complexity: "Unknown",
    note: "Integration audit required before scoping"
  }
};

const MODULE_MATCHES = {
  "CRM": ["CRM (Odoo CRM)"],
  "Sales": ["Sales"],
  "Inventory": ["Inventory"],
  "Purchase": ["Purchase"],
  "Accounting": ["Accounting / Invoicing"],
  "ERP": ["Accounting / Invoicing", "Inventory", "Purchase"],
  "eCommerce": ["eCommerce"],
  "Helpdesk": ["Helpdesk"],
  "Reporting": [],
  "Any": []
};

const selectedSystems = new Set();
const selectedModules = new Set();
const customSystems = [];
let currentStep = 1;
let currentRows = [];
let currentLanguage = localStorage.getItem("odooMapperLanguage") || "en";

function t(key, values = {}) {
  const text = TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS.en[key] || key;
  return Object.entries(values).reduce((memo, [name, value]) => memo.replaceAll(`{${name}}`, value), text);
}

function applyTranslations() {
  document.documentElement.lang = HTML_LANG[currentLanguage];
  document.title = t("meta.title");
  document.querySelector('meta[name="description"]')?.setAttribute("content", t("meta.description"));

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });

  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === currentLanguage));
  });

  syncMenuLabel();
}

function setLanguage(language, { resetResult = false } = {}) {
  if (!LANGUAGES.has(language)) return;

  currentLanguage = language;
  localStorage.setItem("odooMapperLanguage", language);
  applyTranslations();
  renderSystemGroups();
  renderModuleGroups();

  if (currentRows.length && !resetResult) {
    currentRows = buildRows();
    renderScopeSummary(currentRows);
    renderStackMap(currentRows);
    renderComplexityTable(currentRows);
    renderPriorityList(currentRows);
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeText(value) {
  return String(value).trim().replace(/\s+/g, " ");
}

function getLanguageCopy(copy = {}) {
  if (currentLanguage === "en") return copy.en;
  return copy[currentLanguage] || copy.en;
}

function getLookupName(systemName) {
  return SYSTEM_ALIASES[systemName] || systemName;
}

function getSystemCopy(systemName) {
  return SYSTEM_COPY[systemName] || SYSTEM_COPY[getLookupName(systemName)] || null;
}

function getSystemLabel(systemName) {
  const copy = getSystemCopy(systemName);
  return getLanguageCopy(copy?.label) || systemName;
}

function getSystemNote(systemName, entry) {
  const copy = getSystemCopy(systemName);
  return getLanguageCopy(copy?.note) || entry.note || t("note.requiresAssessment");
}

function getModuleLabel(moduleName) {
  return getLanguageCopy(MODULE_LABELS[moduleName]) || moduleName;
}

function getModuleTokenLabel(moduleName) {
  return getLanguageCopy(MODULE_TOKEN_LABELS[moduleName]) || moduleName;
}

function getMatrixEntry(systemName) {
  return (
    COMPLEXITY_MATRIX[systemName] ||
    COMPLEXITY_MATRIX[getLookupName(systemName)] || {
      modules: "Any",
      complexity: "Unknown",
      note: t("note.requiresAssessment")
    }
  );
}

function getComplexityClass(complexity) {
  return String(complexity || "Unknown").toLowerCase();
}

function getDisplayRating(systemName, entry) {
  if (entry.complexity === "Unknown") return "Unknown / needs assessment";
  if (entry.complexity !== "High") return entry.complexity;

  if (hasCustomBuildSignal(`${systemName} ${entry.note}`)) {
    return "Custom build required";
  }

  return "High";
}

function requiresCustomConversation(row) {
  return row.entry?.complexity === "High" || row.complexity === "High" || row.entry?.complexity === "Unknown" || row.complexity === "Unknown";
}

function hasCustomBuildSignal(text) {
  return /custom|middleware|no api|api audit|assessment|enterprise integration|etl|migration|required/i.test(text);
}

function getRadioValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value || "";
}

function selectedModuleIntersects(matrixModules) {
  if (matrixModules === "Any") return selectedModules.size > 0;

  return matrixModules.split("/").some((part) => {
    const key = part.trim();
    const exact = MODULE_MATCHES[key] || [key];
    return exact.some((moduleName) => selectedModules.has(moduleName));
  });
}

function getKnownSystems() {
  return SYSTEM_GROUPS.flatMap((group) => group.systems);
}

function getOptimalColumns(count) {
  if (count <= 4) return count;
  for (const cols of [4, 3, 5, 6]) {
    if (count % cols === 0) return cols;
  }
  return 4;
}

function renderSystemGroups() {
  const groups = customSystems.length
    ? [...SYSTEM_GROUPS, { name: "Added systems", systems: customSystems }]
    : SYSTEM_GROUPS;

  systemGroupsRoot.innerHTML = groups
    .map((group) => {
      const cols = getOptimalColumns(group.systems.length);
      return `
        <section class="choice-category" aria-label="${escapeHtml(getGroupLabel(group.name))}">
          <h3 class="category-title">${escapeHtml(getGroupLabel(group.name))}</h3>
          <div class="choice-grid" style="grid-template-columns: repeat(${cols}, minmax(0, 1fr))">
            ${group.systems.map((system) => renderSelectorCard(system, selectedSystems.has(system), "", "system", null)).join("")}
          </div>
        </section>
      `;
    })
    .join("");

  updateCounts();
}

function renderModuleGroups() {
  moduleGroupsRoot.innerHTML = MODULE_GROUPS.map((group) => {
    const cols = getOptimalColumns(group.modules.length);
    return `
      <section class="choice-category" aria-label="${escapeHtml(getModuleGroupLabel(group.name))}">
        <h3 class="category-title">${escapeHtml(getModuleGroupLabel(group.name))}</h3>
        <div class="choice-grid" style="grid-template-columns: repeat(${cols}, minmax(0, 1fr))">
          ${group.modules.map((moduleName) => renderSelectorCard(moduleName, selectedModules.has(moduleName), "", "module", null)).join("")}
        </div>
      </section>
    `;
  }).join("");

  updateCounts();
}

function renderSelectorCard(label, selected, meta, type, complexityClass) {
  const dataAttr = type === "system" ? "data-system" : "data-module";
  const displayLabel = type === "system" ? getSystemLabel(label) : getModuleLabel(label);
  const badge = complexityClass
    ? `<span class="card-badge ${escapeHtml(complexityClass)}">${escapeHtml(meta)}</span>`
    : "";

  return `
    <button class="selector-card" type="button" ${dataAttr}="${escapeHtml(label)}" aria-pressed="${selected}">
      <span class="card-check" aria-hidden="true"></span>
      <span class="card-title">${escapeHtml(displayLabel)}</span>
      ${badge}
    </button>
  `;
}

function getSystemMeta(systemName) {
  const entry = getMatrixEntry(systemName);
  if (entry.complexity === "Unknown") return t("complexity.unknownShort");
  return getComplexityLabel(entry.complexity);
}

function getSystemComplexityClass(systemName) {
  return getComplexityClass(getMatrixEntry(systemName).complexity);
}

function updateCounts() {
  systemCount.textContent = t("selected.count", { count: selectedSystems.size });
  moduleCount.textContent = t("selected.count", { count: selectedModules.size });
}

function getGroupLabel(groupName) {
  return t(CATEGORY_LABEL_KEYS[groupName] || groupName);
}

function getModuleGroupLabel(groupName) {
  return t(MODULE_GROUP_LABEL_KEYS[groupName] || groupName);
}

function getComplexityLabel(complexity) {
  return t(`complexity.${String(complexity).toLowerCase()}`);
}

function clearAlert() {
  mapperAlert.textContent = "";
  mapperAlert.hidden = true;
}

function showAlert(message) {
  mapperAlert.textContent = message;
  mapperAlert.hidden = false;
  mapperAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function setStep(step) {
  currentStep = step;
  clearAlert();
  document.querySelectorAll("[data-step-panel]").forEach((panel) => {
    panel.hidden = Number(panel.dataset.stepPanel) !== step;
  });
  document.querySelectorAll("[data-step-token]").forEach((token) => {
    token.classList.toggle("is-active", Number(token.dataset.stepToken) === step);
  });
}

function validateStepOne() {
  if (!selectedSystems.size) {
    showAlert(t("errors.noSystems"));
    return false;
  }
  return true;
}

function validateStepTwo() {
  if (!selectedModules.size) {
    showAlert(t("errors.noModules"));
    return false;
  }

  if (!getRadioValue("odooStage")) {
    showAlert(t("errors.noStage"));
    return false;
  }

  if (!getRadioValue("dataVolume")) {
    showAlert(t("errors.noVolume"));
    return false;
  }

  return true;
}

function buildRows() {
  return Array.from(selectedSystems).map((systemName) => {
    const entry = getMatrixEntry(systemName);
    const complexity = entry.complexity;

    return {
      systemName,
      displayName: getSystemLabel(systemName),
      entry,
      modules: entry.modules,
      complexity,
      complexityClass: getComplexityClass(complexity),
      rating: getDisplayRating(systemName, entry),
      note: getSystemNote(systemName, entry),
      affectsSelectedModules: selectedModuleIntersects(entry.modules)
    };
  });
}

function generateResults() {
  if (!validateStepTwo()) return;

  currentRows = buildRows();
  renderScopeSummary(currentRows);
  renderStackMap(currentRows);
  renderComplexityTable(currentRows);
  renderPriorityList(currentRows);
  setStep(3);
  document.querySelector("#results-title").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderScopeSummary(rows) {
  const highCount = rows.filter((row) => row.complexity === "High").length;
  const unknownCount = rows.filter((row) => row.complexity === "Unknown").length;
  const mediumCount = rows.filter((row) => row.complexity === "Medium").length;
  const lowCount = rows.filter((row) => row.complexity === "Low").length;
  const postureKey =
    unknownCount > 0
      ? "posture.audit"
      : highCount > mediumCount + lowCount
        ? "posture.custom"
        : highCount > 0
          ? "posture.highRisk"
          : mediumCount > 0
            ? "posture.config"
            : "posture.low";

  scopeSummary.innerHTML = `
    <div class="scope-card">
      <span>${escapeHtml(t("summary.systems"))}</span>
      <strong>${rows.length}</strong>
      <p>${escapeHtml(formatPreviewList(rows.map((row) => row.displayName)))}</p>
    </div>
    <div class="scope-card">
      <span>${escapeHtml(t("summary.footprint"))}</span>
      <strong>${escapeHtml(t("summary.modules", { count: selectedModules.size }))}</strong>
      <p>${escapeHtml(formatPreviewList(Array.from(selectedModules).map(getModuleLabel)))}</p>
    </div>
    <div class="scope-card">
      <span>${escapeHtml(t("summary.risk"))}</span>
      <strong>${escapeHtml(t(postureKey))}</strong>
      <p>${escapeHtml(t("summary.riskText", { high: highCount, unknown: unknownCount, medium: mediumCount, low: lowCount }))}</p>
    </div>
    <div class="scope-card">
      <span>${escapeHtml(t("summary.context"))}</span>
      <strong>${escapeHtml(getStageLabel())}</strong>
      <p>${escapeHtml(getVolumeLabel())}</p>
    </div>
  `;
}

function formatPreviewList(items) {
  if (!items.length) return t("selected.none");
  if (items.length <= 2) return items.join(", ");
  return t("selected.more", { items: items.slice(0, 2).join(", "), count: items.length - 2 });
}

function getStageLabel(value = getRadioValue("odooStage")) {
  return value ? t(`stage.${value}`) : "";
}

function getVolumeLabel(value = getRadioValue("dataVolume")) {
  return value ? t(`volume.${value}`) : "";
}

function renderStackMap(rows) {
  const count = rows.length || 1;
  const maxRadiusY = count > 16 ? 242 : count > 8 ? 224 : 196;
  const pad = 52; // space above top node + below bottom node
  const centerY = maxRadiusY + pad;
  const svgHeight = centerY * 2;
  const center = { x: 450, y: centerY };
  const nodeWidth = 172;
  const nodeHeight = 72;
  const lines = [];
  const nodes = [];

  rows.forEach((row, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / count;
    const outer = count > 16 && index % 2 === 1;
    const radiusX = count > 16 ? (outer ? 330 : 246) : count > 8 ? 306 : 256;
    const radiusY = count > 16 ? (outer ? 242 : 180) : count > 8 ? 224 : 196;
    const x = center.x + Math.cos(angle) * radiusX;
    const y = center.y + Math.sin(angle) * radiusY;
    const lineEndX = center.x + Math.cos(angle) * (radiusX - nodeWidth * 0.35);
    const lineEndY = center.y + Math.sin(angle) * (radiusY - nodeHeight * 0.35);
    const labelLines = wrapSvgLabel(row.displayName);
    const labelStartY = y - labelLines.length * 8 - 2;

    lines.push(`
      <line
        class="map-line ${escapeHtml(row.complexityClass)}"
        x1="${center.x}"
        y1="${center.y}"
        x2="${lineEndX.toFixed(1)}"
        y2="${lineEndY.toFixed(1)}"
      />
    `);

    nodes.push(`
      <g
        class="map-node ${escapeHtml(row.complexityClass)}"
        data-system="${escapeHtml(row.systemName)}"
        role="button"
        tabindex="0"
        aria-label="${escapeHtml(`${row.displayName} ${t("tooltip.complexity")}`)}"
      >
        <rect x="${(x - nodeWidth / 2).toFixed(1)}" y="${(y - nodeHeight / 2).toFixed(1)}" width="${nodeWidth}" height="${nodeHeight}" rx="8"></rect>
        <text x="${x.toFixed(1)}" y="${labelStartY.toFixed(1)}">
          ${labelLines.map((line, lineIndex) => `<tspan x="${x.toFixed(1)}" dy="${lineIndex === 0 ? 0 : 14}">${escapeHtml(line)}</tspan>`).join("")}
        </text>
        <text class="node-rating" x="${x.toFixed(1)}" y="${(y + 27).toFixed(1)}">${escapeHtml(getComplexityShortLabel(row.complexity))}</text>
      </g>
    `);
  });

  const odooY = center.y;
  stackMap.setAttribute("viewBox", `0 0 900 ${svgHeight}`);
  stackMap.style.height = `${Math.round(svgHeight * 0.965)}px`;
  stackMap.innerHTML = `
    <g class="map-lines">${lines.join("")}</g>
    <g class="map-nodes">${nodes.join("")}</g>
    <g class="odoo-node" aria-label="Odoo center node">
      <rect x="${center.x - 100}" y="${odooY - 40}" width="200" height="80" rx="8"></rect>
      <text x="${center.x}" y="${odooY - 3}">Odoo</text>
      <text class="odoo-subtext" x="${center.x}" y="${odooY + 19}">${escapeHtml(t("map.center"))}</text>
    </g>
  `;

  hideTooltip();
}

function wrapSvgLabel(label) {
  const words = String(label).split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (nextLine.length > 20 && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = nextLine;
    }
  });

  if (currentLine) lines.push(currentLine);

  if (lines.length > 3) {
    const compact = lines.slice(0, 2);
    compact.push(`${lines.slice(2).join(" ").slice(0, 18)}...`);
    return compact;
  }

  return lines;
}

function getComplexityShortLabel(complexity) {
  if (complexity === "Unknown") return t("complexity.unknownShort");
  return getComplexityLabel(complexity);
}

function renderComplexityTable(rows) {
  complexityTableBody.innerHTML = rows
    .map((row) => {
      const ratingClass = getRatingClass(row);
      const scopeSuffix = row.affectsSelectedModules ? "" : t("table.outsideScope");

      return `
        <tr>
          <td data-label="${escapeHtml(t("table.system"))}">${escapeHtml(row.displayName)}</td>
          <td data-label="${escapeHtml(t("table.modules"))}">${escapeHtml(formatAffectedModules(row.modules))}</td>
          <td data-label="${escapeHtml(t("table.rating"))}"><span class="rating-pill ${escapeHtml(ratingClass)}">${escapeHtml(formatRating(row))}</span></td>
          <td data-label="${escapeHtml(t("table.note"))}">${escapeHtml(row.note + scopeSuffix)}</td>
        </tr>
      `;
    })
    .join("");
}

function formatAffectedModules(modules) {
  if (modules === "Any") return t("table.anyModule");
  return modules
    .split("/")
    .map((moduleName) => getModuleTokenLabel(moduleName.trim()))
    .join(" / ");
}

function formatRating(row) {
  if (row.rating === "Custom build required") return t("rating.customBuild");
  if (row.complexity === "Unknown") return t("complexity.unknown");
  return getComplexityLabel(row.complexity);
}

function getRatingClass(row) {
  if (row.rating === "Custom build required") return "custom";
  if (row.complexity === "Unknown") return "unknown";
  return row.complexityClass;
}

function renderPriorityList(rows) {
  const items = rows
    .map((row) => {
      const priority = getPriority(row);
      return {
        row,
        ...priority
      };
    })
    .sort((a, b) => a.rank - b.rank || complexityWeight(b.row.complexity) - complexityWeight(a.row.complexity));

  priorityList.innerHTML = items
    .map(
      (item) => `
        <li>
          <div class="priority-body">
            <div class="priority-topline">
              <strong>${escapeHtml(item.row.displayName)}</strong>
              <span class="priority-chip ${escapeHtml(item.className)}">${escapeHtml(t(item.labelKey))}</span>
            </div>
            <p>${escapeHtml(t(item.reasonKey))}</p>
          </div>
        </li>
      `
    )
    .join("");
}

function getPriority(row) {
  const stage = getRadioValue("odooStage");
  const volume = getRadioValue("dataVolume");

  if (row.complexity === "High" || row.complexity === "Unknown") {
    return {
      rank: 3,
      className: "custom",
      labelKey: "priority.customLabel",
      reasonKey: stage === "alreadyLive" ? "priority.liveReason" : "priority.customReason"
    };
  }

  if (row.affectsSelectedModules) {
    return {
      rank: 1,
      className: "first",
      labelKey: "priority.firstLabel",
      reasonKey: volume === "high" ? "priority.highVolumeReason" : "priority.firstReason"
    };
  }

  return {
    rank: 2,
    className: "later",
    labelKey: "priority.laterLabel",
    reasonKey: "priority.laterReason"
  };
}

function complexityWeight(complexity) {
  return {
    Unknown: 4,
    High: 3,
    Medium: 2,
    Low: 1
  }[complexity] || 0;
}

function showTooltip(systemName, eventTarget) {
  const row = currentRows.find((item) => item.systemName === systemName);
  if (!row) return;

  mapTooltip.className = `map-tooltip ${row.complexityClass}`;
  mapTooltip.innerHTML = `
    <strong>${escapeHtml(row.displayName)}: ${escapeHtml(getComplexityShortLabel(row.complexity))} ${escapeHtml(t("tooltip.complexity"))}</strong>
    <span>${escapeHtml(row.note)}</span>
  `;
  mapTooltip.hidden = false;

  const wrapRect = diagramWrap.getBoundingClientRect();
  const targetRect = eventTarget.getBoundingClientRect();
  const left = targetRect.left - wrapRect.left + diagramWrap.scrollLeft + targetRect.width / 2 + 12;
  const top = targetRect.top - wrapRect.top + diagramWrap.scrollTop + targetRect.height / 2 + 12;
  const maxLeft = diagramWrap.scrollLeft + diagramWrap.clientWidth - 340;

  mapTooltip.style.left = `${Math.max(12, Math.min(left, maxLeft))}px`;
  mapTooltip.style.top = `${Math.max(12, top)}px`;
}

function hideTooltip() {
  mapTooltip.hidden = true;
}

function isMenuOpen() {
  return menuToggle?.getAttribute("aria-expanded") === "true";
}

function setMenuOpen(open) {
  if (!menuToggle || !siteHeader) return;
  siteHeader.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  syncMenuLabel();
}

function syncMenuLabel() {
  if (!menuToggle) return;
  menuToggle.setAttribute("aria-label", t(isMenuOpen() ? "menu.close" : "menu.open"));
}

systemGroupsRoot.addEventListener("click", (event) => {
  const button = event.target.closest("[data-system]");
  if (!button) return;

  const system = button.dataset.system;
  if (selectedSystems.has(system)) {
    selectedSystems.delete(system);
  } else {
    selectedSystems.add(system);
  }

  renderSystemGroups();
  clearAlert();
});

moduleGroupsRoot.addEventListener("click", (event) => {
  const button = event.target.closest("[data-module]");
  if (!button) return;

  const moduleName = button.dataset.module;
  if (selectedModules.has(moduleName)) {
    selectedModules.delete(moduleName);
  } else {
    selectedModules.add(moduleName);
  }

  renderModuleGroups();
  clearAlert();
});

document.querySelector("[data-add-custom-system]").addEventListener("click", () => {
  const customSystem = normalizeText(customSystemInput.value);
  if (!customSystem) {
    showAlert(t("errors.customSystem"));
    return;
  }

  const knownMatch = getKnownSystems().find((system) => system.toLowerCase() === customSystem.toLowerCase());
  const customMatch = customSystems.find((system) => system.toLowerCase() === customSystem.toLowerCase());
  const label = knownMatch || customMatch || customSystem;

  if (!knownMatch && !customMatch) {
    customSystems.push(customSystem);
  }

  selectedSystems.add(label);
  customSystemInput.value = "";
  renderSystemGroups();
  clearAlert();
});

customSystemInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("[data-add-custom-system]").click();
  }
});

document.querySelectorAll("[data-next-step]").forEach((button) => {
  button.addEventListener("click", () => {
    if (Number(button.dataset.nextStep) === 2 && !validateStepOne()) return;
    setStep(Number(button.dataset.nextStep));
  });
});

document.querySelectorAll("[data-prev-step]").forEach((button) => {
  button.addEventListener("click", () => setStep(Number(button.dataset.prevStep)));
});

document.querySelector("[data-generate-results]").addEventListener("click", generateResults);

document.querySelector("[data-reset-tool]").addEventListener("click", () => {
  selectedSystems.clear();
  selectedModules.clear();
  customSystems.splice(0, customSystems.length);
  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.checked = false;
  });
  currentRows = [];
  renderSystemGroups();
  renderModuleGroups();
  setStep(1);
});

stackMap.addEventListener("click", (event) => {
  const node = event.target.closest(".map-node");
  if (!node) return;
  event.stopPropagation();
  showTooltip(node.dataset.system, node);
});

stackMap.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const node = event.target.closest(".map-node");
  if (!node) return;
  event.preventDefault();
  showTooltip(node.dataset.system, node);
});

document.addEventListener("click", (event) => {
  if (!diagramWrap.contains(event.target)) hideTooltip();

  if (!isMenuOpen()) return;
  if (siteHeader.contains(event.target)) {
    if (event.target.closest("[data-menu-toggle]")) return;
    if (event.target.closest("[data-header-menu]")) return;
  }
  setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideTooltip();
    setMenuOpen(false);
  }
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
    setMenuOpen(false);
  });
});

menuToggle?.addEventListener("click", () => {
  setMenuOpen(!isMenuOpen());
});

headerMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

exportPdfButton?.addEventListener("click", exportResultsPdf);

window.addEventListener("afterprint", () => {
  document.body.classList.remove("printing-results");
});

function exportResultsPdf() {
  if (!currentRows.length || currentStep !== 3) {
    showAlert(t("errors.exportFirst"));
    return;
  }

  hideTooltip();
  const previousTitle = document.title;
  document.title = t("pdf.title");
  document.body.classList.add("printing-results");
  setTimeout(() => {
    window.print();
    document.title = previousTitle;
    setTimeout(() => document.body.classList.remove("printing-results"), 250);
  }, 0);
}

setLanguage(LANGUAGES.has(currentLanguage) ? currentLanguage : "en");
setStep(1);
