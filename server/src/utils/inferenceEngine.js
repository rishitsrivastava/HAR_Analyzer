const statusCodeRule = require("./rules/statusCodeRule.js");
const latencyCheckRule = require("./rules/latencyCheckRule.js");
const missingContentTypeRule = require("./rules/missingContentTypeRule.js");
const largePayloadRule = require("./rules/largePayloadRule.js");
const invalidMethodRule = require("./rules/invalidMethodRule.js");
const isValidRoute = require("./rules/isValidRoute.js");
const dynamicLatencyRule = require("./rules/dynamicLatencyRule.js");
const computeStats = require("./rules/computeStats.js");

function applyRules(routes) {
  const flaggedRoutes = [];

  const stats = computeStats(routes);
  
  for (const route of routes) {
    if (!isValidRoute(route)) continue;

    const reasons = [];

    const statusReason = statusCodeRule(route);
    
    if (statusReason) reasons.push(statusReason);

    console.log("status rule working");

    const latencyReason = latencyCheckRule(route);
    if (latencyReason) reasons.push(latencyReason);

    const missingContent = missingContentTypeRule(route);
    if (missingContent) reasons.push(missingContent);

    const dynamicLatency = dynamicLatencyRule(route, allRoutesStats);
    if (dynamicLatency) reasons.push(dynamicLatency);

    const largePayload = largePayloadRule(route);
    if (largePayload) reasons.push(largePayload);

    const invalidMethod = invalidMethodRule(route);
    if (invalidMethod) reasons.push(invalidMethod);

    if (reasons.length > 0) {
      flaggedRoutes.push({
        ...route,
        reasons, // explanation of why it was flagged
      });
    }
  }

  return flaggedRoutes;
}

module.exports = { applyRules };
