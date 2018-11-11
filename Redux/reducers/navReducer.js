import { SET_CURRENT_PAGE } from "../actions/types";

const initialState = {
  currentPage: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    default:
      return state;
  }
}
