import { LOGIN, LOGOUT, USER_DETAILS } from "./types";
import { setBearer } from "../../API";

/**
 * Adds user details
 * @returns {Function}
 */
export const userLogin = user => dispatch => {
  setBearer(user.token);
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
  dispatch({
    type: LOGOUT,
    payload: false
  });
};
