const statusCodeRule = (route) => {
  if (route.status >= 400)
    return `failed route(${route.url}) with status code: ${route.status}`;
  return null;
};

const latencyCheckRule = (route) => {
  if (route.time >= 3000)
    return `failed route(${route.url}) with response time ${route.time}`;
  return null;
};

const missingContentTypeRule = (route) => {
  const headers = route.responseHeaders;
  if (!headers || typeof headers !== "object") return null;

  const contentType = route.responseHeaders?.["content-type"];
  if (!contentType || contentType.trim() === "")
    return `the route ${route.url} is missing headers`;
  return null;
};

const largePayloadRule = (route) => {
  if (route.responseSize && route.responseSize > 1000000)
    return `the route ${route.url} has high payload`;
  return null;
};

const invalidMethodRule = (route) => {
  if (!route.method) return null;

  const allowedMethod = ["GET", "POST", "PUT", "PATCH", "DELETE"];
  if (!allowedMethod.includes(route.method))
    return `the route ${route.url} has wrong method`;
  return null;
};

function isValidRoute(route) {
  return route && route.url && typeof route.status === "number";
}

function applyRules(routes) {
  const flaggedRoutes = [];

  for (const route of routes) {
    if (!isValidRoute(route)) continue;

    const reasons = [];

    const statusReason = statusCodeRule(route);
    if (statusReason) reasons.push(statusReason);

    const latencyReason = latencyCheckRule(route);
    if (latencyReason) reasons.push(latencyReason);

    const missingContent = missingContentTypeRule(route);
    if (missingContent) reasons.push(missingContent);

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
