const dynamicLatencyRule = (routes) => {
  const flagged = [];

  const times = routes.map((r) => r.time);
  const avg = times.reduce((acc, r) => acc + r, 0) / times.length;

  const stdDev = Math.sqrt(
    times.reduce((sum, t) => sum + Math.pow(t - avg, 2), 0) / times.length
  );

  for (const route of routes) {
    if (route.time > avg + 2 * stdDev) {
      flagged.push({
        ...route,
        reasons: [
          `Route ${route.url} has unusually high latency (${
            route.time
          }ms > avg ${Math.round(avg)}ms + ${Math.round(
            stdDev
          )}ms std deviation)`,
        ],
      });
    }
  }

  return flagged;
};

module.exports = dynamicLatencyRule;