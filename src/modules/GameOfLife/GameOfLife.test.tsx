import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reduxReact from "react-redux";

import { GameOfLife } from "./GameOfLife";
import { size } from "./gameRdx";
import { actions } from "./gameRdx";
import { State } from "./dataTest";

describe("Test GameOfLife", () => {
  const mockState = State;

  const mockDispatchFn = jest.fn();
  const dispatchSpy = jest.spyOn(reduxReact, "useDispatch");
  dispatchSpy.mockReturnValue(mockDispatchFn);

  const selectorSpy = jest.spyOn(reduxReact, "useSelector");

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
    render(<GameOfLife />);
  });

  describe("test with default state", () => {
    beforeAll(() => {
      selectorSpy.mockImplementation((callback) => callback(mockState));
    });
    afterAll(() => {
      selectorSpy.mockClear();
    });

    it("Render GameOfLife", () => {
      const sizeX = mockState.gameData.fieldCurrent.length;
      const sizeY = mockState.gameData.fieldCurrent[0].length;
      const itemCellCount = sizeX * sizeY;
      expect(screen.getByTestId("GameOfLife")).toBeInTheDocument();

      expect(screen.getByDisplayValue(size.y)).toBeInTheDocument();
      expect(screen.getByText("Game Of Life")).toBeInTheDocument();
      expect(screen.queryAllByTestId("items-field-item").length).toBe(
        itemCellCount
      );

      expect(screen.queryByDisplayValue("Finish!!!")).not.toBeInTheDocument();

      const inputSpeed = screen.getByTestId("InputText");
      expect(inputSpeed.getAttribute("type")).toEqual("text");
      expect(inputSpeed.getAttribute("readonly")).toEqual("");
    });
    it("test click to resize field", () => {
      const buttonForm = screen.getByTestId("InputTextButtonSubmit");
      userEvent.click(buttonForm);
      expect(actionResizeField).toBeCalledWith({
        sizeX: size.x,
        sizeY: size.y,
      });
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

    it("test input to rdn out range", async () => {
      const inputRnd = screen.getByTestId("InputTextRnd");
      userEvent.clear(inputRnd);

      const rnd = "100";
      userEvent.type(inputRnd, rnd);
      expect(screen.queryByDisplayValue(rnd)).not.toBeInTheDocument();
      const rnd2 = "-1";
      userEvent.type(inputRnd, rnd2);
      expect(screen.queryByDisplayValue(rnd2)).not.toBeInTheDocument();
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
      const inputSpeed = screen.getByTestId("InputTextSpeed");
      expect(inputSpeed.getAttribute("value")).toEqual("1");
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
      expect(mockDispatchFn).toBeCalledWith({ type: "saveGame" });
    });

    it("test click to start / pause", async () => {
      const buttonStart = screen.getByDisplayValue("Start");
      userEvent.click(buttonStart);
      expect(actionStartGame).toBeCalledWith();
    });
  });

  describe("test after start", () => {
    const gameData = { ...mockState.gameData, start: true };
    beforeAll(() => {
      selectorSpy.mockImplementation((callback) => callback({ gameData }));
    });
    afterAll(() => {
      selectorSpy.mockClear();
    });

    it("test click to start / pause", async () => {
      const buttonStop = screen.getByDisplayValue("Stop");
      expect(buttonStop).toBeInTheDocument();
      userEvent.click(buttonStop);
      expect(actionPauseGame).toBeCalledWith();
    });
  });

  describe("test after finish", () => {
    const gameData = { ...mockState.gameData, start: true, finish: true };
    beforeAll(() => {
      selectorSpy.mockImplementation((callback) => callback({ gameData }));
    });
    afterAll(() => {
      selectorSpy.mockClear();
    });

    it("test finish", async () => {
      const inputFinish = screen.getByDisplayValue("Finish!!!");
      expect(inputFinish).toBeInTheDocument();
    });
  });
});
