import { SHOW_HIDE_FAB, SHOW_HIDE_MENU } from "../actions/types";

const initialState = {
  fabOpen: false,
  menuOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_HIDE_FAB:
      return {
        ...state,
        fabOpen: !state.fabOpen
      };
    case SHOW_HIDE_MENU:
      return {
        ...state,
        menuOpen: !state.menuOpen
      };
    default:
      return state;
  }
}
