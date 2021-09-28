import React from "react";
import { render, screen } from "@testing-library/react";
import { InputSize } from "./InputSize";

describe("InputSize", () => {
  it("Render input for epmty value", () => {
    render(
      <InputSize
        size=""
        onChange={jest.fn()}
        placeHolder={"Input"}
        label={"X:"}
      />
    );

    expect(screen.getByTestId("inputSize")).toBeInTheDocument();
  });
});
