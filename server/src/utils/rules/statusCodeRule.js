const statusCodeRule = (route) => {
  if (route.status >= 400)
    return `failed route(${route.url}) with status code: ${route.status}`;
  return null;
};

module.exports =  statusCodeRule;