import React, { ErrorInfo } from "react";

import { FormDataGame, InputTime } from "..";
import { Field } from "..";
import { ButtonValue } from "../ButtonValue/ButtonValue";

interface AppState {
  sizeX: number;
  sizeY: number;
  fieldData: number[][];

  start: boolean;
  buttonValue: string;
  countStep: number;
  velosity: number;

  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class AppGameOfLife extends React.Component<unknown, AppState> {
  IMAGE_ID_DEFAULT?: number;
  INTERVAL_TIME?: number;
  // eslint-disable-next-line no-undef
  timerStep?: NodeJS.Timeout;

  constructor(props: never) {
    super(props);
    this.state = {
      sizeX: 20,
      sizeY: 30,
      fieldData: this.generateDataField(20, 30),

      start: false,
      buttonValue: "Start",
      countStep: 0,
      velosity: 1000,

      error: null,
      errorInfo: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClickOnCell = this.handleClickOnCell.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickIncrement = this.handleClickIncrement.bind(this);
    this.handleClickDecrement = this.handleClickDecrement.bind(this);
  }

  generateDataField(sizeX: number, sizeY: number): number[][] {
    console.log(`generateDataField: sizeX - ${sizeX}, sizeY - ${sizeY}`);
    return new Array(sizeX).fill(null).map(() => new Array(sizeY).fill(0));
  }

  handleClickOnCell(x: number, y: number): void {
    console.log(`data-key: ${x},  ${y}`);
    // console.log(`array fieldData : ${this.state.fieldData}`);
    console.log(`array fieldData[x][y] : ${this.state.fieldData[x][y]}`);
    const newFieldData = new Array(this.state.sizeX)
      .fill(null)
      .map((itemRow, indexRow) => [...this.state.fieldData[indexRow]]);
    newFieldData[x][y] = this.state.fieldData[x][y] ? 0 : 1;
    this.setState({ fieldData: newFieldData });
  }

  setNewSizeFieldData(sizeX: number, sizeY: number): number[][] {
    console.log(`Props: prop X - ${sizeX},  prop Y - ${sizeY}`);
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
    console.log(`Step `);
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
    this.setState({
      fieldData: newFieldData,
      countStep: this.state.countStep + 1,
    });
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
      start: !this.state.start,
      buttonValue: newButtonValue,
      countStep: 0,
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
    return (
      <>
        <button onClick={this.handleClickDecrement}> - </button>
        <input readOnly type="text" value={21 - this.state.velosity / 100} />
        <button onClick={this.handleClickIncrement}> + </button>
        {inputTimeVar}
        <ButtonValue
          value={this.state.buttonValue}
          handleClick={this.handleClickStart}
        />
        <ButtonValue handleClick={() => this.nextStep()} value="Step" />
        <input value={this.state.countStep} readOnly type="text" />
        <br />
        <FormDataGame onSubmit={this.onSubmit} errorInfoElem={errorInfoElem} />
        <Field
          fieldData={this.state.fieldData}
          handleClickOnCell={this.handleClickOnCell}
        />
      </>
    );
  }
}
