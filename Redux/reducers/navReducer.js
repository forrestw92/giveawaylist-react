import { SET_CURRENT_PAGE, SET_PAGE_ID } from "../actions/types";

const initialState = {
  currentPage: "",
  pageId: 1
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    case SET_PAGE_ID:
      return {
        ...state,
        pageId: action.payload
      };
    default:
      return state;
  }
}
