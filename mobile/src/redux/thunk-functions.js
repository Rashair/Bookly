import * as HttpStatus from "http-status-codes";
import { loginSuccess, loginError, anyError } from "./actions";
import { sendRequest } from "../helpers/functions";
import { API_URL, LOGIN_HEADER_KEY, PASSWORD_HEADER_KEY } from "../helpers/constants";

// eslint-disable-next-line import/prefer-default-export
export const login = data => {
  return dispatch => {
    return sendRequest(`${API_URL}/login`, "POST", {
      [LOGIN_HEADER_KEY]: data.login,
      [PASSWORD_HEADER_KEY]: data.password,
    }).then(response => {
      if (response.ok) {
        response.json().then(json => dispatch(loginSuccess(json)));
      } else if (response.status === HttpStatus.UNAUTHORIZED) {
        dispatch(loginError(data.login));
      } else {
        dispatch(anyError(`Error logging, status code: ${response.statusCode}`));
      }
    });
  };
};
