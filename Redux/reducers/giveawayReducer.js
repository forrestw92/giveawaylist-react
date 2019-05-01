import {
  FETCH_GIVEAWAYS,
  DELETE_SINGLE_GIVEAWAY,
  DELETE_GIVEAWAYS,
  TOTAL_GIVEAWAYS,
  SET_FILTERS,
  RESET_FILTER
} from "../actions/types";

const initialState = {
  items: [],
  totalGiveaways: undefined,
  filter: {
    oddsLow: false,
    oddsHigh: false,
    oddsMin: "",
    oddsMax: "",
    hideVideo: false,
    hideAmazon: false,
    hideSweepstakes: false,
    hideKeywords: [],
    latestWinner: false,
    hideKindle: false,
    endingSoon: false,
    prizeHigh: false,
    viewCount: false
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_GIVEAWAYS:
      return {
        ...state,
        items: action.payload
      };
    case DELETE_SINGLE_GIVEAWAY:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case DELETE_GIVEAWAYS:
      return {
        ...state,
        items: action.payload,
        totalGiveaways: undefined
      };
    case TOTAL_GIVEAWAYS:
      return {
        ...state,
        totalGiveaways: action.payload
      };
    case RESET_FILTER:
      return {
        ...state,
        filter: Object.assign({}, initialState.filter)
      };
    case SET_FILTERS:
      return {
        ...state,
        filter: Object.assign(state.filter, action.payload)
      };
    default:
      return state;
  }
}
