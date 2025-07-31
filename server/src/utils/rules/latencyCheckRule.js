const latencyCheckRule = (route) => {
  if (route.time >= 3000)
    return `failed route(${route.url}) with response time ${route.time}`;
  return null;
};

module.exports = latencyCheckRule;