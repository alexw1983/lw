import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  CombatLog,
  Home,
  ActionChartContainer,
  LoadingContainer,
  MainNav,
  Player,
  PlayersList,
  Adventure,
} from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <MainNav />

        <LoadingContainer />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/players">
            <PlayersList />
          </Route>
          <Route path="/player/:playerId" exact component={Player} />
          <Route
            path="/player/:playerId/adventure/:bookNumber"
            component={Adventure}
          />

          <Route path="/combat-log">
            <CombatLog />
          </Route>
          <Route path="/action-chart">
            <ActionChartContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
