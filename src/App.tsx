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
  NewPlayer,
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
          <Route path="/new-player">
            <NewPlayer />
          </Route>
          <Route path="/player/:id">
            <Player />
          </Route>
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
