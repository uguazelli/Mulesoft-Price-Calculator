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

const TRANSLATIONS = {
  en: {
    "meta.title": "Odoo Integration Complexity Mapper | VeriDataPro",
    "meta.description":
      "A browser-based Odoo integration scoping tool that maps system complexity, affected modules, risks, and implementation priorities.",
    "brand.subtitle": "Systems integration and automation",
    "menu.open": "Open menu",
    "menu.close": "Close menu",
    "hero.eyebrow": "Odoo scoping tool",
    "hero.title": "Odoo Integration Complexity Mapper",
    "hero.lede":
      "Select the systems around Odoo, the Odoo modules in scope, and get a first-pass architecture map with complexity, risk notes, and implementation priority.",
    "hero.note": "Directional scoping only. Final estimates still require API access, data samples, and source-of-truth decisions.",
    "stepper.stack": "1. Your stack",
    "stepper.modules": "2. Odoo modules",
    "stepper.results": "3. Results",
    "step.one": "Step 1",
    "step.two": "Step 2",
    "step.three": "Step 3",
    "stack.title": "Which systems does your business currently run?",
    "stack.text": "Select every system that creates, receives, or reports on operational data.",
    "stack.continue": "Continue to Odoo modules",
    "custom.label": "System not listed",
    "custom.placeholder": "Example: in-house quoting app",
    "custom.add": "Add system",
    "modules.title": "Which Odoo modules are you using or planning to use?",
    "modules.text": "Choose the Odoo footprint these integrations need to support.",
    "modules.generate": "Generate complexity map",
    "stage.title": "Are you already live on Odoo or still evaluating?",
    "stage.alreadyLive": "Already live",
    "stage.evaluating": "Currently evaluating",
    "stage.research": "Just starting research",
    "volume.title": "How much data moves through your operations per day?",
    "volume.low": "Low (under 100 transactions)",
    "volume.medium": "Medium (100-1000)",
    "volume.high": "High (1000+)",
    "volume.unknown": "I don't know",
    "common.back": "Back",
    "results.title": "Odoo integration complexity results",
    "results.text": "Use this as a scoping conversation starter before committing budget or delivery dates.",
    "results.back": "Back to modules",
    "results.reset": "Start over",
    "map.kicker": "A / Visual stack map",
    "map.title": "Systems around Odoo",
    "map.center": "ERP center",
    "table.kicker": "B / Complexity breakdown",
    "table.title": "Integration table",
    "table.system": "System name",
    "table.modules": "Odoo module(s) affected",
    "table.rating": "Complexity rating",
    "table.note": "Primary risk or note",
    "priority.kicker": "C / Priority order",
    "priority.title": "Recommended sequencing",
    "cta.title": "Ready to scope this properly?",
    "cta.text": "Share this map with your team, then book a 30-minute call to turn these signals into a phased, budgetable delivery plan.",
    "cta.export": "Export result as PDF",
    "cta.book": "Book a scoping call",
    "cta.odoo": "Odoo services",
    "category.crm": "CRM",
    "category.ecommerce": "eCommerce",
    "category.finance": "Finance / Accounting",
    "category.logistics": "Logistics / Inventory",
    "category.communication": "Communication / Support",
    "category.reporting": "Data / Reporting",
    "category.other": "Other",
    "category.added": "Added systems",
    "moduleGroup.core": "Core operations",
    "moduleGroup.channels": "Commerce and channels",
    "moduleGroup.backOffice": "Service and back office",
    "meta.needsAssessment": "Needs assessment",
    "meta.odooModule": "Odoo module",
    "meta.complexity": "{complexity} complexity",
    "selected.count": "{count} selected",
    "selected.none": "None selected",
    "selected.more": "{items} +{count} more",
    "summary.systems": "Systems selected",
    "summary.footprint": "Odoo footprint",
    "summary.modules": "{count} modules",
    "summary.risk": "Risk profile",
    "summary.context": "Operating context",
    "summary.riskText": "{high} high/custom, {unknown} unknown, {medium} medium, {low} low",
    "posture.audit": "Audit required",
    "posture.custom": "Custom-heavy scope",
    "posture.highRisk": "High-risk scope",
    "posture.config": "Config-heavy scope",
    "posture.low": "Low-friction scope",
    "complexity.low": "Low",
    "complexity.medium": "Medium",
    "complexity.high": "High",
    "complexity.unknownShort": "Unknown",
    "complexity.unknown": "Unknown / needs assessment",
    "rating.customBuild": "Custom build required",
    "table.anyModule": "Any selected module",
    "table.outsideScope": " Outside selected Odoo modules.",
    "priority.customLabel": "Custom build conversation",
    "priority.firstLabel": "Tackle first",
    "priority.laterLabel": "Tackle later",
    "priority.liveReason": "Audit production data flow, API access, ownership, and rollback options before changing this integration.",
    "priority.customReason": "Confirm APIs, source of truth, middleware, and testing scope before committing implementation dates.",
    "priority.highVolumeReason":
      "It touches selected Odoo modules and high daily volume makes reconciliation and failure handling important early.",
    "priority.firstReason": "It touches selected Odoo modules and helps set source-of-truth rules for the rest of the scope.",
    "priority.laterReason": "Useful to connect, but it is less dependent on the Odoo modules selected for this first scope.",
    "tooltip.complexity": "complexity",
    "errors.noSystems": "Select at least one current system before moving to Odoo modules.",
    "errors.noModules": "Select at least one Odoo module.",
    "errors.noStage": "Choose whether you are already live on Odoo or still evaluating.",
    "errors.noVolume": "Choose how much data moves through your operations per day.",
    "errors.customSystem": "Enter a system name before adding it.",
    "errors.exportFirst": "Generate a complexity map before exporting a PDF.",
    "pdf.title": "Odoo Integration Complexity Map"
  },
  pt: {
    "meta.title": "Mapeador de Complexidade de Integração Odoo | VeriDataPro",
    "meta.description":
      "Uma ferramenta no navegador para escopo de integração Odoo, com complexidade por sistema, módulos afetados, riscos e prioridades.",
    "brand.subtitle": "Integração de sistemas e automação",
    "menu.open": "Abrir menu",
    "menu.close": "Fechar menu",
    "hero.eyebrow": "Ferramenta de escopo Odoo",
    "hero.title": "Mapeador de Complexidade de Integração Odoo",
    "hero.lede":
      "Selecione os sistemas ao redor do Odoo, os módulos em escopo e gere um mapa inicial de arquitetura com complexidade, riscos e prioridade de implementação.",
    "hero.note": "Escopo direcional. Estimativas finais ainda exigem acesso às APIs, amostras de dados e decisões de fonte da verdade.",
    "stepper.stack": "1. Sua stack",
    "stepper.modules": "2. Módulos Odoo",
    "stepper.results": "3. Resultados",
    "step.one": "Etapa 1",
    "step.two": "Etapa 2",
    "step.three": "Etapa 3",
    "stack.title": "Quais sistemas sua empresa usa hoje?",
    "stack.text": "Selecione todos os sistemas que criam, recebem ou reportam dados operacionais.",
    "stack.continue": "Continuar para módulos Odoo",
    "custom.label": "Sistema não listado",
    "custom.placeholder": "Exemplo: app interno de cotações",
    "custom.add": "Adicionar sistema",
    "modules.title": "Quais módulos Odoo você usa ou pretende usar?",
    "modules.text": "Escolha o footprint Odoo que estas integrações precisam suportar.",
    "modules.generate": "Gerar mapa de complexidade",
    "stage.title": "Você já está em produção no Odoo ou ainda está avaliando?",
    "stage.alreadyLive": "Já em produção",
    "stage.evaluating": "Em avaliação",
    "stage.research": "Pesquisa inicial",
    "volume.title": "Quanto dado passa pela operação por dia?",
    "volume.low": "Baixo (menos de 100 transações)",
    "volume.medium": "Médio (100-1000)",
    "volume.high": "Alto (1000+)",
    "volume.unknown": "Não sei",
    "common.back": "Voltar",
    "results.title": "Resultado de complexidade de integração Odoo",
    "results.text": "Use isto como ponto de partida para escopo antes de comprometer orçamento ou datas.",
    "results.back": "Voltar aos módulos",
    "results.reset": "Começar de novo",
    "map.kicker": "A / Mapa visual da stack",
    "map.title": "Sistemas ao redor do Odoo",
    "map.center": "Centro ERP",
    "table.kicker": "B / Quebra de complexidade",
    "table.title": "Tabela de integrações",
    "table.system": "Sistema",
    "table.modules": "Módulo(s) Odoo afetados",
    "table.rating": "Complexidade",
    "table.note": "Risco ou observação principal",
    "priority.kicker": "C / Ordem de prioridade",
    "priority.title": "Sequenciamento recomendado",
    "cta.title": "Pronto para escopar isso corretamente?",
    "cta.text": "Compartilhe este mapa com sua equipe e agende uma chamada de 30 minutos para transformar os sinais em um plano faseado e orçável.",
    "cta.export": "Exportar resultado em PDF",
    "cta.book": "Agendar chamada de escopo",
    "cta.odoo": "Serviços Odoo",
    "category.crm": "CRM",
    "category.ecommerce": "eCommerce",
    "category.finance": "Financeiro / Contabilidade",
    "category.logistics": "Logística / Estoque",
    "category.communication": "Comunicação / Suporte",
    "category.reporting": "Dados / Relatórios",
    "category.other": "Outros",
    "category.added": "Sistemas adicionados",
    "moduleGroup.core": "Operação principal",
    "moduleGroup.channels": "Comércio e canais",
    "moduleGroup.backOffice": "Serviço e back office",
    "meta.needsAssessment": "Precisa de avaliação",
    "meta.odooModule": "Módulo Odoo",
    "meta.complexity": "Complexidade {complexity}",
    "selected.count": "{count} selecionados",
    "selected.none": "Nada selecionado",
    "selected.more": "{items} +{count} mais",
    "summary.systems": "Sistemas selecionados",
    "summary.footprint": "Footprint Odoo",
    "summary.modules": "{count} módulos",
    "summary.risk": "Perfil de risco",
    "summary.context": "Contexto operacional",
    "summary.riskText": "{high} alto/custom, {unknown} desconhecido, {medium} médio, {low} baixo",
    "posture.audit": "Auditoria necessária",
    "posture.custom": "Escopo com muito custom",
    "posture.highRisk": "Escopo de alto risco",
    "posture.config": "Escopo com muita configuração",
    "posture.low": "Baixa fricção",
    "complexity.low": "Baixa",
    "complexity.medium": "Média",
    "complexity.high": "Alta",
    "complexity.unknownShort": "Desconhecida",
    "complexity.unknown": "Desconhecida / precisa de avaliação",
    "rating.customBuild": "Build custom necessário",
    "table.anyModule": "Qualquer módulo selecionado",
    "table.outsideScope": " Fora dos módulos Odoo selecionados.",
    "priority.customLabel": "Conversa de build custom",
    "priority.firstLabel": "Tratar primeiro",
    "priority.laterLabel": "Tratar depois",
    "priority.liveReason": "Audite fluxo de dados em produção, APIs, responsáveis e rollback antes de alterar esta integração.",
    "priority.customReason": "Confirme APIs, fonte da verdade, middleware e testes antes de comprometer datas.",
    "priority.highVolumeReason":
      "Toca módulos Odoo selecionados e alto volume diário torna reconciliação e tratamento de falhas importantes desde o início.",
    "priority.firstReason": "Toca módulos Odoo selecionados e ajuda a definir regras de fonte da verdade para o restante do escopo.",
    "priority.laterReason": "É útil conectar, mas depende menos dos módulos Odoo selecionados para este primeiro escopo.",
    "tooltip.complexity": "complexidade",
    "errors.noSystems": "Selecione pelo menos um sistema atual antes de avançar para módulos Odoo.",
    "errors.noModules": "Selecione pelo menos um módulo Odoo.",
    "errors.noStage": "Escolha se você já está em produção no Odoo ou ainda avaliando.",
    "errors.noVolume": "Escolha quanto dado passa pela operação por dia.",
    "errors.customSystem": "Digite o nome de um sistema antes de adicionar.",
    "errors.exportFirst": "Gere um mapa de complexidade antes de exportar o PDF.",
    "pdf.title": "Mapa de Complexidade de Integração Odoo"
  },
  es: {
    "meta.title": "Mapeador de Complejidad de Integración Odoo | VeriDataPro",
    "meta.description":
      "Una herramienta en el navegador para dimensionar integraciones Odoo, con complejidad por sistema, módulos afectados, riesgos y prioridades.",
    "brand.subtitle": "Integración de sistemas y automatización",
    "menu.open": "Abrir menú",
    "menu.close": "Cerrar menú",
    "hero.eyebrow": "Herramienta de alcance Odoo",
    "hero.title": "Mapeador de Complejidad de Integración Odoo",
    "hero.lede":
      "Selecciona los sistemas alrededor de Odoo, los módulos en alcance y genera un primer mapa de arquitectura con complejidad, riesgos y prioridad de implementación.",
    "hero.note": "Alcance direccional. Las estimaciones finales aún requieren acceso a APIs, muestras de datos y decisiones de fuente de verdad.",
    "stepper.stack": "1. Tu stack",
    "stepper.modules": "2. Módulos Odoo",
    "stepper.results": "3. Resultados",
    "step.one": "Paso 1",
    "step.two": "Paso 2",
    "step.three": "Paso 3",
    "stack.title": "¿Qué sistemas usa actualmente tu empresa?",
    "stack.text": "Selecciona todos los sistemas que crean, reciben o reportan datos operativos.",
    "stack.continue": "Continuar a módulos Odoo",
    "custom.label": "Sistema no listado",
    "custom.placeholder": "Ejemplo: app interna de cotizaciones",
    "custom.add": "Agregar sistema",
    "modules.title": "¿Qué módulos Odoo usas o planeas usar?",
    "modules.text": "Elige el footprint Odoo que estas integraciones deben soportar.",
    "modules.generate": "Generar mapa de complejidad",
    "stage.title": "¿Ya estás en vivo en Odoo o todavía estás evaluando?",
    "stage.alreadyLive": "Ya en vivo",
    "stage.evaluating": "En evaluación",
    "stage.research": "Investigación inicial",
    "volume.title": "¿Cuántos datos pasan por la operación por día?",
    "volume.low": "Bajo (menos de 100 transacciones)",
    "volume.medium": "Medio (100-1000)",
    "volume.high": "Alto (1000+)",
    "volume.unknown": "No sé",
    "common.back": "Volver",
    "results.title": "Resultado de complejidad de integración Odoo",
    "results.text": "Úsalo como punto de partida antes de comprometer presupuesto o fechas.",
    "results.back": "Volver a módulos",
    "results.reset": "Empezar de nuevo",
    "map.kicker": "A / Mapa visual del stack",
    "map.title": "Sistemas alrededor de Odoo",
    "map.center": "Centro ERP",
    "table.kicker": "B / Desglose de complejidad",
    "table.title": "Tabla de integraciones",
    "table.system": "Sistema",
    "table.modules": "Módulo(s) Odoo afectados",
    "table.rating": "Complejidad",
    "table.note": "Riesgo o nota principal",
    "priority.kicker": "C / Orden de prioridad",
    "priority.title": "Secuencia recomendada",
    "cta.title": "¿Listo para dimensionar esto correctamente?",
    "cta.text": "Comparte este mapa con tu equipo y agenda una llamada de 30 minutos para convertir estas señales en un plan por fases y presupuestable.",
    "cta.export": "Exportar resultado como PDF",
    "cta.book": "Agendar llamada de alcance",
    "cta.odoo": "Servicios Odoo",
    "category.crm": "CRM",
    "category.ecommerce": "eCommerce",
    "category.finance": "Finanzas / Contabilidad",
    "category.logistics": "Logística / Inventario",
    "category.communication": "Comunicación / Soporte",
    "category.reporting": "Datos / Reportes",
    "category.other": "Otros",
    "category.added": "Sistemas agregados",
    "moduleGroup.core": "Operación principal",
    "moduleGroup.channels": "Comercio y canales",
    "moduleGroup.backOffice": "Servicio y back office",
    "meta.needsAssessment": "Requiere evaluación",
    "meta.odooModule": "Módulo Odoo",
    "meta.complexity": "Complejidad {complexity}",
    "selected.count": "{count} seleccionados",
    "selected.none": "Nada seleccionado",
    "selected.more": "{items} +{count} más",
    "summary.systems": "Sistemas seleccionados",
    "summary.footprint": "Footprint Odoo",
    "summary.modules": "{count} módulos",
    "summary.risk": "Perfil de riesgo",
    "summary.context": "Contexto operativo",
    "summary.riskText": "{high} alto/custom, {unknown} desconocido, {medium} medio, {low} bajo",
    "posture.audit": "Auditoría requerida",
    "posture.custom": "Alcance con mucho custom",
    "posture.highRisk": "Alcance de alto riesgo",
    "posture.config": "Alcance con mucha configuración",
    "posture.low": "Baja fricción",
    "complexity.low": "Baja",
    "complexity.medium": "Media",
    "complexity.high": "Alta",
    "complexity.unknownShort": "Desconocida",
    "complexity.unknown": "Desconocida / requiere evaluación",
    "rating.customBuild": "Build custom requerido",
    "table.anyModule": "Cualquier módulo seleccionado",
    "table.outsideScope": " Fuera de los módulos Odoo seleccionados.",
    "priority.customLabel": "Conversación de build custom",
    "priority.firstLabel": "Tratar primero",
    "priority.laterLabel": "Tratar después",
    "priority.liveReason": "Audita flujo de datos en producción, APIs, responsables y rollback antes de cambiar esta integración.",
    "priority.customReason": "Confirma APIs, fuente de verdad, middleware y pruebas antes de comprometer fechas.",
    "priority.highVolumeReason":
      "Toca módulos Odoo seleccionados y el alto volumen diario hace importante definir reconciliación y manejo de fallas desde temprano.",
    "priority.firstReason": "Toca módulos Odoo seleccionados y ayuda a definir reglas de fuente de verdad para el resto del alcance.",
    "priority.laterReason": "Es útil conectarlo, pero depende menos de los módulos Odoo seleccionados para este primer alcance.",
    "tooltip.complexity": "complejidad",
    "errors.noSystems": "Selecciona al menos un sistema actual antes de avanzar a módulos Odoo.",
    "errors.noModules": "Selecciona al menos un módulo Odoo.",
    "errors.noStage": "Elige si ya estás en vivo en Odoo o todavía estás evaluando.",
    "errors.noVolume": "Elige cuántos datos pasan por la operación por día.",
    "errors.customSystem": "Escribe el nombre de un sistema antes de agregarlo.",
    "errors.exportFirst": "Genera un mapa de complejidad antes de exportar el PDF.",
    "pdf.title": "Mapa de Complejidad de Integración Odoo"
  }
};

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

