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

// //Reservation in Bookly service
// export const makeBooklyReservation = (data, auth) => {
//   const url = `${BOOKLY_API_URL}/`;
//   return sendRequest(url, "POST", {
//     [TOKEN_HEADER_KEY]: auth.securityToken,
//     [ID_TOKEN_HEADER_KEY]: auth.identificationToken,
//     },{
//     owner: auth.identificationToken,
//     startDateTime: data.startDate,
//     endDateTime: data.endDate,
//     active: true,
//     type: data.type,
//     externalId: data.offerId
//     })
//     .then(
//       response => {
//         if(!response.ok){
//           dispatch(anyError(response.status))
//         }
//       },
//       error => dispatch(anyError(error))
//     );
// }

// export const makeFlatlyReservation = (data, auth) => {
//   data = {...data, type: Types.FLATLY};
//   return dispatch => {
//     const url = `${FLATLY_API_URL}/reservations/`;
//     return sendRequest(url, "POST", {
//       [TOKEN_HEADER_KEY]: auth.securityToken,
//       [ID_TOKEN_HEADER_KEY]: auth.identificationToken,
//       },{
//       startDate: data.startDate,
//       endDate: data.endDate,
//       offerId: data.offerId,
//       people: data.people,
//       name: auth.firstName,
//       lastName: auth.lastName,
//       email: data.email
//     }).then(
//       response =>{
//         if(response.ok){
//           dispatch(makeBooklyReservation(data,auth));
//         }
//         else{
//           //handle wrong response status
//         }
//       },
//       error => dispatch(anyError(error))
//     );
//   }
// }
