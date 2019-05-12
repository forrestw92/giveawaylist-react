import axios from "axios";

const baseURL = process.env.BASE_API;

/**
 * Removes false/empty object entries
 * @author https://flaviocopes.com/how-to-remove-object-property-javascript/#remove-a-property-without-mutating-the-object
 * @param {object} obj
 * @returns {{}} new object
 */
const cleanObj = obj =>
  Object.keys(obj).reduce((object, key) => {
    if (obj[key] !== false && obj[key].length !== 0 && obj[key] !== "") {
      object[key] = obj[key];
    }
    return object;
  }, {});

/**
 * Converts object to query string
 * @param {object} obj
 * @returns {string} query string
 */
const objToPrams = obj =>
  Object.keys(cleanObj(obj))
    .map(key => `${key}=${obj[key]}`)
    .join("&");

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
  axios.get(
    `${baseURL}/giveaway${type === "/" ? type : type + "/"}${pageId}${
      Object.keys(filter).length >= 1 ? "/?" + objToPrams(filter) : ""
    }`,
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
 * Gets user details
 * @returns {Promise<any>}
 */
export const userDetails = () => axios.get(`${baseURL}/auth/details`);

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
 * Changes user email subscriptions
 * @param FORM_DATA
 * @returns {AxiosPromise<any>}
 */
export const changeSubscription = FORM_DATA =>
  axios.post(`${baseURL}/subscriptions/update`, FORM_DATA);

/**
 * Unsubscribe user email subscriptions
 * @param FORM_DATA
 * @returns {AxiosPromise<any>}
 */
export const unsubscribeNewsletter = FORM_DATA =>
  axios.post(`${baseURL}/subscriptions/unsubscribe`, FORM_DATA);

/**
 * Checks if user has email subscription
 * @returns {AxiosPromise<any>}
 */
export const checkSubscription = () =>
  axios.get(`${baseURL}/subscriptions/check`);

/**
 * Change password
 * @param {object} FORM_DATA
 * @returns {AxiosPromise<any>}
 */
export const changePassword = FORM_DATA =>
  axios.post(`${baseURL}/auth/change`, FORM_DATA);

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

/**
 * Get Giveaway Categories
 * @param FILTER_DATA
 * @returns {AxiosPromise<any>}
 */
export const getCategories = FILTER_DATA =>
  axios.get(
    `${baseURL}/giveaway/categories${
      Object.keys(FILTER_DATA).length >= 1 ? "/?" + objToPrams(FILTER_DATA) : ""
    }`
  );

/**
 * Send contact form message
 * @param CONTACT_DATA
 * @returns {AxiosPromise<any>}
 */
export const sendMessage = CONTACT_DATA =>
  axios.post(`${baseURL}/contact`, CONTACT_DATA);
