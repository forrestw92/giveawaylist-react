import { combineReducers } from "redux";
import giveawayReducer from "./giveawayReducer";
import menuReducer from "./menuReducer";

export default combineReducers({
  giveaways: giveawayReducer,
  menus: menuReducer
});
