import { render, screen } from "@testing-library/react";
import React from "react";
import { SpanError } from "./SpanError";

describe("Test SpanError", () => {
  it("Render SpanError", () => {
    render(<SpanError />);
    expect(screen.getByTestId("spanError")).toBeInTheDocument();
  });
});
