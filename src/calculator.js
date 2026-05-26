const SUPPORTED_LANGUAGES = new Set(["en", "pt", "es"]);

const DEPLOYMENT_LABEL_SETS = {
  en: {
    cloudhub1: "CloudHub 1.0",
    cloudhub2: "CloudHub 2.0",
    runtimeFabric: "Runtime Fabric",
    hybrid: "Hybrid",
    unsure: "Unsure"
  },
  pt: {
    cloudhub1: "CloudHub 1.0",
    cloudhub2: "CloudHub 2.0",
    runtimeFabric: "Runtime Fabric",
    hybrid: "Híbrido",
    unsure: "Não sei"
  },
  es: {
    cloudhub1: "CloudHub 1.0",
    cloudhub2: "CloudHub 2.0",
    runtimeFabric: "Runtime Fabric",
    hybrid: "Híbrido",
    unsure: "No sé"
  }
};

const COMMERCIAL_MODEL_LABEL_SETS = {
  en: {
    vcore: "vCore/Core",
    flowMessage: "Flow/Message usage-based",
    unsure: "Unsure"
  },
  pt: {
    vcore: "vCore/Core",
    flowMessage: "Uso por Flow/Message",
    unsure: "Não sei"
  },
  es: {
    vcore: "vCore/Core",
    flowMessage: "Uso por Flow/Message",
    unsure: "No sé"
  }
};

const RENEWAL_LABEL_SETS = {
  en: {
    "0-3": "0-3 months",
    "3-6": "3-6 months",
    "6-12": "6-12 months",
    notSure: "Not sure"
  },
  pt: {
    "0-3": "0-3 meses",
    "3-6": "3-6 meses",
    "6-12": "6-12 meses",
    notSure: "Não sei"
  },
  es: {
    "0-3": "0-3 meses",
    "3-6": "3-6 meses",
    "6-12": "6-12 meses",
    notSure: "No sé"
  }
};

const DEPLOYMENT_LABELS = DEPLOYMENT_LABEL_SETS.en;
const COMMERCIAL_MODEL_LABELS = COMMERCIAL_MODEL_LABEL_SETS.en;
const RENEWAL_LABELS = RENEWAL_LABEL_SETS.en;

