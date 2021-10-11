import React from "react";
import { render, screen } from "@testing-library/react";
import { Login } from "./Login";
import userEvent from "@testing-library/user-event";

const mockHistory = { push: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

describe("Test Login", () => {
  it("Render Login", () => {
    render(<Login onSubmitLogin={jest.fn()} />);
    expect(screen.getByTestId("FormLogin")).toBeInTheDocument();
  });
  it("Type name test", () => {
    const onlogin = jest.fn();
    render(<Login onSubmitLogin={onlogin} />);

    const inputLogin = screen.getByTestId("InputText");
    userEvent.type(inputLogin, "Name{enter}");
    const buttonSubmit = screen.getByTestId("InputTextButtonSubmit");
    userEvent.click(buttonSubmit);
    expect(onlogin).toBeCalled();
    expect(mockHistory.push).toHaveBeenCalledWith("/game");
  });
});
