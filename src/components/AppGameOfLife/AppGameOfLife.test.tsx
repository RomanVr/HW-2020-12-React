import React from "react";
import { render, screen } from "@testing-library/react";
import { AppGameOfLife } from "./AppGameOfLife";
import userEvent from "@testing-library/user-event";

describe("AppLifeCycle testing", () => {
  beforeEach(() => {
    render(<AppGameOfLife />);
  });

  it("renderrs AppGameOfLife", () => {
    expect(screen.getByAltText("Main")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter size")).toBeInTheDocument();
    expect(screen.queryByTestId("inputTime")).toBeNull();
    expect(screen.getByTestId("buttonValue")).toBeInTheDocument();
    expect(screen.getByText(/Image Number:/)).toBeInTheDocument();
  });

  it("test field items", () => {
    expect(screen.queryAllByTestId("items-field-item").length).toBe(100);

    expect(
      (screen.getByPlaceholderText("Enter size") as HTMLInputElement).value
    ).toBe("10");

    const textInput = "3";
    userEvent.clear(screen.getByPlaceholderText("Enter size"));
    userEvent.type(screen.getByPlaceholderText("Enter size"), textInput);
    userEvent.click(screen.getByDisplayValue("Ok"));

    expect(
      (screen.getByPlaceholderText("Enter size") as HTMLInputElement).value
    ).toBe("3");
    expect(screen.queryAllByTestId("items-field-item").length).toBe(9);
  });

  it("test error span", () => {
    expect(() => {
      userEvent.type(screen.getByPlaceholderText("Enter size"), "q");
    }).not.toThrow("Size must be a number!");

    expect(screen.getByTestId("spanError")).toBeInTheDocument();
    userEvent.click(screen.getByDisplayValue("Ok"));
    expect(screen.queryAllByTestId("items-field-item").length).toBe(100);
  });
});
