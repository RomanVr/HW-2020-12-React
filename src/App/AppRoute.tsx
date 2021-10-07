import { GameOfLife } from "@/modules/GameOfLife/GameOfLife";
import { Login } from "@/modules/Login/Login";
import { NoMatchScreen } from "@/modules/NoMatchScreen/NoMatchScreen";
import { User } from "@/modules/User/User";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

export function AppRoute(): React.ReactElement {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/user/def">User</Link>
            </li>
            <li>
              <Link to="/game">GameOfLife</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" render={() => <></>} />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/user/:name" component={User} />
          <Route path="/game">
            <GameOfLife />
          </Route>
          <Route path="/*">
            <NoMatchScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
