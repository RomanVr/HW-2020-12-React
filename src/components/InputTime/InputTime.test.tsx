import React from "react";
import { act, render, screen } from "@testing-library/react";
import { InputTime } from "./InputTime";

describe("Test InputTime", () => {
  it("Render input for with value Time", () => {
    jest.useFakeTimers();
    render(<InputTime />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByTestId("inputTime")).toBeInTheDocument();
  });
});
