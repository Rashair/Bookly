/**
 *
 * @param {String} url
 * @param {String} method - POST/GET
 * @param {*} additionalHeaders - js key-value object
 * @param {*} body - js key value object
 * @param {Boolean} useCache
 */
export const sendRequest = (url, method, additionalHeaders = {}, body = {}, useCache = false) => {
  const requestData = {
    method,
    headers: { "Content-type": "application/json", ...additionalHeaders },
    mode: "cors",
    cache: useCache ? "only-if-cached" : "no-cache",
  };
  if (method !== "GET") {
    requestData.body = JSON.stringify(body);
  }

  const request = new Request(url, requestData);
  return fetch(request);
};

export const createQueryParams = object => {
  const params = new URLSearchParams();
  Object.entries(object).forEach(([key, value]) => params.append(key, value));
  return params;
};

/**
 *
 * @param {Date} date
 * @param {Date} time
 */
export const combineDateAndTime = (date, time) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds()
  );
};
