const SUPPORTED_LANGUAGES = new Set(["en", "pt", "es"]);

const STATUS_THRESHOLDS = [
  { min: 80, key: "ready" },
  { min: 60, key: "partial" },
  { min: 40, key: "risk" },
  { min: 0, key: "notReady" }
];

const COPY = {
  en: {
    status: {
      ready: "Integration Ready",
      partial: "Partially Ready",
      risk: "At Risk",
      notReady: "Not Ready"
    },
    pain: {
      manySystems: "Many systems need coordination",
      tooManySystems: "High system sprawl",
      manualDaily: "Daily manual data copying",
      manualMultiple: "Manual copying happens multiple times per day",
      spreadsheetMedium: "Important work still depends on spreadsheets",
      spreadsheetHeavy: "Heavy spreadsheet dependency",
      apiUnknown: "API availability is unclear",
      apiNone: "Core systems may not expose usable APIs",
      sourceUnclear: "No clear source of truth",
      sourceNone: "Teams do not share a trusted system of record",
      dataInconsistent: "Data quality issues may block automation",
      dataPoor: "Data needs cleanup before serious integration work",
      reportingDifferent: "Different teams report different numbers",
      reportingManual: "Reporting depends on manual work",
      unreliable: "Integrations break often",
      manualFixes: "Integrations require manual fixes",
      ownerUnclear: "System ownership is unclear",
      noOwner: "No clear system owner",
      migrationConcerns: "Upcoming migration has data concerns",
      migrationPoor: "Migration is active but data is not ready"
    },
    recommendation: {
      ready: "You appear ready to plan integration improvements. Start with a focused review of the highest-value workflows and API coverage.",
      partial:
        "You have a workable base, but manual work and ownership gaps should be cleaned up before scaling integrations.",
      risk: "Start with an integration readiness review. Clarify ownership, source of truth, and data quality before major automation work.",
      notReady:
        "Fix the foundation first: identify system owners, define the source of truth, reduce spreadsheet dependency, and clean critical data before integration projects."
    }
  },
  pt: {
    status: {
      ready: "Pronto para integração",
      partial: "Parcialmente pronto",
      risk: "Em risco",
      notReady: "Não está pronto"
    },
    pain: {
      manySystems: "Muitos sistemas precisam ser coordenados",
      tooManySystems: "Excesso de sistemas em uso",
      manualDaily: "Cópia manual de dados todos os dias",
      manualMultiple: "Cópia manual acontece várias vezes ao dia",
      spreadsheetMedium: "Processos importantes ainda dependem de planilhas",
      spreadsheetHeavy: "Dependência alta de planilhas",
      apiUnknown: "Não está claro se os sistemas têm APIs",
      apiNone: "Sistemas principais podem não ter APIs utilizáveis",
      sourceUnclear: "Não há fonte única de verdade clara",
      sourceNone: "As equipes não usam um sistema confiável como referência",
      dataInconsistent: "Problemas de dados podem bloquear automações",
      dataPoor: "Os dados precisam de limpeza antes de integrações sérias",
      reportingDifferent: "Equipes diferentes reportam números diferentes",
      reportingManual: "Relatórios dependem de trabalho manual",
      unreliable: "Integrações quebram com frequência",
      manualFixes: "Integrações exigem correções manuais",
      ownerUnclear: "Responsabilidade pelos sistemas não está clara",
      noOwner: "Não há responsável claro pelos sistemas",
      migrationConcerns: "Migração futura tem riscos de dados",
      migrationPoor: "A migração já está ativa, mas os dados não estão prontos"
    },
    recommendation: {
      ready: "Você parece pronto para planejar melhorias de integração. Comece revisando os fluxos de maior valor e a cobertura de APIs.",
      partial:
        "Existe uma boa base, mas trabalho manual e lacunas de responsabilidade devem ser resolvidos antes de escalar integrações.",
      risk: "Comece com uma revisão de prontidão para integração. Defina responsáveis, fonte de verdade e qualidade de dados antes de grandes automações.",
      notReady:
        "Arrume a base primeiro: defina responsáveis, fonte de verdade, reduza dependência de planilhas e limpe dados críticos antes de projetos de integração."
    }
  },
  es: {
    status: {
      ready: "Listo para integración",
      partial: "Parcialmente listo",
      risk: "En riesgo",
      notReady: "No está listo"
    },
    pain: {
      manySystems: "Muchos sistemas necesitan coordinación",
      tooManySystems: "Demasiados sistemas en uso",
      manualDaily: "Copia manual de datos todos los días",
      manualMultiple: "La copia manual ocurre varias veces por día",
      spreadsheetMedium: "Procesos importantes aún dependen de hojas de cálculo",
      spreadsheetHeavy: "Alta dependencia de hojas de cálculo",
      apiUnknown: "No está claro si los sistemas tienen APIs",
      apiNone: "Los sistemas principales podrían no tener APIs utilizables",
      sourceUnclear: "No hay una fuente única de verdad clara",
      sourceNone: "Los equipos no comparten un sistema confiable como referencia",
      dataInconsistent: "Problemas de datos pueden bloquear automatizaciones",
      dataPoor: "Los datos necesitan limpieza antes de integraciones serias",
      reportingDifferent: "Equipos diferentes reportan números diferentes",
      reportingManual: "Los reportes dependen de trabajo manual",
      unreliable: "Las integraciones fallan con frecuencia",
      manualFixes: "Las integraciones requieren correcciones manuales",
      ownerUnclear: "La responsabilidad de los sistemas no está clara",
      noOwner: "No hay responsable claro de los sistemas",
      migrationConcerns: "La próxima migración tiene riesgos de datos",
      migrationPoor: "La migración ya está activa, pero los datos no están listos"
    },
    recommendation: {
      ready: "Parece que estás listo para planear mejoras de integración. Empieza revisando los flujos de mayor valor y la cobertura de APIs.",
      partial:
        "Hay una base útil, pero el trabajo manual y las brechas de responsabilidad deben corregirse antes de escalar integraciones.",
      risk: "Empieza con una revisión de preparación para integración. Define responsables, fuente de verdad y calidad de datos antes de grandes automatizaciones.",
      notReady:
        "Arregla la base primero: define responsables, fuente de verdad, reduce dependencia de hojas de cálculo y limpia datos críticos antes de proyectos de integración."
    }
  }
};

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function normalizeLanguage(language) {
  return SUPPORTED_LANGUAGES.has(language) ? language : "en";
}

