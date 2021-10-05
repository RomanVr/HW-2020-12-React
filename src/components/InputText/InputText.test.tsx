import React from "react";
import { render, screen } from "@testing-library/react";
import { InputText } from "./InputText";
import userEvent from "@testing-library/user-event";

describe("Test InputText", () => {
  it("render input", () => {
    render(<InputText valueInput={"0"} />);
    expect(screen.getByTestId("InputText")).toBeInTheDocument();
  });

  it("test onClick and onChange", () => {
    const mockOnClick = jest.fn();
    const mockOnChange = jest.fn();
    render(
      <InputText
        valueInput={"ok"}
        onClickInput={mockOnClick}
        onChangeInput={mockOnChange}
      />
    );
    const inputText = screen.getByTestId("InputText");
    userEvent.click(inputText);
    expect(mockOnClick).toHaveBeenCalled();
    userEvent.type(inputText, "Name");
    expect(mockOnChange).toHaveBeenCalled();
  });
});
