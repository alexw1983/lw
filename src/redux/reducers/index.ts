import { combineReducers } from "redux";
import loadingReducer from "./loadingReducer";
import playersReducer from "./players.reducer";
import showNewPlayerFormReducer from "./showNewPlayerFormReducer";
import adventuresReducer from "./adventuresReducer";

const lwAppReducer = combineReducers({
  loading: loadingReducer,
  players: playersReducer,
  showNewPlayerForm: showNewPlayerFormReducer,
  adventures: adventuresReducer
});

export default lwAppReducer;
