import axios from "axios";

const baseURL = process.env.BASE_API;

/**
 * Sets the authorization header
 * @param token
 */
export const setBearer = token => {
  if (!token) return;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

/**
 * Fetches giveaways based on pageId and filter.
 * @param {number} pageId
 * @param {string} type
 * @param {object} filter
 * @returns {Promise<any>}
 */
export const fetchGiveawayPage = (pageId, type, filter = {}) =>
  axios.post(
    `${baseURL}/giveaway${type === "/" ? type : type + "/"}${pageId}`,
    filter
  );

/**
 * Register form data
 * @param {object} REGISTER_DATA
 * @returns {Promise<any>}
 */
export const register = REGISTER_DATA =>
  axios.post(`${baseURL}/auth/register`, REGISTER_DATA);

/**
 * Login form data
 * @param {object} LOGIN_DATA
 * @returns {Promise<any>}
 */
export const login = LOGIN_DATA =>
  axios.post(`${baseURL}/auth/login`, LOGIN_DATA);

/**
 * Forgot password form data
 * @param {object} FORGOT_DATA
 * @returns {Promise<any>}
 */
export const forgotPassword = FORGOT_DATA =>
  axios.post(`${baseURL}/auth/forgot`, FORGOT_DATA);

/**
 * Checks if token is valid
 * @param {object} token
 * @returns {Promise<any>}
 */
export const validateAccount = token =>
  axios.post(`${baseURL}/auth/validate`, token);

/**
 * Confirms account based on key
 * @param {string} CONFIRM_KEY
 * @returns {Promise<any>}
 */
export const confirmAccount = CONFIRM_KEY =>
  axios.post(`${baseURL}/auth/confirm`, CONFIRM_KEY);

/**
 * Reset password form data ( key from email)
 * @param RESET_DATA
 * @returns {AxiosPromise<any>}
 */
export const resetPassword = RESET_DATA =>
  axios.post(`${baseURL}/auth/reset`, RESET_DATA);

/**
 * Resend email to confirm account
 * @param RESET_DATA
 * @returns {AxiosPromise<any>}
 */
export const resendEmail = RESET_DATA =>
  axios.post(`${baseURL}/auth/reset`, RESET_DATA);

/**
 * Saves entered giveaway
 * @param {String} giveaway
 * @returns {AxiosPromise<any>}
 */
export const enterGiveaway = giveaway =>
  axios.post(`${baseURL}/giveaway/enter`, { giveaway });

/**
 * Saves giveaway
 * @param {String} giveaway
 * @returns {AxiosPromise<any>}
 */
export const saveGiveaway = giveaway =>
  axios.post(`${baseURL}/giveaway/save`, { giveaway });
