import { combineReducers } from "redux";
import loadingReducer from "./loadingReducer";
import actionChartReducer from "./actionChartReducer";
import playersReducer from "./players.reducer";
import showNewPlayerFormReducer from "./showNewPlayerFormReducer";

const lwAppReducer = combineReducers({
  loading: loadingReducer,
  actionChart: actionChartReducer,
  players: playersReducer,
  showNewPlayerForm: showNewPlayerFormReducer,
});

export default lwAppReducer;
