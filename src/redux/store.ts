import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import lwAppReducer from "./reducers";
import { toggleLoading } from "./actions/other-actions";
import { fetchPlayers, requestPlayers } from "./actions/player-actions";

const loggerMiddleware = createLogger();

const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(loggerMiddleware, thunkMiddleware)
);

const store = createStore(lwAppReducer, enhancer);

store.dispatch<any>(requestPlayers());

store.dispatch<any>(toggleLoading());

store.dispatch<any>(fetchPlayers());

export default store;
