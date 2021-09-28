import React, { ReactElement } from "react";
import { GameOfLife, Login } from "../components/";
import { User } from "../components/";

interface AppState {
  nameUser: string;
}

export class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = { nameUser: "" };
  }

  onLogin = (nameUser: string): void => {
    this.setState({ nameUser });
  };

  logoutClick = (): void => {
    this.setState({ nameUser: "" });
  };

  render(): ReactElement {
    let userComponent = <></>;
    let loginComponent = <></>;
    let gameOfLife = <></>;
    if (this.state.nameUser) {
      userComponent = (
        <User nameUser={this.state.nameUser} logoutClick={this.logoutClick} />
      );
      gameOfLife = <GameOfLife />;
      loginComponent = <></>;
    } else {
      loginComponent = <Login onLogin={this.onLogin} />;
      userComponent = <></>;
      gameOfLife = <></>;
    }
    return (
      <>
        {userComponent}
        {loginComponent}
        {gameOfLife}
      </>
    );
  }
}
