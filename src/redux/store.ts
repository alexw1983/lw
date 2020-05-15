import { createStore } from "redux";
import reducer from "./reducers";
import { takeDamage, loadActionChart, loadActionChartSuccess } from "./actions";

const store = createStore(
  reducer,
  {},
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

// Log the initial state
console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// Dispatch some actions
store.dispatch(takeDamage(5));
store.dispatch(takeDamage(1));
store.dispatch(takeDamage(3));
store.dispatch(loadActionChart("1"));
store.dispatch(
  loadActionChartSuccess("1", {
    combatSkill: 25,
    endurancePoints: 30,
    kaiDiscipines: [
      { name: "Healing", description: "" },
      { name: "Sixth Sense", description: "" },
      { name: "Mind Blast", description: "" },
      { name: "Weapon Skill", description: "" },
      { name: "Hunting", description: "" },
    ],
    backpack: [],
    beltPouch: 10,
    weapons: ["Sword", "dagger"],
    specialItems: [],
  })
);

// Stop listening to state updates
unsubscribe();

export default store;
