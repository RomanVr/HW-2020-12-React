import React from "react";
import { render, screen } from "@testing-library/react";
import { InputSize } from "./InputSize";

describe("InputSize", () => {
  it("Render input for epmty value", () => {
    render(<InputSize size="" handleChangeSize={jest.fn()} />);

    expect(screen.getByTestId("inputSize")).toBeInTheDocument();
  });
});
