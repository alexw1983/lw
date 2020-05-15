import { LW_ACTION_TYPE, ILwAction } from "../actionTypes";

const { LOAD_ACTION_CHART, LOAD_ACTION_CHART_SUCCESS, TOGGLE_LOADING } = LW_ACTION_TYPE;

const loadingReducer = (state: boolean = false, action: ILwAction) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return !state;
    case LOAD_ACTION_CHART:
      return true;
    case LOAD_ACTION_CHART_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
