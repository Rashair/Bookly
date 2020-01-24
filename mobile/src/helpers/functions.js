// eslint-disable-next-line import/prefer-default-export
export const sendRequest = (url, method, additionalHeaders, body) => {
  const request = new Request(url, {
    method,
    headers: { "Content-type": "application/json", ...additionalHeaders },
    mode: "cors",
    cache: "no-cache",
  });
  if (method !== "GET") {
    request.body = JSON.stringify(body);
  }

  return fetch(request);
};
