import React from "react";
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
            exact
            path="/player/:playerId/adventure/:bookNumber"
            component={Adventure}
          />
          <Route
            exact
            path="/player/:playerId/adventure/:bookNumber/combat"
            component={CombatLog}
          />

          <Route path="/action-chart">
            <ActionChartContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
