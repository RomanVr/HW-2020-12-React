import React from "react";
import { act, render, screen } from "@testing-library/react";
import { GameOfLife } from "./GameOfLife";
import userEvent from "@testing-library/user-event";

describe("GameOfLife testing", () => {
  beforeEach(() => {
    render(<GameOfLife />);
  });

  it("renders GameOfLife", () => {
    expect(screen.queryByTestId("GameofLife")).toBeInTheDocument();
  });
  it("Click to Cell", () => {
    const elemCell: HTMLElement = screen.getAllByTestId("items-field-item")[0];
    userEvent.click(elemCell);
    expect(screen.queryAllByTestId("items-field-item").length).toBe(100);
  });
  it("Click to Cell live", () => {
    const elemCell: HTMLElement = screen.getAllByTestId("items-field-item")[0];
    userEvent.click(elemCell);
    userEvent.click(elemCell);
    expect(screen.queryAllByTestId("items-field-item").length).toBe(100);
  });
  it("Type in the input", () => {
    const inputSize = screen.getByTestId("InputTextsizeX");
    userEvent.clear(inputSize);
    userEvent.type(inputSize, "20");
    userEvent.click(screen.getByTestId("InputTextButtonSubmit"));
    expect(screen.queryAllByTestId("items-field-item").length).toBe(200);
  });
  it("Click Step", () => {
    const buttonStep = screen.getByDisplayValue("Step");
    userEvent.click(buttonStep);
    expect(screen.queryAllByTestId("items-field-item").length).toBe(100);
  });
  it("Cell alone to live", () => {
    userEvent.click(screen.getAllByTestId("items-field-item")[0]);
    userEvent.click(screen.getAllByTestId("items-field-item")[1]);
    userEvent.click(screen.getAllByTestId("items-field-item")[2]);
    const buttonStep = screen.getByDisplayValue("Step");
    userEvent.click(buttonStep);
    expect(screen.queryAllByTestId("items-field-item").length).toBe(100);
  });
  it("Cick Start", () => {
    jest.useFakeTimers();
    const buttonStart = screen.getByDisplayValue("Start");
    userEvent.click(buttonStart);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.queryAllByTestId("items-field-item").length).toBe(100);
  });
  it("Input value Random", () => {
    // screen.debug();
    const inputRnd = screen.getByDisplayValue("20");
    userEvent.clear(inputRnd);
    userEvent.type(inputRnd, "10");
    expect(screen.queryAllByTestId("items-field-item").length).toBe(100);
    userEvent.type(inputRnd, "100");
    expect(screen.queryAllByTestId("items-field-item").length).toBe(100);
  });
  it("Cick Random", () => {
    jest.useFakeTimers();
    const buttonRnd = screen.getByDisplayValue("Random Fill");
    userEvent.click(buttonRnd);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.queryAllByTestId("items-field-item").length).toBe(100);
  });
  it("Get Finish from the second step", () => {
    userEvent.click(screen.getAllByTestId("items-field-item")[0]);
    userEvent.click(screen.getAllByTestId("items-field-item")[1]);
    userEvent.click(screen.getAllByTestId("items-field-item")[2]);
    const buttonStep = screen.getByDisplayValue("Step");
    userEvent.click(buttonStep);
    userEvent.click(buttonStep);
    expect(screen.getByDisplayValue("Finish!!!")).toBeInTheDocument();
  });
  it("Cick Clear", () => {
    jest.useFakeTimers();
    userEvent.click(screen.getAllByTestId("items-field-item")[0]);
    userEvent.click(screen.getAllByTestId("items-field-item")[1]);
    userEvent.click(screen.getAllByTestId("items-field-item")[2]);
    userEvent.click(screen.getAllByTestId("items-field-item")[3]);
    const buttonClear = screen.getByDisplayValue("Clear");
    const buttonStart = screen.getByDisplayValue("Start");
    userEvent.click(buttonStart);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    userEvent.click(buttonClear);
    expect(screen.queryAllByTestId("items-field-item").length).toBe(100);
  });
  it("Cick Start and Stop", () => {
    jest.useFakeTimers();
    const buttonStart = screen.getByDisplayValue("Start");
    userEvent.click(screen.getAllByTestId("items-field-item")[0]);
    userEvent.click(screen.getAllByTestId("items-field-item")[1]);
    userEvent.click(screen.getAllByTestId("items-field-item")[2]);
    userEvent.click(screen.getAllByTestId("items-field-item")[3]);
    userEvent.click(buttonStart);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    userEvent.click(buttonStart);
    expect(screen.queryAllByTestId("items-field-item").length).toBe(100);
  });
  it("Cick Increment and Decrement", () => {
    const buttonInc = screen.getByText("Rase");
    const buttonDec = screen.getByText("Damp");
    userEvent.click(buttonInc);
    userEvent.click(buttonDec);
    expect(screen.queryAllByTestId("items-field-item").length).toBe(100);
  });
  it("Cick Increment and Decrement with Star", () => {
    jest.useFakeTimers();
    const buttonInc = screen.getByText("Rase");
    const buttonDec = screen.getByText("Damp");
    const buttonStart = screen.getByDisplayValue("Start");
    userEvent.click(screen.getAllByTestId("items-field-item")[0]);
    userEvent.click(screen.getAllByTestId("items-field-item")[1]);
    userEvent.click(screen.getAllByTestId("items-field-item")[2]);
    userEvent.click(screen.getAllByTestId("items-field-item")[3]);
    userEvent.click(buttonStart);
    userEvent.click(buttonInc);
    act(() => {
      jest.advanceTimersByTime(1100);
    });
    userEvent.click(buttonDec);
    act(() => {
      jest.advanceTimersByTime(1100);
    });
    expect(screen.queryAllByTestId("items-field-item").length).toBe(100);
  });
  it("Type in the input wrong number", () => {
    const inputSize = screen.getByTestId("InputTextsizeX");
    userEvent.clear(inputSize);
    expect(() => {
      userEvent.type(inputSize, "22t");
    }).not.toThrow();
    userEvent.clear(inputSize);
    userEvent.type(inputSize, "10");
    userEvent.click(screen.getByTestId("InputTextButtonSubmit"));
    expect(screen.queryAllByTestId("items-field-item").length).toBe(100);
  });
});
