import { LOGIN, LOGOUT, USER_DETAILS } from "../actions/types";

const initialState = {
  loggedIn: [],
  userDetails: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: action.payload,
        userDetails: {}
      };
    case USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload
      };
    default:
      return state;
  }
}
