import { LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user
    }
  };
};

export const loginError = name => {
  return {
    type: LOGIN_ERROR,
    payload: {
      name
    }
  };
};
