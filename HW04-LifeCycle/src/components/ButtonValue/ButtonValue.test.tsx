import React from "react";

import { render, screen } from "@testing-library/react";
import { ButtonValue } from "./ButtonValue";

describe("ButtonValue", () => {
  it("Render button", () => {
    render(<ButtonValue value="Show" handleClick={jest.fn()} />);
    expect(screen.getByTestId("buttonValue")).toBeInTheDocument();
  });
});
