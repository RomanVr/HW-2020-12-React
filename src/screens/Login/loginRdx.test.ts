import loginRdx, { CheckState, login, logout } from "./loginRdx";

describe("Test login reducer", () => {
  const initialState = {
    userName: "",
    statusUser: CheckState.initiated,
  };

  it("default action", () => {
    const actionEmpty = { type: "" };
    const defaultState = loginRdx(undefined, actionEmpty);
    expect(defaultState).toEqual(initialState);
  });

  it("login action", () => {
    const nameUser = "Test";
    const stateLogin = {
      userName: nameUser,
      statusUser: CheckState.succeed,
    };
    expect(loginRdx(initialState, login(nameUser))).toEqual(stateLogin);
  });

  it("logout action", () => {
    const stateLogout = {
      userName: "",
      statusUser: CheckState.failed,
    };
    expect(loginRdx(initialState, logout())).toEqual(stateLogout);
  });
});
