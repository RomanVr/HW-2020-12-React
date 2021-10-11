import React from "react";
import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { User } from "./User";

const mockHistory = { push: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

const mockParams = { name: "User" };

jest.mock("react-router-dom", () => ({
  useParams: mockParams,
}));

afterEach(cleanup);

describe("Test User", () => {
  it("Render User", () => {
    render(<User onSubmitLogin={jest.fn()} />);
    expect(screen.getByTestId("InputTextButtonLogout")).toBeInTheDocument();
  });
  it("user logout", () => {
    const onLogout = jest.fn();
    render(<User onSubmitLogin={onLogout} />);

    const buttonLogout = screen.getByTestId("Buttonlogout");
    userEvent.click(buttonLogout);
    expect(onLogout).toBeCalled();
    expect(mockHistory.push).toHaveBeenCalledWith("/");
  });
});
