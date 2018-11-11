import { SET_CURRENT_PAGE } from "./types";

/**
 * Sets current page so can highlight nav item
 * @returns {Function}
 */
export const setCurrentPage = page => dispatch => {
  dispatch({
    type: SET_CURRENT_PAGE,
    payload: page
  });
};
