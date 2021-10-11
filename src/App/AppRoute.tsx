import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { NameGame } from "@/components";
import { GameScreen } from "@/screens/GameScreen/GameScreen";
import { Login } from "@/screens/Login/Login";
import { NoMatchScreen } from "@/screens/NoMatchScreen/NoMatchScreen";
import { UserScreen } from "@/screens/UserScreen/UserScreen";
import { getLogin } from "@/api/auth";
import { withTextDecor } from "@/HOC/withTextDecor";

const stylesParams = {
  style: { textDecoration: "unset" },
};

const LinkWithDecor = withTextDecor(Link, stylesParams);

export function AppRoute(): React.ReactElement {
  const [login, setLogin] = useState(getLogin());
  return (
    <Router>
      <nav>
        <ul
          style={{
            display: "flex",
            listStyleType: "none",
            justifyContent: "space-around",
          }}
        >
          <li>
            <LinkWithDecor to="/">Home</LinkWithDecor>
          </li>
          {login ? (
            <>
              <li>
                <LinkWithDecor to="/game">GameOfLife</LinkWithDecor>
              </li>
              <li>
                <LinkWithDecor
                  to={`/user/${login}`}
                >{`Login to: ${login}`}</LinkWithDecor>
              </li>
            </>
          ) : (
            <li>
              <LinkWithDecor to="/login">Login</LinkWithDecor>
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
    </Router>
  );
}
