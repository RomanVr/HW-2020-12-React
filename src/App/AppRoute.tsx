import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { NameGame } from "@/components";
import { GameScreen } from "@/screens/GameScreen/GameScreen";
import { Login } from "@/screens/Login/Login";
import { NoMatchScreen } from "@/screens/NoMatchScreen/NoMatchScreen";
import { UserScreen } from "@/screens/User/User";
import { getLogin } from "@/api/auth";

export function AppRoute(): React.ReactElement {
  const [login, setLogin] = useState(getLogin());
  // const login = getLogin();
  return (
    <Router>
      <div>
        <nav>
          <ul
            style={{
              display: "flex",
              listStyleType: "none",
              justifyContent: "space-around",
            }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            {login ? (
              <>
                <li>
                  <Link to="/game">GameOfLife</Link>
                </li>
                <li>
                  <Link to={`/user/${login}`}>User</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={NameGame} />
          <Route path="/login">
            <Login onSubmitLogin={setLogin} />
          </Route>
          <Route path="/user/:name">
            <UserScreen onSubmitLogin={setLogin} />
          </Route>
          <Route path="/game" component={GameScreen} />
          <Route path="/*" component={NoMatchScreen} />
        </Switch>
      </div>
    </Router>
  );
}
