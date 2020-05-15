import { combineReducers } from "redux";
import loadingReducer  from './loadingReducer';
import actionChartReducer  from './actionChartReducer';

const lwAppReducer = combineReducers({
  loading: loadingReducer,
  actionChart: actionChartReducer,
});

export default lwAppReducer;
