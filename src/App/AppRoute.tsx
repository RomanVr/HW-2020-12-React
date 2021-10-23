import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { NameGame } from "@/components";
import { GameScreen } from "@/screens/GameScreen/GameScreen";
import { Login } from "@/screens/Login/Login";
import { NoMatchScreen } from "@/screens/NoMatchScreen/NoMatchScreen";
import { UserScreen } from "@/screens/UserScreen/UserScreen";
import { withTextDecor } from "@/HOC/withTextDecor";
import { asyncAuthLocalStorage } from "@/api/authLocalStorage/auth";
import { Provider } from "react-redux";
import { store } from "@/rdx/store";

const stylesParams = {
  style: { textDecoration: "unset" },
};

const LinkWithDecor = withTextDecor(Link, stylesParams);

export function AppRoute(): React.ReactElement {
  const [login, setLogin] = useState("");
  useEffect(() => {
    (async () => {
      const user = (await asyncAuthLocalStorage.getUserSession()) as string;
      setLogin(user);
    })();
  }, []);
  return (
    <Provider store={store}>
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
          <Route exact path="/">
            <NameGame />
          </Route>
          <Route path="/login">
            <Login onSubmitLogin={setLogin} />
          </Route>
          <Route path="/user/:name">
            <UserScreen onSubmitLogin={setLogin} />
          </Route>
          <Route path="/game">
            <GameScreen />
          </Route>
          <Route path="/*">
            <NoMatchScreen />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}
