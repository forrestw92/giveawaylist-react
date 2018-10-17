import {
  FETCH_GIVEAWAYS,
  DELETE_GIVEAWAY,
  TOTAL_GIVEAWAYS,
  DELETE_GIVEAWAYS
} from "./types";
import axios from "axios";

/**
 * Fetches giveaways based on page
 * @param {number} pageId
 * @returns {Function}
 */
export const fetchGiveaways = pageId => dispatch => {
  axios
    .post(`https://forrestwalker.me/api/o1/giveaway/${pageId}`)
    .then(res => {
      console.log(res.data.totalGiveaways);
      dispatch({
        type: FETCH_GIVEAWAYS,
        payload: res.data.results
      });
      dispatch({
        type: TOTAL_GIVEAWAYS,
        payload: res.data.totalGiveaways
      });
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
export const deleteGiveaway = id => dispatch => {
  //Need to post to server deleted of giveaway
  dispatch({
    type: DELETE_GIVEAWAY,
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
