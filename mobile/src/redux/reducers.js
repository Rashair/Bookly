import { LOGIN_SUCCESS, LOGIN_ERROR, ANY_ERROR } from "./constants";

export const initialState = { auth: null, errorResponse: "" };

// Read this: https://redux.js.org/basics/reducers
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { userDetails } = action.payload;
      return { ...state, auth: userDetails };
    }

    case LOGIN_ERROR: {
      // eslint-disable-next-line no-alert
      alert(`Invalid login or password.`);
      return { ...state, auth: null };
    }

    case ANY_ERROR: {
      console.log(action.payload);
      // eslint-disable-next-line no-alert
      alert("Something went wrong...");
      return state;
    }

    default:
      return state;
  }
};

export default appReducer;
