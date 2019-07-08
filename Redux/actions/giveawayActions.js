import {
  FETCH_GIVEAWAYS,
  DELETE_SINGLE_GIVEAWAY,
  TOTAL_GIVEAWAYS,
  DELETE_GIVEAWAYS,
  SET_FILTERS,
  RESET_FILTER
} from "./types";
import { fetchGiveawayPage } from "../../API";
import { userLogout } from "./loginActions";

/**
 * Fetches giveaways based on page
 * @param {number} pageId
 * @param {string} type
 * @returns {Function}
 */
export const fetchGiveaways = () => (dispatch, getState) => {
  const { filter } = getState().giveaways;
  const { pageId, currentPage } = getState().nav;

  return fetchGiveawayPage(pageId, currentPage, filter)
    .then(res => {
      const { results, totalGiveaways } = res.data;
      dispatch({
        type: FETCH_GIVEAWAYS,
        payload: results
      });
      dispatch({
        type: TOTAL_GIVEAWAYS,
        payload: totalGiveaways
      });
      return results;
    })
    .catch(err => {
      const { data } = err.response;
      if (data.error === "INVALID_AUTHORIZATION") {
        dispatch(userLogout());
      }
    });
};
/**
 * Deletes single Giveaway
 * @param {number} id
 * @returns {Function}
 */
export const deleteSingleGiveaway = id => dispatch => {
  //Need to post to server deleted of giveaway
  dispatch({
    type: DELETE_SINGLE_GIVEAWAY,
    payload: id
  });
};
/**
 * Deletes all giveaways.
 * @returns {Function}
 */
export const deleteGiveaways = () => dispatch => {
  dispatch({
    type: DELETE_GIVEAWAYS,
    payload: []
  });
};

/**
 * Set giveaway filters
 * @param {object} filters
 * @returns {Function}
 */
export const setFilter = filters => dispatch => {
  dispatch({
    type: SET_FILTERS,
    payload: filters
  });
};

/**
 * Resets all giveaway filters
 * @returns {Function}
 */
export const resetFilter = () => dispatch => {
  dispatch({
    type: RESET_FILTER
  });
  dispatch(deleteGiveaways());
  dispatch(fetchGiveaways());
};
