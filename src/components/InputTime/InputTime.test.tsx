import React from "react";
import { act, render, screen } from "@testing-library/react";
import { InputTime } from "./InputTime";

describe("Test InputTime", () => {
  beforeEach(() => {
    render(<InputTime />);
    jest.useFakeTimers();
  });
  it("Render input for with value Time", () => {
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId("InputText")).toBeInTheDocument();
  });
  it("Render input for with value Time", () => {
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect(screen.getByTestId("InputText")).toBeInTheDocument();
  });
});
