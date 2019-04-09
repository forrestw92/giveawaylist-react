import {
  FETCH_GIVEAWAYS,
  DELETE_SINGLE_GIVEAWAY,
  TOTAL_GIVEAWAYS,
  DELETE_GIVEAWAYS
} from "./types";
import { fetchGiveawayPage } from "../../API";

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
  const today = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles"
    })
  );

  const diffMs = isStart ? today - giveawayTime : giveawayTime - today;
  const days = Math.floor(diffMs / 86400000);
  const hours = Math.floor((diffMs % 86400000) / 3600000);
  const minutes = Math.round(((diffMs % 86400000) % 3600000) / 60000);
  if (isStart) {
    if (days === 0) {
      if (hours >= 1) {
        if (hours === 1) {
          return `${hours} hour ago`;
        } else {
          return `${hours} hours ago`;
        }
      }
      return `${minutes} minutes ago`;
    } else {
      if (days === 1) {
        return `${days} day ago`;
      } else {
        return `${days} days ago`;
      }
    }
  } else {
    if (days === 0) {
      if (hours === 0) {
        return `in ${minutes} minutes`;
      } else {
        return `in ${hours} hours`;
      }
    } else {
      return `in ${days} days`;
    }
  }
}
/**
 * Fetches giveaways based on page
 * @param {number} pageId
 * @param {string} type
 * @param {object} filter
 * @returns {Function}
 */
export const fetchGiveaways = (pageId, type = "", filter = {}) => dispatch => {
  return fetchGiveawayPage(pageId, type, filter)
    .then(res => {
      const { results, totalGiveaways, serverTime } = res.data;
      results.map(giveaway => {
        giveaway.addedDate = fromNowInWords(
          giveaway.addedDate,
          serverTime,
          true
        );
        giveaway.endDate = fromNowInWords(giveaway.endDate, serverTime, false);
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
      console.log(err);
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
