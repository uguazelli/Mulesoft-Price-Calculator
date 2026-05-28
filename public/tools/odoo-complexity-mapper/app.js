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

function renderSystemGroups() {
  const groups = customSystems.length
    ? [...SYSTEM_GROUPS, { name: "Added systems", systems: customSystems }]
    : SYSTEM_GROUPS;

  systemGroupsRoot.innerHTML = groups
    .map(
      (group) => `
        <section class="choice-category" aria-label="${escapeHtml(group.name)}">
          <h3 class="category-title">${escapeHtml(group.name)}</h3>
          <div class="choice-grid">
            ${group.systems.map((system) => renderSelectorCard(system, selectedSystems.has(system), getSystemMeta(system), "system")).join("")}
          </div>
        </section>
      `
    )
    .join("");

  updateCounts();
}

function renderModuleGroups() {
  moduleGroupsRoot.innerHTML = MODULE_GROUPS.map(
    (group) => `
      <section class="choice-category" aria-label="${escapeHtml(group.name)}">
        <h3 class="category-title">${escapeHtml(group.name)}</h3>
        <div class="choice-grid">
          ${group.modules.map((moduleName) => renderSelectorCard(moduleName, selectedModules.has(moduleName), "Odoo module", "module")).join("")}
        </div>
      </section>
    `
  ).join("");

  updateCounts();
}

function renderSelectorCard(label, selected, meta, type) {
  const dataAttr = type === "system" ? "data-system" : "data-module";

  return `
    <button class="selector-card" type="button" ${dataAttr}="${escapeHtml(label)}" aria-pressed="${selected}">
      <span class="card-title">${escapeHtml(label)}</span>
      <span class="card-meta">${escapeHtml(meta)}</span>
    </button>
  `;
}

function getSystemMeta(systemName) {
  const entry = getMatrixEntry(systemName);
  if (entry.complexity === "Unknown") return "Needs assessment";
  return `${entry.complexity} complexity`;
}

function updateCounts() {
  systemCount.textContent = `${selectedSystems.size} selected`;
  moduleCount.textContent = `${selectedModules.size} selected`;
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
    showAlert("Select at least one current system before moving to Odoo modules.");
    return false;
  }
  return true;
}

function validateStepTwo() {
  if (!selectedModules.size) {
    showAlert("Select at least one Odoo module.");
    return false;
  }

  if (!getRadioValue("odooStage")) {
    showAlert("Choose whether you are already live on Odoo or still evaluating.");
    return false;
  }

  if (!getRadioValue("dataVolume")) {
    showAlert("Choose how much data moves through your operations per day.");
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
  const posture =
    unknownCount > 0
      ? "Audit required"
      : highCount > mediumCount + lowCount
        ? "Custom-heavy scope"
        : highCount > 0
          ? "High-risk scope"
          : mediumCount > 0
            ? "Config-heavy scope"
            : "Low-friction scope";

  scopeSummary.innerHTML = `
    <div class="scope-card">
      <span>Systems selected</span>
      <strong>${rows.length}</strong>
      <p>${escapeHtml(formatPreviewList(rows.map((row) => row.systemName)))}</p>
    </div>
    <div class="scope-card">
      <span>Odoo footprint</span>
      <strong>${selectedModules.size} modules</strong>
      <p>${escapeHtml(formatPreviewList(Array.from(selectedModules)))}</p>
    </div>
    <div class="scope-card">
      <span>Risk profile</span>
      <strong>${escapeHtml(posture)}</strong>
      <p>${highCount} high/custom, ${unknownCount} unknown, ${mediumCount} medium, ${lowCount} low</p>
    </div>
    <div class="scope-card">
      <span>Operating context</span>
      <strong>${escapeHtml(getRadioValue("odooStage"))}</strong>
      <p>${escapeHtml(getRadioValue("dataVolume"))}</p>
    </div>
  `;
}

function formatPreviewList(items) {
  if (!items.length) return "None selected";
  if (items.length <= 2) return items.join(", ");
  return `${items.slice(0, 2).join(", ")} +${items.length - 2} more`;
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
        aria-label="${escapeHtml(row.systemName)} complexity details"
      >
        <rect x="${(x - nodeWidth / 2).toFixed(1)}" y="${(y - nodeHeight / 2).toFixed(1)}" width="${nodeWidth}" height="${nodeHeight}" rx="8"></rect>
        <text x="${x.toFixed(1)}" y="${labelStartY.toFixed(1)}">
          ${labelLines.map((line, lineIndex) => `<tspan x="${x.toFixed(1)}" dy="${lineIndex === 0 ? 0 : 14}">${escapeHtml(line)}</tspan>`).join("")}
        </text>
        <text class="node-rating" x="${x.toFixed(1)}" y="${(y + 27).toFixed(1)}">${escapeHtml(row.complexity)}</text>
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
      <text class="odoo-subtext" x="${center.x}" y="${odooY + 19}">ERP center</text>
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

function renderComplexityTable(rows) {
  complexityTableBody.innerHTML = rows
    .map((row) => {
      const ratingClass = getRatingClass(row);
      const scopeSuffix = row.affectsSelectedModules ? "" : " Outside selected Odoo modules.";

      return `
        <tr>
          <td data-label="System name">${escapeHtml(row.systemName)}</td>
          <td data-label="Odoo module(s) affected">${escapeHtml(formatAffectedModules(row.modules))}</td>
          <td data-label="Complexity rating"><span class="rating-pill ${escapeHtml(ratingClass)}">${escapeHtml(row.rating)}</span></td>
          <td data-label="Primary risk or note">${escapeHtml(row.note + scopeSuffix)}</td>
        </tr>
      `;
    })
    .join("");
}

function formatAffectedModules(modules) {
  if (modules === "Any") return "Any selected module";
  return modules;
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
              <span class="priority-chip ${escapeHtml(item.className)}">${escapeHtml(item.label)}</span>
            </div>
            <p>${escapeHtml(item.reason)}</p>
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
      label: "Custom build conversation",
      reason:
        stage === "Already live"
          ? "Audit production data flow, API access, ownership, and rollback options before changing this integration."
          : "Confirm APIs, source of truth, middleware, and testing scope before committing implementation dates."
    };
  }

  if (row.affectsSelectedModules) {
    return {
      rank: 1,
      className: "first",
      label: "Tackle first",
      reason:
        volume === "High (1000+)"
          ? "It touches selected Odoo modules and high daily volume makes reconciliation and failure handling important early."
          : "It touches selected Odoo modules and helps set source-of-truth rules for the rest of the scope."
    };
  }

  return {
    rank: 2,
    className: "later",
    label: "Tackle later",
    reason: "Useful to connect, but it is less dependent on the Odoo modules selected for this first scope."
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
    <strong>${escapeHtml(row.systemName)}: ${escapeHtml(row.complexity)} complexity</strong>
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
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
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
    showAlert("Enter a system name before adding it.");
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

menuToggle?.addEventListener("click", () => {
  setMenuOpen(!isMenuOpen());
});

headerMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

renderSystemGroups();
renderModuleGroups();
setStep(1);