function getStatusKey(score) {
  return STATUS_THRESHOLDS.find((status) => score >= status.min).key;
}

function addPainPoint(painPoints, copy, key, weight) {
  painPoints.push({ key, label: copy.pain[key], weight });
}

function calculateAssessmentResult(answers) {
  const language = normalizeLanguage(answers.language);
  const copy = COPY[language];
  const painPoints = [];
  let score = 100;

  const categoryDeductions = {
    systemComplexity: 0,
    manualWork: 0,
    dataReadiness: 0,
    apiReadiness: 0,
    operationalRisk: 0
  };

  const systemsCount = answers.systemsCount;
  if (systemsCount === "8-12") {
    score -= 5;
    categoryDeductions.systemComplexity += 15;
    addPainPoint(painPoints, copy, "manySystems", 5);
  }
  if (systemsCount === "13+") {
    score -= 10;
    categoryDeductions.systemComplexity += 25;
    addPainPoint(painPoints, copy, "tooManySystems", 10);
  }

  if (Array.isArray(answers.systemTypes) && answers.systemTypes.length >= 5) {
    score -= 5;
    categoryDeductions.systemComplexity += 10;
  }

  if (answers.manualCopyFrequency === "daily") {
    score -= 20;
    categoryDeductions.manualWork += 35;
    categoryDeductions.operationalRisk += 12;
    addPainPoint(painPoints, copy, "manualDaily", 20);
  }
  if (answers.manualCopyFrequency === "multipleDaily") {
    score -= 25;
    categoryDeductions.manualWork += 45;
    categoryDeductions.operationalRisk += 18;
    addPainPoint(painPoints, copy, "manualMultiple", 25);
  }
  if (answers.manualCopyFrequency === "weekly") {
    score -= 8;
    categoryDeductions.manualWork += 15;
  }

  if (answers.spreadsheetDependency === "medium") {
    score -= 8;
    categoryDeductions.manualWork += 12;
    categoryDeductions.dataReadiness += 8;
    addPainPoint(painPoints, copy, "spreadsheetMedium", 8);
  }
  if (answers.spreadsheetDependency === "heavy") {
    score -= 15;
    categoryDeductions.manualWork += 25;
    categoryDeductions.dataReadiness += 15;
    addPainPoint(painPoints, copy, "spreadsheetHeavy", 15);
  }

  if (answers.apiAvailability === "some") {
    score -= 5;
    categoryDeductions.apiReadiness += 12;
  }
  if (answers.apiAvailability === "unknown") {
    score -= 10;
    categoryDeductions.apiReadiness += 25;
    addPainPoint(painPoints, copy, "apiUnknown", 10);
  }
  if (answers.apiAvailability === "none") {
    score -= 15;
    categoryDeductions.apiReadiness += 35;
    addPainPoint(painPoints, copy, "apiNone", 15);
  }

  if (answers.sourceOfTruth === "mostly") {
    score -= 5;
    categoryDeductions.dataReadiness += 10;
  }
  if (answers.sourceOfTruth === "unclear") {
    score -= 10;
    categoryDeductions.dataReadiness += 22;
    addPainPoint(painPoints, copy, "sourceUnclear", 10);
  }
  if (answers.sourceOfTruth === "none") {
    score -= 15;
    categoryDeductions.dataReadiness += 35;
    addPainPoint(painPoints, copy, "sourceNone", 15);
  }

  if (answers.dataQuality === "minor") {
    score -= 5;
    categoryDeductions.dataReadiness += 10;
  }
  if (answers.dataQuality === "inconsistent") {
    score -= 10;
    categoryDeductions.dataReadiness += 22;
    addPainPoint(painPoints, copy, "dataInconsistent", 10);
  }
  if (answers.dataQuality === "poor") {
    score -= 15;
    categoryDeductions.dataReadiness += 35;
    addPainPoint(painPoints, copy, "dataPoor", 15);
  }

  if (answers.reportingConsistency === "minorDifferences") {
    score -= 5;
    categoryDeductions.dataReadiness += 8;
  }
  if (answers.reportingConsistency === "differentTeams") {
    score -= 15;
    categoryDeductions.dataReadiness += 25;
    categoryDeductions.operationalRisk += 10;
    addPainPoint(painPoints, copy, "reportingDifferent", 15);
  }
  if (answers.reportingConsistency === "manualReports") {
    score -= 12;
    categoryDeductions.manualWork += 18;
    categoryDeductions.dataReadiness += 15;
    addPainPoint(painPoints, copy, "reportingManual", 12);
  }

  if (answers.integrationReliability === "occasional") {
    score -= 7;
    categoryDeductions.apiReadiness += 8;
    categoryDeductions.operationalRisk += 10;
  }
  if (answers.integrationReliability === "oftenBreak") {
    score -= 15;
    categoryDeductions.apiReadiness += 18;
    categoryDeductions.operationalRisk += 25;
    addPainPoint(painPoints, copy, "unreliable", 15);
  }
  if (answers.integrationReliability === "manualFixes") {
    score -= 18;
    categoryDeductions.manualWork += 15;
    categoryDeductions.operationalRisk += 30;
    addPainPoint(painPoints, copy, "manualFixes", 18);
  }

  if (answers.systemOwnership === "someOwners") {
    score -= 4;
    categoryDeductions.operationalRisk += 8;
  }
  if (answers.systemOwnership === "unclear") {
    score -= 8;
    categoryDeductions.operationalRisk += 18;
    addPainPoint(painPoints, copy, "ownerUnclear", 8);
  }
  if (answers.systemOwnership === "noOwner") {
    score -= 10;
    categoryDeductions.operationalRisk += 24;
    addPainPoint(painPoints, copy, "noOwner", 10);
  }

  if (answers.upcomingMigration === "plannedDataConcerns") {
    score -= 7;
    categoryDeductions.systemComplexity += 10;
    categoryDeductions.dataReadiness += 12;
    categoryDeductions.operationalRisk += 8;
    addPainPoint(painPoints, copy, "migrationConcerns", 7);
  }
  if (answers.upcomingMigration === "activePoorReadiness") {
    score -= 10;
    categoryDeductions.systemComplexity += 15;
    categoryDeductions.dataReadiness += 18;
    categoryDeductions.operationalRisk += 15;
    addPainPoint(painPoints, copy, "migrationPoor", 10);
  }

  const finalScore = clampScore(score);
  const statusKey = getStatusKey(finalScore);
  const sortedPainPoints = painPoints
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 5)
    .map((point) => point.label);

  return {
    score: finalScore,
    statusKey,
    status: copy.status[statusKey],
    categoryScores: {
      systemComplexity: clampScore(100 - categoryDeductions.systemComplexity),
      manualWork: clampScore(100 - categoryDeductions.manualWork),
      dataReadiness: clampScore(100 - categoryDeductions.dataReadiness),
      apiReadiness: clampScore(100 - categoryDeductions.apiReadiness),
      operationalRisk: clampScore(100 - categoryDeductions.operationalRisk)
    },
    painPoints: sortedPainPoints,
    recommendation: copy.recommendation[statusKey]
  };
}

module.exports = {
  calculateAssessmentResult,
  SUPPORTED_LANGUAGES
};
