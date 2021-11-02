import React, { ErrorInfo } from "react";
import { FormDataGame } from "@/modules/FormDataGame/FormDataGame";
import { withInput } from "@/HOC/withInput";
import { InputTime, Field, NameGame, SpanError, InputText } from "@/components";
import { ContainerFlexGame } from "@/components/layout/ContainerFlexGame";
import { ContainerFlexCenter } from "@/components/layout/ContainerFlexCenter";

const params = {
  readOnly: true,
  type: "text",
};

const paramsButton = {
  type: "button",
  nameInput: "Button",
};

const InputReadOnlyWithInputText = withInput(InputText, params);
const InputWithInputText = withInput(InputText);
const ButtonValueWithInputText = withInput(InputText, paramsButton);

interface GameOfLifeState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class GameOfLife extends React.Component<unknown, GameOfLifeState> {
  timerStep = 0;

  constructor(props: unknown) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleClickOnCell = this.handleClickOnCell.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickIncrement = this.handleClickIncrement.bind(this);
    this.handleClickDecrement = this.handleClickDecrement.bind(this);
    this.clearField = this.clearField.bind(this);
    this.handleOnChangeRnd = this.handleOnChangeRnd.bind(this);
    this.getRandomieDataField = this.getRandomieDataField.bind(this);
  }
  // // Clear Field
  // generateDataField(sizeX: number, sizeY: number): number[][] {
  //   return new Array(sizeX).fill(null).map(() => new Array(sizeY).fill(0));
  // }
  // // Click Cell
  // handleClickOnCell(x: number, y: number): void {
  //   const newFieldData = new Array(this.state.sizeX)
  //     .fill(null)
  //     .map((itemRow, indexRow) => [...this.state.fieldData[indexRow]]);
  //   newFieldData[x][y] = this.state.fieldData[x][y] ? 0 : 1;
  //   this.setState({ fieldData: newFieldData, isFinish: false });
  // }
  // // Resize field
  // setNewSizeFieldData(sizeX: number, sizeY: number): number[][] {
  //   const newFieldData = this.generateDataField(sizeX, sizeY);

  //   const stateSizeX: number = this.state.fieldData.length;
  //   const stateSizeY: number = this.state.fieldData[0].length;

  //   for (let i = 0; i < newFieldData.length; i += 1) {
  //     if (i > stateSizeX - 1) break;
  //     for (let j = 0; j < newFieldData[i].length; j += 1) {
  //       if (j > stateSizeY - 1) break;
  //       newFieldData[i][j] = this.state.fieldData[i][j];
  //     }
  //   }
  //   return newFieldData;
  // }
  // // Next step
  // nextStep(): void {
  //   this.fieldDataPrev2 = this.fieldDataPrev;
  //   this.fieldDataPrev = this.state.fieldData;
  //   const stateSizeX: number = this.state.fieldData.length;
  //   const stateSizeY: number = this.state.fieldData[0].length;
  //   const newFieldData = new Array(stateSizeX)
  //     .fill(null)
  //     .map(() => new Array(stateSizeY).fill(0));
  //   for (let i = 0; i < newFieldData.length; i += 1) {
  //     for (let j = 0; j < newFieldData[i].length; j += 1) {
  //       const countAround: number = this.getCountAround(i, j);
  //       const currentCell = Boolean(this.state.fieldData[i][j]);
  //       if (
  //         (!currentCell && countAround == 3) ||
  //         (currentCell && (countAround == 3 || countAround == 2))
  //       ) {
  //         newFieldData[i][j] = 1;
  //       } else if (currentCell && countAround != 3 && countAround != 2) {
  //         newFieldData[i][j] = 0;
  //       }
  //     }
  //   }
  //   if (this.isFinish(newFieldData)) {
  //     if (this.timerStep) {
  //       clearInterval(Number(this.timerStep));
  //       this.timerStep = 0;
  //     }
  //     this.setState({
  //       start: false,
  //       isFinish: true,
  //       buttonValue: "Start",
  //       fieldData: this.fieldDataPrev,
  //     });
  //   } else {
  //     this.setState({
  //       isFinish: false,
  //       fieldData: newFieldData,
  //       countStep: this.state.countStep + 1,
  //     });
  //   }
  // }

  // getCountAround(x: number, y: number): number {
  //   const coordX: number[] = [3];
  //   const coordY: number[] = [3];
  //   coordX[2] = x;
  //   coordY[2] = y;
  //   const stateSizeX: number = this.state.fieldData.length;
  //   const stateSizeY: number = this.state.fieldData[0].length;
  //   coordX[0] = x - 1 < 0 ? stateSizeX - 1 : x - 1; //sub
  //   coordX[1] = x + 1 == stateSizeX ? 0 : x + 1; //add
  //   coordY[0] = y - 1 < 0 ? stateSizeY - 1 : y - 1; //sub
  //   coordY[1] = y + 1 == stateSizeY ? 0 : y + 1; //add
  //   return (
  //     coordX.reduce(
  //       (accX, elemX) =>
  //         accX +
  //         coordY.reduce(
  //           (accY, elemY) => accY + this.state.fieldData[elemX][elemY],
  //           0
  //         ),
  //       0
  //     ) - this.state.fieldData[x][y]
  //   );
  // }
  // // Fill random field
  // getRandomieDataField(): void {
  //   const stateSizeX: number = this.state.sizeX;
  //   const stateSizeY: number = this.state.sizeY;
  //   const newFieldData = new Array(stateSizeX)
  //     .fill(null)
  //     .map(() => new Array(stateSizeY).fill(0));

  //   const rndCellOnY = (stateSizeY * this.state.rndRrate) / 100;
  //   let rndCounter = 0;
  //   const setElementJ: Set<number> = new Set([]);
  //   for (let i = 0; i < stateSizeX; i += 1) {
  //     while (rndCounter < rndCellOnY) {
  //       const j = Math.round(Math.random() * (stateSizeY + 1));
  //       if (!setElementJ.has(j) && j < stateSizeY) {
  //         setElementJ.add(j);
  //         rndCounter += 1;
  //         newFieldData[i][j] = 1;
  //       }
  //     }
  //     setElementJ.clear();
  //     rndCounter = 0;
  //   }

  //   this.setState({ fieldData: newFieldData });
  // }

  // handleOnChangeRnd(value: string): void {
  //   const rndRrate = Number(value);
  //   if (rndRrate >= 0 && rndRrate < 100) {
  //     this.setState({ rndRrate: rndRrate });
  //   }
  // }

  // isFinish(newFieldData: number[][]): boolean {
  //   const countLifeCell: number = newFieldData
  //     .flat()
  //     .reduce((acc, item) => acc + item, 0);
  //   if (countLifeCell == 0) return true;
  //   for (let i = 0; i < newFieldData.length; i += 1) {
  //     for (let j = 0; j < newFieldData[i].length; j += 1) {
  //       if (
  //         this.fieldDataPrev[i][j] != newFieldData[i][j] &&
  //         this.fieldDataPrev2[i][j] != newFieldData[i][j]
  //       ) {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // }

  // clearField(): void {
  //   if (this.timerStep) {
  //     clearInterval(Number(this.timerStep));
  //     this.timerStep = 0;
  //   }
  //   this.setState({
  //     start: false,
  //     isFinish: false,
  //     buttonValue: "Start",
  //     countStep: 0,
  //     fieldData: this.generateDataField(this.state.sizeX, this.state.sizeY),
  //   });
  // }

  // handleClickStart(): void {
  //   let newButtonValue = "";
  //   if (this.state.start) {
  //     newButtonValue = "Start";
  //     clearInterval(Number(this.timerStep));
  //     this.timerStep = 0;
  //   } else {
  //     newButtonValue = "Stop";
  //     this.timerStep = window.setInterval(
  //       () => this.nextStep(),
  //       this.state.velosity
  //     );
  //   }
  //   this.setState({
  //     isFinish: false,
  //     start: !this.state.start,
  //     buttonValue: newButtonValue,
  //   });
  // }

  // handleClickIncrement(): void {
  //   if (this.state.velosity > 100) {
  //     this.setState({ velosity: this.state.velosity - 100 });
  //     if (this.state.start) {
  //       clearInterval(Number(this.timerStep));
  //       this.timerStep = 0;
  //       this.timerStep = window.setInterval(
  //         () => this.nextStep(),
  //         this.state.velosity
  //       );
  //     }
  //   }
  // }

  // handleClickDecrement(): void {
  //   if (this.state.velosity < 2000) {
  //     this.setState({ velosity: this.state.velosity + 100 });
  //     if (this.state.start) {
  //       clearInterval(Number(this.timerStep));
  //       this.timerStep = 0;
  //       this.timerStep = window.setInterval(
  //         () => this.nextStep(),
  //         this.state.velosity
  //       );
  //     }
  //   }
  // }

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
      errorInfoElem = <SpanError />;
    }
    let inputTimeVar: React.ReactElement = <></>;
    if (this.state.start) {
      inputTimeVar = <InputTime />;
    }
    let inputFinish: React.ReactElement = <></>;
    if (this.state.isFinish) {
      inputFinish = <InputReadOnlyWithInputText valueInput="Finish!!!" />;
    }
    return (
      <ContainerFlexGame dataTestId="GameofLife">
        <NameGame />
        <ContainerFlexCenter>
          <FormDataGame
            onSubmit={this.onSubmit}
            errorInfoElem={errorInfoElem}
          />
          <ButtonValueWithInputText
            onClickInput={this.clearField}
            valueInput="Clear"
          />
          <InputWithInputText
            valueInput={String(this.state.rndRrate)}
            onChangeInput={this.handleOnChangeRnd}
          />
          <ButtonValueWithInputText
            onClickInput={this.getRandomieDataField}
            valueInput="Random Fill"
          />
        </ContainerFlexCenter>
        <Field
          fieldData={this.state.fieldData}
          handleClickOnCell={this.handleClickOnCell}
        />
        <ContainerFlexCenter>
          <ButtonValueWithInputText
            onClickInput={this.handleClickDecrement}
            valueInput="Damp"
          />
          <InputReadOnlyWithInputText
            valueInput={String(21 - this.state.velosity / 100)}
          />
          <ButtonValueWithInputText
            onClickInput={this.handleClickIncrement}
            valueInput="Rase"
          />
          <ButtonValueWithInputText
            onClickInput={() => this.nextStep()}
            valueInput="Step"
          />
          <InputReadOnlyWithInputText
            valueInput={String(this.state.countStep)}
          />
          <ButtonValueWithInputText
            valueInput={this.state.buttonValue}
            onClickInput={this.handleClickStart}
          />
          {inputTimeVar}
          {inputFinish}
        </ContainerFlexCenter>
      </ContainerFlexGame>
    );
  }
}
