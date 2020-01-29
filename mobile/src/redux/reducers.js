import { LOGIN_SUCCESS, LOGIN_ERROR, ANY_ERROR, SEARCH_BY_DATE } from "./constants";

export const initialState = { auth: null, errorResponse: "", dates: { from: new Date(), to: new Date() } };

// Read this: https://redux.js.org/basics/reducers
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_BY_DATE: {
      const { dates } = action.payload;
      return { ...state, dates };
    }

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
      // eslint-disable-next-line no-console
      console.log(action.payload.error);
      // eslint-disable-next-line no-alert
      alert("Something went wrong...");
      return state;
    }

    default:
      return state;
  }
};

export default appReducer;