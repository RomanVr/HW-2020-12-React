import React from "react";
import { render, screen } from "@testing-library/react";
import { InputOnLength } from "./InputOnLength";

describe("Test InputOnLength", () => {
  it("Render input", () => {
    render(<InputOnLength value={0} />);
    expect(screen.getByTestId("InputOnLength")).toBeInTheDocument();
  });
});
