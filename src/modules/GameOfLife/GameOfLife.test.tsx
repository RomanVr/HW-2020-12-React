import { store } from "@/rdx/store";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { GameOfLife } from "./GameOfLife";
import { size } from "./gameRdx";

describe("Test GameOfLife", () => {
  const mockDispatch = jest.fn();
  // mockDispatch.mockImplementation(() => console.log(`call mock dispatch`));
  const mockSelector = jest.fn();
  // mockSelector.mockImplementation((callback) => {
  //   console.log(`call mock selector`);
  //   return callback(store.getState());
  // });
  jest.mock("@/rdx/hooks", () => ({
    useAppDispatch: () => mockDispatch,
    useAppSelector: () => mockSelector,
  }));

  beforeEach(() => {
    render(
      <Provider store={store}>
        <GameOfLife />
      </Provider>
    );
  });

  it("Render GameOfLife", () => {
    const itemCellCount = size.x * size.y;
    // screen.debug();
    expect(screen.getByTestId("GameOfLife")).toBeInTheDocument();

    expect(screen.getByDisplayValue(size.y)).toBeInTheDocument();
    expect(screen.getByText("Game Of Life")).toBeInTheDocument();
    expect(screen.queryAllByTestId("items-field-item").length).toBe(
      itemCellCount
    );
    const buttonForm = screen.getByTestId("InputTextButtonSubmit");
    userEvent.click(buttonForm);
    // const elemCell = screen.getAllByTestId("items-field-item")[0];
    // userEvent.click(elemCell);
    // expect(mockDispatch).toBeCalled();
    // expect(mockSelector).toBeCalled();
  });
});
