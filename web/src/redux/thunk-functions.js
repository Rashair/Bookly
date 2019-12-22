import { loginSuccess, loginError } from "./actions";

// eslint-disable-next-line import/prefer-default-export
export const login = data => {
  return dispatch => {
    return fetch("http://localhost:8080/user/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then(data => data.json())
      .then(
        user => {
          if (user !== undefined) {
            dispatch(loginSuccess(user));
          } else {
            dispatch(loginError(data.login));
          }
        },
        () => {
          dispatch(loginError(data.login));
        }
      );
  };
};
