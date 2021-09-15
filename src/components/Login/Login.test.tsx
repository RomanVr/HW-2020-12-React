import React from "react";
import { render, screen } from "@testing-library/react";
import { Login } from "./Login";
import { type } from "@testing-library/user-event/dist/type";
import userEvent from "@testing-library/user-event";

describe("Test Login", () => {
  it("Render Login", () => {
    render(<Login onLogin={jest.fn()} />);
    expect(screen.getByTestId("FormLogin")).toBeInTheDocument();
  });
  it("Type name test", () => {
    const onlogin = jest.fn();
    render(<Login onLogin={onlogin} />);

    const inputLogin = screen.getByTestId("LoginInput");
    userEvent.type(inputLogin, "Name");
    userEvent.keyboard("Enter").
    const formLogin = screen.getByTestId("FormLogin");

    expect(screen.getByTestId("Login")).toBeInTheDocument();
  });
});
