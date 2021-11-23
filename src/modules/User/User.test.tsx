import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { User } from "./User";

const mockHistory = { push: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
  useParams: () => ({ name: "User" }),
}));

const mockDispatch = jest.fn();
jest.mock("@/rdx/hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

describe("Test User", () => {
  it("Render User", () => {
    render(<User />);
    expect(screen.getByTestId("InputTextButtonLogout")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Logout")).toBeInTheDocument();
    expect(
      screen.getByTestId("InputTextButtonLogout").getAttribute("type")
    ).toBe("button");
  });

  it("user logout", () => {
    render(<User />);

    const buttonLogout = screen.getByTestId("InputTextButtonLogout");
    userEvent.click(buttonLogout);
    expect(mockHistory.push).toHaveBeenCalledWith("/");
  });
});
