import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import lwAppReducer from "./reducers";
import { fetchPlayersIfNeeded } from "./actions/player-actions";
import { fetchAdventuresIfNeeded } from "./actions/adventures-action";

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

store.dispatch<any>(fetchPlayersIfNeeded());

store.dispatch<any>(fetchAdventuresIfNeeded());

export default store;
