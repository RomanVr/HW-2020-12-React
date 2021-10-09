import { render, screen } from "@testing-library/react";
import React from "react";
import { User } from "./User";

describe("Test User", () => {
  it("Render User", () => {
    render(<User logoutClick={jest.fn()} nameUser="User" />);
    expect(screen.getByTestId("InputTextButtonLogout")).toBeInTheDocument();
  });
});
