import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Login } from "./Login";
import userEvent from "@testing-library/user-event";

const mockHistory = { push: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

jest.mock("@/api/auth", () => ({
  login: jest.fn(),
}));

describe("Test Login", () => {
  it("Render Login", () => {
    render(<Login onSubmitLogin={jest.fn()} />);
    expect(screen.getByTestId("FormLogin")).toBeInTheDocument();
  });
  it("Type name test", async () => {
    const onlogin = jest.fn();
    render(<Login onSubmitLogin={onlogin} />);

    const inputLogin = screen.getByTestId("InputText");
    userEvent.type(inputLogin, "Name");
    const buttonSubmit = screen.getByTestId("InputTextButtonSubmit");
    await fireEvent.submit(buttonSubmit);

    expect(onlogin).toBeCalled();
    expect(mockHistory.push).toHaveBeenCalledWith("/game");
  });
});
