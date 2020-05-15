import { combineReducers } from "redux";
import loadingReducer  from './loadingReducer';
import actionChartReducer  from './actionChartReducer';
import playersReducer from "./players.reducer";

const lwAppReducer = combineReducers({
  loading: loadingReducer,
  actionChart: actionChartReducer,
  players: playersReducer
});

export default lwAppReducer;
