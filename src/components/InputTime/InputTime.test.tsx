import React from "react";
import { act, render, screen } from "@testing-library/react";
import { InputTime } from "./InputTime";

// const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));

describe("Test InputTime", () => {
  it("Render input for with value Time", async () => {
    jest.useFakeTimers();
    render(<InputTime />);

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByDisplayValue("00:00:01")).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(11000);
    });
    expect(screen.getByDisplayValue("00:00:12")).toBeInTheDocument();
  });
});
