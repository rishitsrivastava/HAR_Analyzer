const missingContentTypeRule = (route) => {
  const headers = route.responseHeaders || {};
  const contentType = headers["content-type"] || headers["Content-Type"];
  if (!contentType) {
    return `Route (${route.url}) missing 'Content-Type' in response headers`;
  }
  return null;
}

module.exports = missingContentTypeRule;