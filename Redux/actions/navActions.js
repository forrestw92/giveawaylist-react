import { SET_CURRENT_PAGE, SET_PAGE_ID } from "./types";

/**
 * Sets current page so can highlight nav item
 * @param {string} page
 * @returns {Function}
 */
export const setCurrentPage = page => dispatch => {
  dispatch({
    type: SET_CURRENT_PAGE,
    payload: page
  });
};

/**
 * Sets current page Id
 * @param {Number} pageId
 * @returns {Function}
 */
export const setPageId = pageId => dispatch => {
  dispatch({
    type: SET_PAGE_ID,
    payload: pageId
  });
};
