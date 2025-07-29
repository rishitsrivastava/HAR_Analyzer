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

function applyRules(routes) {
  const flaggedRoutes = [];

  for (const route of routes) {
    const reasons = [];

    const statusReason = statusCodeRule(route);
    if (statusReason) reasons.push(statusReason);

    console.log(statusReason);

    const latencyReason = latencyCheckRule(route);
    if (latencyReason) reasons.push(latencyReason);

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