function getLookupName(systemName) {
  return SYSTEM_ALIASES[systemName] || systemName;
}

function getMatrixEntry(systemName) {
  return (
    COMPLEXITY_MATRIX[systemName] ||
    COMPLEXITY_MATRIX[getLookupName(systemName)] || {
      modules: "Any",
      complexity: "Unknown",
      note: "Requires assessment."
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
  const badge = complexityClass
    ? `<span class="card-badge ${escapeHtml(complexityClass)}">${escapeHtml(meta)}</span>`
    : "";

  return `
    <button class="selector-card" type="button" ${dataAttr}="${escapeHtml(label)}" aria-pressed="${selected}">
      <span class="card-title">${escapeHtml(label)}</span>
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
      entry,
      modules: entry.modules,
      complexity,
      complexityClass: getComplexityClass(complexity),
      rating: getDisplayRating(systemName, entry),
      note: entry.note,
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
      <p>${escapeHtml(formatPreviewList(rows.map((row) => row.systemName)))}</p>
    </div>
    <div class="scope-card">
      <span>${escapeHtml(t("summary.footprint"))}</span>
      <strong>${escapeHtml(t("summary.modules", { count: selectedModules.size }))}</strong>
      <p>${escapeHtml(formatPreviewList(Array.from(selectedModules)))}</p>
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
    const labelLines = wrapSvgLabel(row.systemName);
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
        aria-label="${escapeHtml(`${row.systemName} ${t("tooltip.complexity")}`)}"
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
          <td data-label="${escapeHtml(t("table.system"))}">${escapeHtml(row.systemName)}</td>
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
  return modules;
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
              <strong>${escapeHtml(item.row.systemName)}</strong>
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
    <strong>${escapeHtml(row.systemName)}: ${escapeHtml(getComplexityShortLabel(row.complexity))} ${escapeHtml(t("tooltip.complexity"))}</strong>
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
