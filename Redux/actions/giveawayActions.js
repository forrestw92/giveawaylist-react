import {
  FETCH_GIVEAWAYS,
  DELETE_SINGLE_GIVEAWAY,
  TOTAL_GIVEAWAYS,
  DELETE_GIVEAWAYS,
  SET_FILTERS
} from "./types";
import { fetchGiveawayPage } from "../../API";
import formatDistance from "date-fns/formatDistance";
import { userLogout } from "./loginActions";

/**
 * Gets time difference in words
 * REF: https://stackoverflow.com/a/7709819
 * @param {string} time
 * @param {string} serverTime
 * @param {boolean} isStart
 * @returns {string}
 */
function fromNowInWords(time, serverTime, isStart) {
  let giveawayTime = new Date(time);
  let today = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles"
    })
  );

  if (isStart) {
    return formatDistance(giveawayTime, today) + " ago";
  }
  return "in " + formatDistance(today, giveawayTime);
}

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
      const { results, totalGiveaways, serverTime } = res.data;
      results.map(giveaway => {
        giveaway.addedDate = fromNowInWords(
          giveaway.addedDate,
          serverTime,
          true
        );

        giveaway.endDate = fromNowInWords(giveaway.endDate, serverTime, false);
        if (giveaway.last_winner === null) {
          giveaway.last_winner = "No Winners";
        } else {
          giveaway.last_winner = fromNowInWords(
            giveaway.last_winner,
            serverTime,
            true
          );
        }
      });
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
