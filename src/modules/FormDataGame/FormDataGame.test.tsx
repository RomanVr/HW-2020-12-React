import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { FormDataGame } from "./FormDataGame";

describe("FormDataGame testing", () => {
  const handleSubmit = jest.fn();
  beforeEach(() => {
    render(<FormDataGame onSubmit={handleSubmit} errorInfoElem={<></>} />);
  });

  it("renders FormDataGame", () => {
    expect(screen.getByTestId("InputTextsizeX")).toBeInTheDocument();
    expect(screen.getByTestId("InputTextButtonSubmit")).toBeInTheDocument();
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
    expect(() => {
      userEvent.type(inputSize, "22t");
    }).not.toThrow();
  });
});
