import { combineReducers } from "redux";
import giveawayReducer from "./giveawayReducer";
import menuReducer from "./menuReducer";
import loginReducer from "./loginReducer";

export default combineReducers({
  giveaways: giveawayReducer,
  menus: menuReducer,
  user: loginReducer
});
