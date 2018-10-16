import { FETCH_GIVEAWAYS, DELETE_GIVEAWAY, TOTAL_GIVEAWAYS } from "./types";
import axios from "axios";

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
export const deleteGiveaway = id => dispatch => {
  //Need to post to server deleted of giveaway
  dispatch({
    type: DELETE_GIVEAWAY,
    payload: id
  });
};
