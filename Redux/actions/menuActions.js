import { SHOW_HIDE_MENU, SHOW_HIDE_FAB, STICKY_FAB } from "./types";

/**
 * Hides or shows menu based on icon click
 * @returns {Function}
 */
export const showHideMenu = () => dispatch => {
  dispatch({
    type: SHOW_HIDE_MENU
  });
};
/**
 * Hides or shows filter container based on fab click
 * @returns {Function}
 */
export const showHideFAB = () => dispatch => {
  dispatch({
    type: SHOW_HIDE_FAB
  });
};

export const stickyFAB = () => dispatch => {
  dispatch({
    type: STICKY_FAB
  });
};
