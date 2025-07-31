const largePayloadRule = (route) => {
  if (route.responseSize && route.responseSize > 1000000)
    return `the route ${route.url} has high payload`;
  return null;
};

module.exports = largePayloadRule;