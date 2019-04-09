import { LOGIN, LOGOUT, USER_DETAILS } from "./types";

/**
 * Adds user details
 * @returns {Function}
 */
export const userLogin = user => dispatch => {
  dispatch({
    type: LOGIN,
    payload: true
  });
  dispatch({
    type: USER_DETAILS,
    payload: user.userDetails
  });
};
/**
 * Deletes user details
 * @returns {Function}
 */
export const userLogout = () => dispatch => {
  document.cookie = "giveawayToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  dispatch({
    type: LOGOUT,
    payload: false
  });
};
