const isValidRoute = (route) => {
  return (
    route &&
    typeof route.url === "string" &&
    typeof route.status === "number" &&
    typeof route.method === "string" &&
    typeof route.time === "number"
  );
}

module.exports = isValidRoute;