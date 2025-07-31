const invalidMethodRule = (route) => {
  if (!route.method) return null;

  const allowedMethod = ["GET", "POST", "PUT", "PATCH", "DELETE"];
  if (!allowedMethod.includes(route.method))
    return `the route ${route.url} has wrong method`;
  return null;
};

module.exports = invalidMethodRule;