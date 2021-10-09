import { NameGame } from "@/components";
import { GameScreen } from "@/screens/GameScreen/GameScreen";
import { Login } from "@/screens/Login/Login";
import { NoMatchScreen } from "@/screens/NoMatchScreen/NoMatchScreen";
import { UserScreen } from "@/screens/User/User";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

export function AppRoute(): React.ReactElement {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
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
          <Route exact path="/" component={NameGame} />
          <Route path="/login" component={Login} />
          <Route path="/user/:name" component={UserScreen} />
          <Route path="/game" component={GameScreen} />
          <Route path="/*" component={NoMatchScreen} />
        </Switch>
      </div>
    </Router>
  );
}
