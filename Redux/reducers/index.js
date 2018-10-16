import { combineReducers } from "redux";
import postReducer from "./giveawayReducer";

export default combineReducers({
  giveaways: postReducer
});
