import { LOGIN_SUCCESS, LOGIN_ERROR, ANY_ERROR, SEARCH_BY_DATE, SAVE_BEDS, SET_CARLY_TOKEN, SET_FLATLY_TOKEN, SET_PARKLY_TOKEN } from "./constants";

export const searchByDate = dates => {
  return {
    type: SEARCH_BY_DATE,
    payload: {
      dates,
    },
  };
};

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
  }
};

export const saveBeds = beds => {
  return{
    type: SAVE_BEDS,
    payload: {
      beds
    }
  }
}

export const setCarlyToken = token => {
  return{
    type: SET_CARLY_TOKEN,
    payload: {
      token
    }
  }
}

export const setParklyToken = token => {
  return{
    type: SET_PARKLY_TOKEN,
    payload: {
      token
    }
  }
}

export const setFlatlyToken = token => {
  return{
    type: SET_FLATLY_TOKEN,
    payload: {
      token
    }
  }
}

