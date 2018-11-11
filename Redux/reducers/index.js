import { combineReducers } from "redux";
import giveawayReducer from "./giveawayReducer";
import menuReducer from "./menuReducer";
import loginReducer from "./loginReducer";
import navReducer from "./navReducer";

export default combineReducers({
  giveaways: giveawayReducer,
  menus: menuReducer,
  user: loginReducer,
  nav: navReducer
});
