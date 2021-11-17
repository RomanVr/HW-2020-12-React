import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { FormDataGame } from "./FormDataGame";

describe("FormDataGame testing", () => {
  const handleSubmit = jest.fn();
  beforeEach(() => {
    render(<FormDataGame getSizeXY={handleSubmit} />);
  });

  it("renders FormDataGame", () => {
    expect(screen.getByTestId("InputTextsizeX").getAttribute("type")).toBe(
      "text"
    );
    expect(screen.getByRole("textbox", { name: "X:" })).toBeInTheDocument();
    expect(screen.getByTestId("InputTextButtonSubmit")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Ok")).toBeInTheDocument();
    expect(screen.getByTestId("InputTextsizeY").getAttribute("type")).toBe(
      "text"
    );
    expect(screen.getByRole("textbox", { name: "Y:" })).toBeInTheDocument();
  });

  it("Type in the input", () => {
    const inputSize = screen.getByTestId("InputTextsizeX");
    userEvent.clear(inputSize);
    userEvent.type(inputSize, "22");
    userEvent.click(screen.getByTestId("InputTextButtonSubmit"));
    expect(handleSubmit).toBeCalled();
  });

  it("Type in the input wrong number", () => {
    const inputSize = screen.getByTestId("InputTextsizeX");
    userEvent.clear(inputSize);
    userEvent.type(inputSize, "22t");
    userEvent.click(screen.getByTestId("InputTextButtonSubmit"));
    expect(screen.getByTestId("spanError")).toBeInTheDocument();
  });
});
