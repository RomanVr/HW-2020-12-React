import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

import { store } from "@/rdx/store";
import { GameOfLife } from "./GameOfLife";
import { size } from "./gameRdx";
import { actions } from "./gameRdx";

describe("Test GameOfLife", () => {
  // const mockDispatch = jest.fn();
  // mockDispatch.mockImplementation(() => console.log(`call mock dispatch`));
  // const mockSelector = jest.fn();
  // mockSelector.mockImplementation((callback) => {
  //   console.log(`call mock selector`);
  //   return callback(store.getState());
  // });
  // jest.mock("@/rdx/hooks", () => ({
  //   useAppDispatch: () => mockDispatch,
  //   useAppSelector: () => mockSelector,
  // }));

  const dispatchSpy = jest.spyOn(store, "dispatch");

  const actionResizeField = jest.spyOn(actions, "resizeField");
  const actionClickOnCell = jest.spyOn(actions, "clickOnCellAction");
  const actionFillRandomField = jest.spyOn(actions, "fillRandomField");
  const actionClearField = jest.spyOn(actions, "clearField");
  const actionDecVelosity = jest.spyOn(actions, "decVelosity");
  const actionIncVelosity = jest.spyOn(actions, "incVelosity");
  const actionNextStepAction = jest.spyOn(actions, "nextStepAction");
  const actionStartGame = jest.spyOn(actions, "startGame");
  const actionPauseGame = jest.spyOn(actions, "pauseGame");

  beforeEach(() => {
    render(
      <Provider store={store}>
        <GameOfLife />
      </Provider>
    );
  });

  it("Render GameOfLife", () => {
    const itemCellCount = size.x * size.y;
    expect(screen.getByTestId("GameOfLife")).toBeInTheDocument();

    expect(screen.getByDisplayValue(size.y)).toBeInTheDocument();
    expect(screen.getByText("Game Of Life")).toBeInTheDocument();
    expect(screen.queryAllByTestId("items-field-item").length).toBe(
      itemCellCount
    );

    // userEvent.click(elemCell);
    // expect(mockDispatch).toBeCalled();
    // expect(mockSelector).toBeCalled();
  });
  it("test click to resize field", () => {
    const buttonForm = screen.getByTestId("InputTextButtonSubmit");
    userEvent.click(buttonForm);
    expect(actionResizeField).toBeCalledWith({ sizeX: size.x, sizeY: size.y });
  });
  it("test click to rdn input", () => {
    const buttonRnd = screen.getByDisplayValue("Random Fill");
    const inputRnd = screen.getByTestId("InputTextRnd");
    userEvent.clear(inputRnd);

    const rnd = "22";
    userEvent.type(inputRnd, rnd);
    expect(screen.getByDisplayValue(rnd)).toBeInTheDocument();
    userEvent.click(buttonRnd);
    expect(actionFillRandomField).toBeCalledWith(Number(rnd));
  });

  it("test click to cell", () => {
    const elemCell = screen.getAllByTestId("items-field-item")[0];
    userEvent.click(elemCell);
    expect(actionClickOnCell).toBeCalledWith({ x: 0, y: 0 });
  });

  it("test click to clear", () => {
    const buttonClear = screen.getByDisplayValue("Clear");
    userEvent.click(buttonClear);
    expect(actionClearField).toBeCalledWith();
  });

  it("test click to dec", () => {
    const buttonDec = screen.getByDisplayValue("Damp");
    userEvent.click(buttonDec);
    expect(actionDecVelosity).toBeCalledWith();
  });

  it("test click to inc", () => {
    const buttonInc = screen.getByDisplayValue("Rase");
    userEvent.click(buttonInc);
    expect(actionIncVelosity).toBeCalledWith();
  });

  it("test click to next step", () => {
    const buttonStep = screen.getByDisplayValue("Step");
    userEvent.click(buttonStep);
    expect(actionNextStepAction).toBeCalledWith();
  });
  it("test click save data", () => {
    const buttonSave = screen.getByDisplayValue("Save data");
    userEvent.click(buttonSave);
    expect(dispatchSpy).toBeCalledWith({ type: "saveGame" });
  });

  it("test click to start / pause", async () => {
    const buttonStart = screen.getByDisplayValue("Start");
    await waitFor(
      () => {
        userEvent.click(buttonStart);
      },
      { timeout: 1000 }
    );
    expect(actionStartGame).toBeCalledWith();

    // expect(screen.getByDisplayValue("Stop")).toBeInTheDocument();
  });
});
