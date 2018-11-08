import { SHOW_HIDE_FAB, STICKY_FAB } from "../actions/types";

const initialState = {
  fabOpen: false,
  fabSticky: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_HIDE_FAB:
      return {
        ...state,
        fabOpen: !state.fabOpen
      };
    case STICKY_FAB:
      return {
        ...state,
        fabSticky: !state.menuOpen
      };
    default:
      return state;
  }
}
