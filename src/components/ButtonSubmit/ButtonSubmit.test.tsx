import React from "react";

import { render, screen } from "@testing-library/react";
import { ButtonSubmit } from "./ButtonSubmit";

describe("ButtonSubmit", () => {
  it("Render button", () => {
    render(<ButtonSubmit />);
    expect(screen.getByTestId("ButtonSubmit")).toBeInTheDocument();
  });
});
