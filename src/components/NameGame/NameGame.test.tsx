import { render, screen } from "@testing-library/react";
import React from "react";
import { NameGame } from "./NameGame";

describe("Test NameGame", () => {
  it("render NameGame", () => {
    render(<NameGame />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