const COPY = {
  en: {
    riskLevels: {
      critical: "Critical",
      high: "High",
      medium: "Medium",
      low: "Low"
    },
    lowUtilizationTitle: "Low utilization signal",
    lowUtilizationMessage: (pct) =>
      `Average utilization at ${pct}% suggests meaningful paid capacity may be idle or reserved for workloads that could be resized.`,
    moderateUtilizationTitle: "Moderate utilization signal",
    moderateUtilizationMessage: (pct) =>
      `Average utilization at ${pct}% leaves room to review worker sizing, replica strategy, and environment allocations.`,
    healthyUtilizationTitle: "Healthy utilization signal",
    healthyUtilizationMessage: (pct) =>
      `Average utilization at ${pct}% suggests capacity is being used more actively, though deployment and renewal fit should still be reviewed.`,
    appDensityTitle: "Application density signal",
    appDensityLowMessage: (ratio) =>
      `You are running about ${ratio} applications per production core/vCore, which may indicate over-allocation or consolidation opportunity.`,
    appDensityHighMessage: (ratio) =>
      `You are running about ${ratio} applications per production core/vCore, so resilience and isolation should be checked before reducing capacity.`,
    appDensityHealthyMessage:
      "Your app-to-capacity ratio does not show an obvious consolidation issue from this high-level input.",
    envBalanceTitle: "Environment balance signal",
    envBalanceHighMessage:
      "Sandbox/pre-production allocation is higher than production, which is a common place to find contract and capacity cleanup opportunities.",
    envBalanceMediumMessage:
      "Sandbox/pre-production allocation is close to production capacity, so environment governance is worth reviewing before renewal.",
    envBalanceLowMessage: "Sandbox/pre-production allocation appears proportionate to production from this high-level view.",
    commercialWarningTitle: "Commercial model warning",
    commercialUnsureMessage:
      "Your commercial model is unclear. That uncertainty is itself a renewal risk because MuleSoft customers may be on legacy core/vCore terms or newer flow/message packaging.",
    commercialVcoreMessage:
      "Legacy core/vCore terms can hide under-utilization. Compare deployed flows, messages, cores, and renewal options before changing capacity.",
    commercialFlowMessage:
      "Usage-based flow/message packaging still needs governance. Review whether deployed flows and message volumes match business value.",
    recommendations: [
      "Export current Anypoint usage by environment and business group before renewal discussions.",
      "Review worker sizes, replicas, and stopped/idle applications before buying additional capacity.",
      "Compare production and pre-production allocation against release cadence and support needs."
    ],
    renewalRecommendation: "Run a focused renewal readiness review before your next Salesforce/MuleSoft commercial conversation.",
    apiRecommendation: "Check API Manager and governance usage for API sprawl, duplicated policies, and unmanaged ownership.",
    mqRecommendation:
      "Review MQ usage patterns separately from runtime capacity because messaging workloads often drive hidden operational cost.",
    wasteMessage: (pct) =>
      `Directional waste estimate: ${pct}% of allocated MuleSoft capacity may deserve review. This is not an official pricing estimate.`,
    ctaHeadline: "Book a MuleSoft optimization audit with VeriDataPro",
    ctaMessage:
      "A short audit can validate capacity waste, renewal exposure, and architecture fit using your actual Anypoint data.",
    disclaimer: "This tool provides directional optimization signals, not official MuleSoft pricing."
  },
  pt: {
    riskLevels: {
      critical: "Crítico",
      high: "Alto",
      medium: "Médio",
      low: "Baixo"
    },
    lowUtilizationTitle: "Sinal de baixa utilização",
    lowUtilizationMessage: (pct) =>
      `A utilização média de ${pct}% sugere que uma parte relevante da capacidade paga pode estar ociosa ou reservada para workloads que poderiam ser redimensionados.`,
    moderateUtilizationTitle: "Sinal de utilização moderada",
    moderateUtilizationMessage: (pct) =>
      `A utilização média de ${pct}% ainda deixa espaço para revisar tamanho de workers, réplicas e alocação por ambiente.`,
    healthyUtilizationTitle: "Sinal de utilização saudável",
    healthyUtilizationMessage: (pct) =>
      `A utilização média de ${pct}% sugere que a capacidade está sendo usada de forma mais ativa, mas o fit de implantação e renovação ainda deve ser revisado.`,
    appDensityTitle: "Sinal de densidade de aplicações",
    appDensityLowMessage: (ratio) =>
      `Você executa cerca de ${ratio} aplicações por core/vCore de produção, o que pode indicar sobrealocação ou oportunidade de consolidação.`,
    appDensityHighMessage: (ratio) =>
      `Você executa cerca de ${ratio} aplicações por core/vCore de produção; por isso, resiliência e isolamento devem ser avaliados antes de reduzir capacidade.`,
    appDensityHealthyMessage:
      "A relação entre aplicações e capacidade não mostra um problema óbvio de consolidação nesta visão de alto nível.",
    envBalanceTitle: "Sinal de equilíbrio entre ambientes",
    envBalanceHighMessage:
      "A alocação de sandbox/pré-produção está acima da produção, um ponto comum para encontrar oportunidades de limpeza contratual e de capacidade.",
    envBalanceMediumMessage:
      "A alocação de sandbox/pré-produção está próxima da capacidade de produção, então vale revisar a governança de ambientes antes da renovação.",
    envBalanceLowMessage: "A alocação de sandbox/pré-produção parece proporcional à produção nesta visão de alto nível.",
    commercialWarningTitle: "Alerta de modelo comercial",
    commercialUnsureMessage:
      "Seu modelo comercial não está claro. Essa incerteza já é um risco de renovação, pois clientes MuleSoft podem estar em termos legados core/vCore ou em pacotes mais novos por flow/message.",
    commercialVcoreMessage:
      "Termos legados core/vCore podem esconder subutilização. Compare flows, messages, cores e opções de renovação antes de alterar capacidade.",
    commercialFlowMessage:
      "Pacotes por flow/message também exigem governança. Revise se flows implantados e volumes de mensagens acompanham valor de negócio.",
    recommendations: [
      "Exporte o uso atual do Anypoint por ambiente e business group antes das conversas de renovação.",
      "Revise tamanhos de workers, réplicas e aplicações paradas/ociosas antes de comprar capacidade adicional.",
      "Compare a alocação de produção e pré-produção com a cadência de releases e necessidades de suporte."
    ],
    renewalRecommendation: "Faça uma revisão focada de prontidão para renovação antes da próxima conversa comercial Salesforce/MuleSoft.",
    apiRecommendation: "Revise API Manager e governança para identificar excesso de APIs, políticas duplicadas e ownership indefinido.",
    mqRecommendation:
      "Revise o uso de MQ separadamente da capacidade de runtime, porque workloads de mensageria costumam gerar custo operacional oculto.",
    wasteMessage: (pct) =>
      `Estimativa direcional de desperdício: ${pct}% da capacidade MuleSoft alocada pode merecer revisão. Isto não é uma estimativa oficial de preço.`,
    ctaHeadline: "Agende uma auditoria de otimização MuleSoft com a VeriDataPro",
    ctaMessage:
      "Uma auditoria curta pode validar desperdício de capacidade, exposição na renovação e fit de arquitetura usando seus dados reais do Anypoint.",
    disclaimer: "Esta ferramenta fornece sinais direcionais de otimização, não preços oficiais do MuleSoft."
  },
  es: {
    riskLevels: {
      critical: "Crítico",
      high: "Alto",
      medium: "Medio",
      low: "Bajo"
    },
    lowUtilizationTitle: "Señal de baja utilización",
    lowUtilizationMessage: (pct) =>
      `La utilización promedio de ${pct}% sugiere que una parte relevante de la capacidad pagada podría estar ociosa o reservada para cargas que podrían redimensionarse.`,
    moderateUtilizationTitle: "Señal de utilización moderada",
    moderateUtilizationMessage: (pct) =>
      `La utilización promedio de ${pct}% deja espacio para revisar tamaño de workers, réplicas y asignación por ambiente.`,
    healthyUtilizationTitle: "Señal de utilización saludable",
    healthyUtilizationMessage: (pct) =>
      `La utilización promedio de ${pct}% sugiere que la capacidad se usa de forma más activa, aunque el fit de despliegue y renovación aún debe revisarse.`,
    appDensityTitle: "Señal de densidad de aplicaciones",
    appDensityLowMessage: (ratio) =>
      `Estás ejecutando cerca de ${ratio} aplicaciones por core/vCore de producción, lo que puede indicar sobreasignación u oportunidad de consolidación.`,
    appDensityHighMessage: (ratio) =>
      `Estás ejecutando cerca de ${ratio} aplicaciones por core/vCore de producción; por eso, resiliencia y aislamiento deben revisarse antes de reducir capacidad.`,
    appDensityHealthyMessage:
      "La relación entre aplicaciones y capacidad no muestra un problema obvio de consolidación en esta vista de alto nivel.",
    envBalanceTitle: "Señal de balance entre ambientes",
    envBalanceHighMessage:
      "La asignación de sandbox/pre-producción es mayor que producción, un lugar común para encontrar oportunidades de limpieza contractual y de capacidad.",
    envBalanceMediumMessage:
      "La asignación de sandbox/pre-producción está cerca de la capacidad de producción, así que conviene revisar la gobernanza de ambientes antes de renovar.",
    envBalanceLowMessage: "La asignación de sandbox/pre-producción parece proporcional a producción en esta vista de alto nivel.",
    commercialWarningTitle: "Alerta de modelo comercial",
    commercialUnsureMessage:
      "Tu modelo comercial no está claro. Esa incertidumbre ya es un riesgo de renovación porque clientes MuleSoft pueden estar en términos heredados core/vCore o en paquetes más nuevos por flow/message.",
    commercialVcoreMessage:
      "Los términos heredados core/vCore pueden esconder subutilización. Compara flows, messages, cores y opciones de renovación antes de cambiar capacidad.",
    commercialFlowMessage:
      "Los paquetes por flow/message también necesitan gobernanza. Revisa si los flows desplegados y los volúmenes de mensajes se alinean con el valor de negocio.",
    recommendations: [
      "Exporta el uso actual de Anypoint por ambiente y business group antes de conversaciones de renovación.",
      "Revisa tamaños de workers, réplicas y aplicaciones detenidas/ociosas antes de comprar capacidad adicional.",
      "Compara la asignación de producción y pre-producción con la cadencia de releases y necesidades de soporte."
    ],
    renewalRecommendation: "Ejecuta una revisión enfocada de preparación para renovación antes de tu próxima conversación comercial Salesforce/MuleSoft.",
    apiRecommendation: "Revisa API Manager y gobernanza para identificar exceso de APIs, políticas duplicadas y ownership indefinido.",
    mqRecommendation:
      "Revisa el uso de MQ por separado de la capacidad de runtime, porque las cargas de mensajería suelen generar costo operativo oculto.",
    wasteMessage: (pct) =>
      `Estimación direccional de desperdicio: ${pct}% de la capacidad MuleSoft asignada podría merecer revisión. Esto no es una estimación oficial de precio.`,
    ctaHeadline: "Agenda una auditoría de optimización MuleSoft con VeriDataPro",
    ctaMessage:
      "Una auditoría corta puede validar desperdicio de capacidad, exposición de renovación y fit de arquitectura usando tus datos reales de Anypoint.",
    disclaimer: "Esta herramienta entrega señales direccionales de optimización, no precios oficiales de MuleSoft."
  }
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeLanguage(language) {
  return SUPPORTED_LANGUAGES.has(language) ? language : "en";
}

function riskKey(score) {
  if (score >= 78) return "critical";
  if (score >= 55) return "high";
  if (score >= 32) return "medium";
  return "low";
}

function riskLevel(score, language = "en") {
  return COPY[normalizeLanguage(language)].riskLevels[riskKey(score)];
}

function severityFor(score) {
  return riskKey(score);
}

function calculateAssessment(input) {
  const language = normalizeLanguage(input.language);
  const copy = COPY[language];
  const deploymentLabels = DEPLOYMENT_LABEL_SETS[language];
  const commercialModelLabels = COMMERCIAL_MODEL_LABEL_SETS[language];
  const renewalLabels = RENEWAL_LABEL_SETS[language];
  const productionCores = Number(input.productionCores);
  const sandboxCores = Number(input.sandboxCores);
  const runningApplications = Number(input.runningApplications);
  const utilizationPct = Number(input.utilizationPct);
  const managedApis = Number(input.managedApis);
  const totalCores = productionCores + sandboxCores;
  const utilizationWaste = clamp(100 - utilizationPct, 0, 100);
  const sandboxRatio = productionCores > 0 ? sandboxCores / productionCores : sandboxCores > 0 ? 2 : 0;
  const appsPerProductionCore = productionCores > 0 ? runningApplications / productionCores : 0;
  const apiPerAppRatio = runningApplications > 0 ? managedApis / runningApplications : managedApis;

  let score = 0;
  score += utilizationPct < 25 ? 38 : utilizationPct < 45 ? 28 : utilizationPct < 65 ? 14 : 4;
  score += sandboxRatio > 1.25 ? 16 : sandboxRatio > 0.75 ? 9 : 0;
  score += appsPerProductionCore < 2 && productionCores >= 4 ? 14 : appsPerProductionCore < 4 && productionCores >= 8 ? 8 : 0;
  score += input.commercialModel === "unsure" ? 16 : input.commercialModel === "vcore" ? 8 : 4;
  score += input.deploymentModel === "unsure" ? 7 : input.deploymentModel === "hybrid" ? 5 : 2;
  score += input.renewalTimeline === "0-3" ? 14 : input.renewalTimeline === "3-6" ? 9 : input.renewalTimeline === "notSure" ? 5 : 2;
  score += managedApis > 80 ? 7 : managedApis > 30 ? 4 : 0;
  score += Array.isArray(input.addons) && input.addons.length >= 4 ? 5 : 0;
  score = clamp(Math.round(score), 0, 100);

  const estimatedWastePercent = clamp(
    Math.round(utilizationWaste * 0.75 + (sandboxRatio > 1 ? 10 : 0) + (appsPerProductionCore < 2 && productionCores >= 4 ? 8 : 0)),
    0,
    90
  );

  const signals = [];

  if (utilizationPct < 45) {
    signals.push({
      title: copy.lowUtilizationTitle,
      severity: utilizationPct < 25 ? "critical" : "high",
      message: copy.lowUtilizationMessage(utilizationPct)
    });
  } else if (utilizationPct < 70) {
    signals.push({
      title: copy.moderateUtilizationTitle,
      severity: "medium",
      message: copy.moderateUtilizationMessage(utilizationPct)
    });
  } else {
    signals.push({
      title: copy.healthyUtilizationTitle,
      severity: "low",
      message: copy.healthyUtilizationMessage(utilizationPct)
    });
  }

  if (appsPerProductionCore > 0 && appsPerProductionCore < 2 && productionCores >= 4) {
    signals.push({
      title: copy.appDensityTitle,
      severity: "high",
      message: copy.appDensityLowMessage(appsPerProductionCore.toFixed(1))
    });
  } else if (appsPerProductionCore >= 8) {
    signals.push({
      title: copy.appDensityTitle,
      severity: "medium",
      message: copy.appDensityHighMessage(appsPerProductionCore.toFixed(1))
    });
  } else {
    signals.push({
      title: copy.appDensityTitle,
      severity: "low",
      message: copy.appDensityHealthyMessage
    });
  }

  if (sandboxRatio > 1.25) {
    signals.push({
      title: copy.envBalanceTitle,
      severity: "high",
      message: copy.envBalanceHighMessage
    });
  } else if (sandboxRatio > 0.75) {
    signals.push({
      title: copy.envBalanceTitle,
      severity: "medium",
      message: copy.envBalanceMediumMessage
    });
  } else {
    signals.push({
      title: copy.envBalanceTitle,
      severity: "low",
      message: copy.envBalanceLowMessage
    });
  }

  if (input.commercialModel === "unsure") {
    signals.push({
      title: copy.commercialWarningTitle,
      severity: "high",
      message: copy.commercialUnsureMessage
    });
  } else if (input.commercialModel === "vcore") {
    signals.push({
      title: copy.commercialWarningTitle,
      severity: "medium",
      message: copy.commercialVcoreMessage
    });
  } else {
    signals.push({
      title: copy.commercialWarningTitle,
      severity: "medium",
      message: copy.commercialFlowMessage
    });
  }

  const recommendations = [...copy.recommendations];

  if (input.commercialModel === "unsure" || input.renewalTimeline === "0-3" || input.renewalTimeline === "3-6") {
    recommendations.unshift(copy.renewalRecommendation);
  }

  if (apiPerAppRatio > 5) {
    recommendations.push(copy.apiRecommendation);
  }

  if (Array.isArray(input.addons) && input.addons.includes("mq")) {
    recommendations.push(copy.mqRecommendation);
  }

  return {
    language,
    risk: {
      score,
      level: riskLevel(score, language),
      severity: severityFor(score)
    },
    waste: {
      estimatedPercent: estimatedWastePercent,
      message: copy.wasteMessage(estimatedWastePercent)
    },
    footprint: {
      deploymentModel: deploymentLabels[input.deploymentModel],
      commercialModel: commercialModelLabels[input.commercialModel],
      renewalTimeline: renewalLabels[input.renewalTimeline],
      totalCores,
      appsPerProductionCore: Number(appsPerProductionCore.toFixed(1))
    },
    signals,
    recommendations,
    cta: {
      headline: copy.ctaHeadline,
      message: copy.ctaMessage
    },
    disclaimer: copy.disclaimer
  };
}

module.exports = {
  calculateAssessment,
  DEPLOYMENT_LABELS,
  COMMERCIAL_MODEL_LABELS,
  RENEWAL_LABELS,
  SUPPORTED_LANGUAGES
};
