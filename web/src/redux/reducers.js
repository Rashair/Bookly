import { LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";

export const initialState = { auth: null };

// Read this: https://redux.js.org/basics/reducers

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { user } = action.payload;
      return { ...state, auth: user };
    }

    case LOGIN_ERROR: {
      // eslint-disable-next-line no-alert
      alert(`Invalid login or password.`);
      return { ...state, auth: null };
    }

    default:
      return state;
  }
};

export default appReducer;
