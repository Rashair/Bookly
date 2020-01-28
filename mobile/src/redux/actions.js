import {  LOGIN_SUCCESS, 
          LOGIN_ERROR, 
          ANY_ERROR, 
          SEARCH_BY_DATE } from "./constants";

export const loginSuccess = userDetails => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      userDetails,
    },
  };
};

export const loginError = name => {
  return {
    type: LOGIN_ERROR,
    payload: {
      name,
    },
  };
};

export const anyError = error => {
  return {
    type: ANY_ERROR,
    payload: {
      error,
    },
  };
};

export const searchByDate = dates => {
  return {
    type: SEARCH_BY_DATE,
    payload: {
      dates,
    },
  };
};

