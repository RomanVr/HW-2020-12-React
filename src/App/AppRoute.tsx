import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import { NameGame } from "@/components";
import { GameScreen } from "@/screens/GameScreen/GameScreen";
import { Login } from "@/screens/Login/Login";
import { selectUserName } from "@/screens/Login/loginRdx";
import { NoMatchScreen } from "@/screens/NoMatchScreen/NoMatchScreen";
import { UserScreen } from "@/screens/UserScreen/UserScreen";
import { withTextDecor } from "@/HOC/withTextDecor";
import { useAppSelector } from "@/rdx/hooks";

const stylesParams = {
  style: { textDecoration: "unset" },
};

const LinkWithDecor = withTextDecor(Link, stylesParams);

export function AppRoute(): React.ReactElement {
  const userLoginName = useAppSelector(selectUserName);

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
          {userLoginName ? (
            <>
              <li>
                <LinkWithDecor to="/game">GameOfLife</LinkWithDecor>
              </li>
              <li>
                <LinkWithDecor
                  to={`/user/${userLoginName}`}
                >{`Login to: ${userLoginName}`}</LinkWithDecor>
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
        <Route exact path="/">
          <NameGame />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/user/:name">
          <UserScreen />
        </Route>
        <Route path="/game">
          <GameScreen />
        </Route>
        <Route path="/*">
          <NoMatchScreen />
        </Route>
      </Switch>
    </Router>
  );
}
