import React from "react";
import { render, screen } from "@testing-library/react";
import { InputTime } from "./InputTime";

describe("InputTime", () => {
  it("Render input for with value Time", () => {
    render(<InputTime />);

    expect(screen.getByTestId("inputTime")).toBeInTheDocument();
  });
});
