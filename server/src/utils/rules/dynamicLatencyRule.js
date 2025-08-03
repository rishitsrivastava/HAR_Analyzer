const dynamicLatencyRule = (route, stats) => {
  const { mean, stddev } = stats;

  if (route.time > mean + 2 * stddev) {
    return `Route ${route.url} has unusually high latency (${
      route.time
    }ms > avg ${Math.round(mean)}ms + ${Math.round(stddev)}ms std deviation)`;
  }

  return null;
};

module.exports = dynamicLatencyRule;
