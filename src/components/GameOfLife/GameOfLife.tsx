import React, { ErrorInfo } from "react";

import { FormDataGame, InputOnLength, InputTime } from "..";
import { Field } from "..";
import { ButtonValue } from "../ButtonValue/ButtonValue";

interface GameOfLifeState {
  sizeX: number;
  sizeY: number;
  fieldData: number[][];

  start: boolean;
  isFinish: boolean;
  buttonValue: string;
  countStep: number;
  velosity: number;
  rndRrate: number;

  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class GameOfLife extends React.Component<unknown, GameOfLifeState> {
  // eslint-disable-next-line no-undef
  timerStep?: NodeJS.Timeout;
  fieldDataPrev: number[][];
  fieldDataPrev2: number[][];

  constructor(props: never) {
    super(props);
    this.state = {
      sizeX: 10,
      sizeY: 10,
      fieldData: this.generateDataField(10, 10),

      start: false,
      isFinish: false,
      buttonValue: "Start",
      countStep: 0,
      velosity: 1000,
      rndRrate: 20,

      error: null,
      errorInfo: null,
    };
    this.fieldDataPrev = this.generateDataField(20, 30);
    this.fieldDataPrev2 = this.generateDataField(20, 30);
    this.fieldDataPrev2[0][0] = 1;
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClickOnCell = this.handleClickOnCell.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickIncrement = this.handleClickIncrement.bind(this);
    this.handleClickDecrement = this.handleClickDecrement.bind(this);
    this.clearField = this.clearField.bind(this);
    this.handleOnChangeRnd = this.handleOnChangeRnd.bind(this);
    this.getRandomieDataField = this.getRandomieDataField.bind(this);
  }

  generateDataField(sizeX: number, sizeY: number): number[][] {
    return new Array(sizeX).fill(null).map(() => new Array(sizeY).fill(0));
  }

  handleClickOnCell(x: number, y: number): void {
    const newFieldData = new Array(this.state.sizeX)
      .fill(null)
      .map((itemRow, indexRow) => [...this.state.fieldData[indexRow]]);
    newFieldData[x][y] = this.state.fieldData[x][y] ? 0 : 1;
    this.setState({ fieldData: newFieldData, isFinish: false });
  }

  setNewSizeFieldData(sizeX: number, sizeY: number): number[][] {
    const newFieldData = this.generateDataField(sizeX, sizeY);

    const stateSizeX: number = this.state.fieldData.length;
    const stateSizeY: number = this.state.fieldData[0].length;

    for (let i = 0; i < newFieldData.length; i += 1) {
      if (i > stateSizeX - 1) break;
      for (let j = 0; j < newFieldData[i].length; j += 1) {
        if (j > stateSizeY - 1) break;
        newFieldData[i][j] = this.state.fieldData[i][j];
      }
    }
    return newFieldData;
  }

  nextStep(): void {
    this.fieldDataPrev2 = this.fieldDataPrev;
    this.fieldDataPrev = this.state.fieldData;
    const stateSizeX: number = this.state.fieldData.length;
    const stateSizeY: number = this.state.fieldData[0].length;
    const newFieldData = new Array(stateSizeX)
      .fill(null)
      .map(() => new Array(stateSizeY).fill(0));
    for (let i = 0; i < newFieldData.length; i += 1) {
      for (let j = 0; j < newFieldData[i].length; j += 1) {
        const countAround: number = this.getCountAround(i, j);
        const currentCell = Boolean(this.state.fieldData[i][j]);
        if (!currentCell && countAround == 3) {
          newFieldData[i][j] = 1;
        } else if (currentCell && countAround != 3 && countAround != 2) {
          newFieldData[i][j] = 0;
        } else if (currentCell && (countAround == 3 || countAround == 2)) {
          newFieldData[i][j] = 1;
        }
      }
    }
    if (this.isFinish(newFieldData)) {
      if (this.timerStep) {
        clearInterval(Number(this.timerStep));
        this.timerStep = undefined;
      }
      this.setState({
        start: false,
        isFinish: true,
        buttonValue: "Start",
        fieldData: this.fieldDataPrev,
      });
    } else {
      this.setState({
        isFinish: false,
        fieldData: newFieldData,
        countStep: this.state.countStep + 1,
      });
    }
  }

  getCountAround(x: number, y: number): number {
    const stateSizeX: number = this.state.fieldData.length;
    const stateSizeY: number = this.state.fieldData[0].length;
    const coordXSub = x - 1 < 0 ? stateSizeX - 1 : x - 1;
    const coordYSub = y - 1 < 0 ? stateSizeY - 1 : y - 1;
    const coordXAdd = x + 1 == stateSizeX ? 0 : x + 1;
    const coordYAdd = y + 1 == stateSizeY ? 0 : y + 1;
    const number1: number = this.state.fieldData[coordXSub][coordYSub];
    const number2: number = this.state.fieldData[coordXSub][y];
    const number3: number = this.state.fieldData[x][coordYSub];
    const number4: number = this.state.fieldData[coordXAdd][y];
    const number5: number = this.state.fieldData[coordXAdd][coordYAdd];
    const number6: number = this.state.fieldData[x][coordYAdd];
    const number7: number = this.state.fieldData[coordXAdd][coordYSub];
    const number8: number = this.state.fieldData[coordXSub][coordYAdd];

    const summ: number =
      number1 +
      number2 +
      number3 +
      number4 +
      number5 +
      number6 +
      number7 +
      number8;
    return summ;
  }

  getRandomieDataField(): void {
    // console.log(`Randomize`);
    const stateSizeX: number = this.state.fieldData.length;
    const stateSizeY: number = this.state.fieldData[0].length;
    const newFieldData = new Array(stateSizeX)
      .fill(null)
      .map(() => new Array(stateSizeY).fill(0));

    const rndCellOnY = (stateSizeY * this.state.rndRrate) / 100;
    let rndCounter = 0;
    const setElementJ: Set<number> = new Set([]);
    for (let i = 0; i < newFieldData.length; i += 1) {
      while (rndCounter < rndCellOnY) {
        const j = Math.round(Math.random() * (stateSizeY + 1));
        if (!setElementJ.has(j)) {
          setElementJ.add(j);
          rndCounter += 1;
          newFieldData[i][j] = 1;
        }
      }
      setElementJ.clear();
      rndCounter = 0;
    }

    this.setState({ fieldData: newFieldData });
  }

  handleOnChangeRnd(ev: React.ChangeEvent<HTMLInputElement>): void {
    const rndRrate = Number(ev.target.value);
    if (rndRrate >= 0 && rndRrate < 100) {
      this.setState({ rndRrate: rndRrate });
    }
  }

  isFinish(newFieldData: number[][]): boolean {
    const countLifeCell: number = newFieldData
      .flat()
      .reduce((acc, item) => acc + item, 0);
    if (countLifeCell == 0) return true;
    for (let i = 0; i < newFieldData.length; i += 1) {
      for (let j = 0; j < newFieldData[i].length; j += 1) {
        if (
          this.fieldDataPrev[i][j] != newFieldData[i][j] &&
          this.fieldDataPrev2[i][j] != newFieldData[i][j]
        ) {
          return false;
        }
      }
    }
    return true;
  }

  clearField(): void {
    if (this.timerStep) {
      clearInterval(Number(this.timerStep));
      this.timerStep = undefined;
    }
    this.setState({
      start: false,
      isFinish: false,
      buttonValue: "Start",
      countStep: 0,
      fieldData: this.generateDataField(this.state.sizeX, this.state.sizeY),
    });
  }

  handleClickStart(): void {
    let newButtonValue = "";
    if (this.state.start) {
      newButtonValue = "Start";
      clearInterval(Number(this.timerStep));
      this.timerStep = undefined;
    } else {
      newButtonValue = "Stop";
      this.timerStep = setInterval(() => this.nextStep(), this.state.velosity);
    }
    this.setState({
      isFinish: false,
      start: !this.state.start,
      buttonValue: newButtonValue,
    });
  }

  handleClickIncrement(): void {
    if (this.state.velosity > 100) {
      this.setState({ velosity: this.state.velosity - 100 });
      if (this.state.start) {
        clearInterval(Number(this.timerStep));
        this.timerStep = undefined;
        this.timerStep = setInterval(
          () => this.nextStep(),
          this.state.velosity
        );
      }
    }
  }

  handleClickDecrement(): void {
    if (this.state.velosity < 2000) {
      this.setState({ velosity: this.state.velosity + 100 });
      if (this.state.start) {
        clearInterval(Number(this.timerStep));
        this.timerStep = undefined;
        this.timerStep = setInterval(
          () => this.nextStep(),
          this.state.velosity
        );
      }
    }
  }

  onSubmit(sizeX: number, sizeY: number): void {
    const newFieldData: number[][] = this.setNewSizeFieldData(sizeX, sizeY);
    this.setState({ sizeX, sizeY, fieldData: newFieldData });
    if (this.state.errorInfo) {
      this.setState({ errorInfo: null });
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
  }

  render(): React.ReactElement {
    let errorInfoElem: React.ReactElement = <></>;
    if (this.state.errorInfo) {
      errorInfoElem = (
        <span data-testid="spanError" style={{ color: "red" }}>
          Please enter Number
        </span>
      );
    }
    let inputTimeVar: React.ReactElement = <></>;
    if (this.state.start) {
      inputTimeVar = <InputTime />;
    }
    let inputFinish: React.ReactElement = <></>;
    if (this.state.isFinish) {
      inputFinish = (
        <input
          value="Finish!!!"
          readOnly
          type="text"
          style={{
            width: "Finish!!!".length * 7 + 10,
            textAlign: "center",
          }}
        />
      );
    }
    return (
      <div
        data-testid="GameofLife"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <h2>Game Of Life</h2>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <FormDataGame
            onSubmit={this.onSubmit}
            errorInfoElem={errorInfoElem}
          />
          <ButtonValue handleClick={this.clearField} value="Clear" />
          <InputOnLength
            value={this.state.rndRrate}
            onChange={this.handleOnChangeRnd}
          />
          <ButtonValue
            handleClick={this.getRandomieDataField}
            value="Randomize"
          />
        </div>
        <Field
          fieldData={this.state.fieldData}
          handleClickOnCell={this.handleClickOnCell}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button onClick={this.handleClickDecrement}> Damp</button>
          <InputOnLength readOnly value={21 - this.state.velosity / 100} />
          <button onClick={this.handleClickIncrement}> Rase </button>
          <ButtonValue handleClick={() => this.nextStep()} value="Step" />
          <InputOnLength value={this.state.countStep} readOnly />
          <ButtonValue
            value={this.state.buttonValue}
            handleClick={this.handleClickStart}
          />
          {inputTimeVar}
          {inputFinish}
        </div>
      </div>
    );
  }
}
