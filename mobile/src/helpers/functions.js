// eslint-disable-next-line import/prefer-default-export
export const sendRequest = (url, method, additionalHeaders, body, useCache = false) => {
  const request = new Request(url, {
    method,
    headers: { "Content-type": "application/json", ...additionalHeaders },
    mode: "cors",
    cache: useCache ? "only-if-cached" : "no-cache",
    body: JSON.stringify(body),
  });

  return fetch(request);
};
