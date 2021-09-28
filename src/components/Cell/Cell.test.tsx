import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Cell } from "..";

describe("Cell render check", () => {
  it("Render Cell dead", () => {
    render(<Cell coordX={0} coordY={0} isLive={false} onClick={jest.fn()} />);
    expect(screen.getByTestId("items-field-item")).toBeInTheDocument();
  });

  it("Render Cell life", () => {
    render(<Cell coordX={0} coordY={0} isLive={true} onClick={jest.fn()} />);
    expect(screen.getByTestId("items-field-item")).toBeInTheDocument();
  });

  it("Click simulation", () => {
    const props = {
      coordX: 0,
      coordY: 0,
      isLive: true,
      onClick: jest.fn(),
    };
    render(<Cell {...props}></Cell>);
    const cellItem = screen.getByTestId("items-field-item");
    fireEvent.click(cellItem);
    expect(props.onClick).toBeCalled();
  });
});
