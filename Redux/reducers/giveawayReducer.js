import { FETCH_GIVEAWAYS, DELETE_GIVEAWAY } from "../actions/types";

const initialState = {
  items: [],
  item: {}
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
    default:
      return state;
  }
}
