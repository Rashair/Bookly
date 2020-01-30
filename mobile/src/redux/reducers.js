import {  LOGIN_SUCCESS, 
          LOGIN_ERROR, 
          ANY_ERROR, 
          SEARCH_BY_DATE, 
          SET_CARLY_TOKEN, 
          SET_FLATLY_TOKEN, 
          SET_PARKLY_TOKEN,
          SAVE_BEDS } from "./constants";

export const initialState = { auth: null, 
                              errorResponse: "", 
                              dates: { from: new Date(), to: new Date() }, 
                              people: null,
                              carlyToken: null,
                              flatlyToken: null,
                              parklyToken: null };

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
      // eslint-disable-next-line no-alert
      alert("Something went wrong...");
      return state;
    }

    case SAVE_BEDS: {
      const { beds } = action.payload;
      return { ...state, people: beds}
    }

    case SET_PARKLY_TOKEN: {
      const { token } = action.payload
      return { ...state, parklyToken: token }
    }

    case SET_CARLY_TOKEN: {
      const { token } = action.payload
      return { ...state, carlyToken: token }
    }

    case SET_FLATLY_TOKEN: {
      const { token } = action.payload
      return { ...state, flatlyToken: token}
    }

    default:
      return state;
  }
};

export default appReducer;