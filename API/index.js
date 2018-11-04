import axios from "axios";

const baseURL = "https://forrestwalker.me/api";
/**
 * Fetches giveaways based on pageId and filter.
 * @param {number} pageId
 * @param {object} filter
 * @returns {Promise<any>}
 */
export const fetchGiveawayPage = (pageId, filter) =>
  axios.post(`${baseURL}/o1/giveaway/${pageId}`, filter);
/**
 * Register form data
 * @param {object} REGISTER_DATA
 * @returns {Promise<any>}
 */
export const register = REGISTER_DATA =>
  axios.post(`${baseURL}/o1/auth/register`, REGISTER_DATA);
/**
 * Login form data
 * @param {object} LOGIN_DATA
 * @returns {Promise<any>}
 */
export const login = LOGIN_DATA =>
  axios.post(`${baseURL}/o1/auth/login`, LOGIN_DATA);

/**
 * Forgot password form data
 * @param {object} FORGOT_DATA
 * @returns {Promise<any>}
 */
export const forgotPassword = FORGOT_DATA =>
  axios.post(`${baseURL}/o1/auth/forgot`, FORGOT_DATA);
/**
 * Checks if token is valid
 * @param {object} token
 * @returns {Promise<any>}
 */
export const validateAccount = token =>
  axios.post(`${baseURL}/o1/auth/validate`, token);
/**
 * Confirms account based on key
 * @param {string} CONFIRM_KEY
 * @returns {Promise<any>}
 */
export const confirmAccount = CONFIRM_KEY =>
  axios.post(`${baseURL}/o1/auth/confirm`, CONFIRM_KEY);
/**
 * Reset password form data ( key from email)
 * @param RESET_DATA
 * @returns {AxiosPromise<any>}
 */
export const resetPassword = RESET_DATA =>
  axios.post(`${baseURL}/o1/auth/reset`, RESET_DATA);
/**
 * Resend email to confirm account
 * @param RESET_DATA
 * @returns {AxiosPromise<any>}
 */
export const resendEmail = RESET_DATA =>
  axios.post(`${baseURL}/o1/auth/reset`, RESET_DATA);
