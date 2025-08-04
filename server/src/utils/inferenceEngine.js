const statusCodeRule = require("./rules/statusCodeRule.js");
const latencyCheckRule = require("./rules/latencyCheckRule.js");
const missingContentTypeRule = require("./rules/missingContentTypeRule.js");
const largePayloadRule = require("./rules/largePayloadRule.js");
const invalidMethodRule = require("./rules/invalidMethodRule.js");
const isValidRoute = require("./rules/isValidRoute.js");
const dynamicLatencyRule = require("./rules/dynamicLatencyRule.js");
const computeStats = require("./rules/computeStats.js");
const multipleRequestsRule = require("./rules/multipleRequestsRule.js");

function applyRules(routes) {
  const flaggedRoutes = [];

  const stats = computeStats(routes);

  const routeCountMap = {};

  for (const route of routes) {
    const key = `${route.method} ${route.url}`;
    routeCountMap[key] = (routeCountMap[key] || 0) + 1;
  }

  const context = { stats, routeCountMap, allRoutes: routes };

  for (const route of routes) {
    if (!isValidRoute(route)) continue;

    const reasons = [];

    const statusReason = statusCodeRule(route);

    if (statusReason) reasons.push(statusReason);

    const latencyReason = latencyCheckRule(route);
    if (latencyReason) reasons.push(latencyReason);

    const missingContent = missingContentTypeRule(route);
    if (missingContent) reasons.push(missingContent);

    const dynamicLatency = dynamicLatencyRule(route, stats);
    if (dynamicLatency) reasons.push(dynamicLatency);

    const largePayload = largePayloadRule(route);
    if (largePayload) reasons.push(largePayload);

    const invalidMethod = invalidMethodRule(route);
    if (invalidMethod) reasons.push(invalidMethod);

    const multipleRequests = multipleRequestsRule(route, context);
    if (multipleRequests) reasons.push(multipleRequests);

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
