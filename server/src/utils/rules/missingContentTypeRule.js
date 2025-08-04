const missingContentTypeRule = (route) => {
  const contentType = route.response?.content?.mimeType;
  const bodyText = route.response?.content?.text;

  if (contentType?.includes("application/json") && typeof bodyText === "string") {
    try {
      JSON.parse(bodyText);
    } catch (error) {
      return `Route ${route.url} returned invalid JSON despite content-Type being application/json`;
    }
  }

  return null;
}

module.exports = missingContentTypeRule;