import {
  FETCH_GIVEAWAYS,
  DELETE_SINGLE_GIVEAWAY,
  TOTAL_GIVEAWAYS,
  DELETE_GIVEAWAYS
} from "./types";
import axios from "axios";

/**
 * Checks if current day is DST
 * REF: https://stackoverflow.com/a/30280636
 * @param {Date} date
 * @returns {boolean}
 */
function isDST(date) {
  let jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
  let jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
  return Math.min(jan, jul) === date.getTimezoneOffset();
}

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
  const today = new Date(serverTime);
  giveawayTime.setHours(giveawayTime.getHours() - (isDST(today) ? 8 : 7));

  today.setHours(today.getHours() - 8);
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
 * @returns {Function}
 */
export const fetchGiveaways = (pageId, type = "") => dispatch => {
  return axios
    .post(
      `https://forrestwalker.me/api/o1/giveaway/${
        type !== "" ? type + "/" : ""
      }${pageId}`
    )

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
