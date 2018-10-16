import { FETCH_GIVEAWAYS, DELETE_GIVEAWAY } from "./types";
import axios from "axios";

export const fetchGiveaways = pageId => dispatch => {
  axios
    .post(`https://forrestwalker.me/api/o1/giveaway/${pageId}`)
    .then(res => {
      dispatch({
        type: FETCH_GIVEAWAYS,
        payload: res.data.results
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
