import {
  FETCH_GIVEAWAYS,
  DELETE_GIVEAWAY,
  TOTAL_GIVEAWAYS
} from "../actions/types";

const initialState = {
  items: [],
  totalGiveaways: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_GIVEAWAYS:
      return {
        ...state,
        items: action.payload
      };
    case DELETE_GIVEAWAY:
      return {
        items: state.items.filter(item => item.id !== action.payload)
      };
    case TOTAL_GIVEAWAYS:
      return {
        ...state,
        totalGiveaways: action.payload
      };
    default:
      return state;
  }
}
