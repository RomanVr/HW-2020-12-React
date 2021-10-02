import React from "react";
import { render, screen } from "@testing-library/react";
import { Login } from "./Login";
import userEvent from "@testing-library/user-event";

describe("Test Login", () => {
  it("Render Login", () => {
    render(<Login onLogin={jest.fn()} />);
    expect(screen.getByTestId("FormLogin")).toBeInTheDocument();
  });
  it("Type name test", () => {
    const onlogin = jest.fn();
    render(<Login onLogin={onlogin} />);

    const inputLogin = screen.getByTestId("InputText");
    userEvent.type(inputLogin, "Name{enter}");
    expect(onlogin).toBeCalled();
  });
});
