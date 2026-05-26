const DEPLOYMENT_LABELS = {
  cloudhub1: "CloudHub 1.0",
  cloudhub2: "CloudHub 2.0",
  runtimeFabric: "Runtime Fabric",
  hybrid: "Hybrid",
  unsure: "Unsure"
};

const COMMERCIAL_MODEL_LABELS = {
  vcore: "vCore/Core",
  flowMessage: "Flow/Message usage-based",
  unsure: "Unsure"
};

const RENEWAL_LABELS = {
  "0-3": "0-3 months",
  "3-6": "3-6 months",
  "6-12": "6-12 months",
  notSure: "Not sure"
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function riskLevel(score) {
  if (score >= 78) return "Critical";
  if (score >= 55) return "High";
  if (score >= 32) return "Medium";
  return "Low";
}

function severityFor(score) {
  if (score >= 78) return "critical";
  if (score >= 55) return "high";
  if (score >= 32) return "medium";
  return "low";
}

function calculateAssessment(input) {
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
      title: "Low utilization signal",
      severity: utilizationPct < 25 ? "critical" : "high",
      message: `Average utilization at ${utilizationPct}% suggests meaningful paid capacity may be idle or reserved for workloads that could be resized.`
    });
  } else if (utilizationPct < 70) {
    signals.push({
      title: "Moderate utilization signal",
      severity: "medium",
      message: `Average utilization at ${utilizationPct}% leaves room to review worker sizing, replica strategy, and environment allocations.`
    });
  } else {
    signals.push({
      title: "Healthy utilization signal",
      severity: "low",
      message: `Average utilization at ${utilizationPct}% suggests capacity is being used more actively, though deployment and renewal fit should still be reviewed.`
    });
  }

  if (appsPerProductionCore > 0 && appsPerProductionCore < 2 && productionCores >= 4) {
    signals.push({
      title: "Application density signal",
      severity: "high",
      message: `You are running about ${appsPerProductionCore.toFixed(1)} applications per production core/vCore, which may indicate over-allocation or consolidation opportunity.`
    });
  } else if (appsPerProductionCore >= 8) {
    signals.push({
      title: "Application density signal",
      severity: "medium",
      message: `You are running about ${appsPerProductionCore.toFixed(1)} applications per production core/vCore, so resilience and isolation should be checked before reducing capacity.`
    });
  } else {
    signals.push({
      title: "Application density signal",
      severity: "low",
      message: "Your app-to-capacity ratio does not show an obvious consolidation issue from this high-level input."
    });
  }

  if (sandboxRatio > 1.25) {
    signals.push({
      title: "Environment balance signal",
      severity: "high",
      message: "Sandbox/pre-production allocation is higher than production, which is a common place to find contract and capacity cleanup opportunities."
    });
  } else if (sandboxRatio > 0.75) {
    signals.push({
      title: "Environment balance signal",
      severity: "medium",
      message: "Sandbox/pre-production allocation is close to production capacity, so environment governance is worth reviewing before renewal."
    });
  } else {
    signals.push({
      title: "Environment balance signal",
      severity: "low",
      message: "Sandbox/pre-production allocation appears proportionate to production from this high-level view."
    });
  }

  if (input.commercialModel === "unsure") {
    signals.push({
      title: "Commercial model warning",
      severity: "high",
      message: "Your commercial model is unclear. That uncertainty is itself a renewal risk because MuleSoft customers may be on legacy core/vCore terms or newer flow/message packaging."
    });
  } else if (input.commercialModel === "vcore") {
    signals.push({
      title: "Commercial model warning",
      severity: "medium",
      message: "Legacy core/vCore terms can hide under-utilization. Compare deployed flows, messages, cores, and renewal options before changing capacity."
    });
  } else {
    signals.push({
      title: "Commercial model warning",
      severity: "medium",
      message: "Usage-based flow/message packaging still needs governance. Review whether deployed flows and message volumes match business value."
    });
  }

  const recommendations = [
    "Export current Anypoint usage by environment and business group before renewal discussions.",
    "Review worker sizes, replicas, and stopped/idle applications before buying additional capacity.",
    "Compare production and pre-production allocation against release cadence and support needs."
  ];

  if (input.commercialModel === "unsure" || input.renewalTimeline === "0-3" || input.renewalTimeline === "3-6") {
    recommendations.unshift("Run a focused renewal readiness review before your next Salesforce/MuleSoft commercial conversation.");
  }

  if (apiPerAppRatio > 5) {
    recommendations.push("Check API Manager and governance usage for API sprawl, duplicated policies, and unmanaged ownership.");
  }

  if (Array.isArray(input.addons) && input.addons.includes("mq")) {
    recommendations.push("Review MQ usage patterns separately from runtime capacity because messaging workloads often drive hidden operational cost.");
  }

  return {
    risk: {
      score,
      level: riskLevel(score),
      severity: severityFor(score)
    },
    waste: {
      estimatedPercent: estimatedWastePercent,
      message: `Directional waste estimate: ${estimatedWastePercent}% of allocated MuleSoft capacity may deserve review. This is not an official pricing estimate.`
    },
    footprint: {
      deploymentModel: DEPLOYMENT_LABELS[input.deploymentModel],
      commercialModel: COMMERCIAL_MODEL_LABELS[input.commercialModel],
      renewalTimeline: RENEWAL_LABELS[input.renewalTimeline],
      totalCores,
      appsPerProductionCore: Number(appsPerProductionCore.toFixed(1))
    },
    signals,
    recommendations,
    cta: {
      headline: "Book a MuleSoft optimization audit with VeriDataPro",
      message: "A short audit can validate capacity waste, renewal exposure, and architecture fit using your actual Anypoint data."
    },
    disclaimer: "This tool provides directional optimization signals, not official MuleSoft pricing."
  };
}

module.exports = {
  calculateAssessment,
  DEPLOYMENT_LABELS,
  COMMERCIAL_MODEL_LABELS,
  RENEWAL_LABELS
};
