const computeStats = (routes) => {
  const times = routes.map((r) => r.time).filter((t) => typeof t === "number");

  const mean = times.reduce((sum, t) => sum + t, 0) / (times.length || 1);

  const stddev = Math.sqrt(
    times.reduce((sum, t) => sum + Math.pow(t - mean, 2), 0) /
      (times.length || 1)
  );

  return { mean, stddev };
};

module.exports = computeStats;
