import React from "react";
import { render, screen } from "@testing-library/react";
import { InputText } from "./InputText";

describe("Test InputText", () => {
  it("Render input", () => {
    render(<InputText valueInput={"0"} />);
    expect(screen.getByTestId("InputText")).toBeInTheDocument();
  });
});
