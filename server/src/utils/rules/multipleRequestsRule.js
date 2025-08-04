const multipleRequestsRule = (route, context) => {
    const key = `${route.method} ${route.url}`;
    const count = context.routeCountMap[key] || 0;

    if (count > 3) {
        return `Route ${route.url} (${route.method}) was called ${count} times`;
    }

    return null;
};

module.exports = multipleRequestsRule;