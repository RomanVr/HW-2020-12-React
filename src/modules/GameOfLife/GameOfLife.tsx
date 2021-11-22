import React, { useEffect, useState } from "react";
import { FormDataGame } from "@/modules/FormDataGame/FormDataGame";
import { withInput } from "@/HOC/withInput";
import { InputTime, Field, NameGame, InputText } from "@/components";
import { ContainerFlexGame } from "@/components/layout/ContainerFlexGame";
import { ContainerFlexCenter } from "@/components/layout/ContainerFlexCenter";
import { useAppDispatch, useAppSelector } from "@/rdx/hooks";
import {
  actions,
  selectCountStep,
  selectField,
  selectFinish,
  selectSpeed,
  selectStart,
} from "./gameRdx";

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

const START = "Start";
const STOP = "Stop";

export const saveDataButton = {
  buttonNorm: "Save data",
  buttonPending: "saving...",
};

export const GameOfLife: React.FC = (): React.ReactElement => {
  const [gameRnd, setRnd] = useState(30);
  const [buttonValue, setButtonValue] = useState(START);
  const [saveData, setSaveDataButton] = useState(saveDataButton.buttonNorm);
  const dispatch = useAppDispatch();

  const gameStart = useAppSelector(selectStart);
  const gameFinish = useAppSelector(selectFinish);
  const gameField = useAppSelector(selectField);
  const gameStep = useAppSelector(selectCountStep);
  const gameSpeed = useAppSelector(selectSpeed);

  useEffect(() => {
    if (gameStart) {
      setButtonValue(STOP);
    } else {
      setButtonValue(START);
    }
    if (gameFinish) {
      dispatch(actions.pauseGame());
    }
  }, [gameStart, gameFinish]);

  function getSizeXY(sizeX: number, sizeY: number): void {
    console.log(`call getSizeXY ${sizeX} : ${sizeY}`);
    dispatch(actions.resizeField({ sizeX, sizeY }));
  }

  function handleOnChangeRnd(value: string): void {
    const rnd = Number(value);
    if (rnd >= 0 && rnd < 100) {
      setRnd(rnd);
    }
  }

  function onClickStartPause(): void {
    if (gameStart) {
      dispatch(actions.pauseGame());
    } else {
      dispatch(actions.startGame());
    }
  }

  function onClickSaveData(): void {
    setSaveDataButton(saveDataButton.buttonPending);
    dispatch({ type: "saveGame" });
    setSaveDataButton(saveDataButton.buttonNorm);
  }

  function toPrecision(value: number, pr = 2): string {
    return (Math.round(value * Math.pow(10, pr)) / Math.pow(10, pr)).toString();
  }

  let inputTimeVar: React.ReactElement = <></>;
  if (gameStart) {
    inputTimeVar = <InputTime />;
  }
  let inputFinish: React.ReactElement = <></>;
  if (gameFinish) {
    inputFinish = <InputReadOnlyWithInputText valueInput="Finish!!!" />;
  }
  return (
    <ContainerFlexGame dataTestId="GameOfLife">
      <NameGame />
      <ContainerFlexCenter>
        <FormDataGame getSizeXY={getSizeXY} />
        <ButtonValueWithInputText
          onClickInput={() => {
            dispatch(actions.clearField());
          }}
          valueInput="Clear"
        />
        <InputWithInputText
          valueInput={String(gameRnd)}
          onChangeInput={handleOnChangeRnd}
        />
        <ButtonValueWithInputText
          onClickInput={() => {
            dispatch(actions.fillRandomField(gameRnd));
          }}
          valueInput="Random Fill"
        />
        <ButtonValueWithInputText
          valueInput={saveData}
          onClickInput={() => {
            onClickSaveData();
          }}
        />
      </ContainerFlexCenter>
      <Field
        fieldData={gameField}
        handleClickOnCell={(x, y) => {
          dispatch(actions.clickOnCellAction({ x, y }));
        }}
      />
      <ContainerFlexCenter>
        <ButtonValueWithInputText
          onClickInput={() => {
            dispatch(actions.decVelosity());
          }}
          valueInput="Damp"
        />
        <InputReadOnlyWithInputText valueInput={toPrecision(gameSpeed)} />
        <ButtonValueWithInputText
          onClickInput={() => {
            dispatch(actions.incVelosity());
          }}
          valueInput="Rase"
        />
        <ButtonValueWithInputText
          onClickInput={() => {
            dispatch(actions.nextStepAction());
          }}
          valueInput="Step"
        />
        <InputReadOnlyWithInputText valueInput={String(gameStep)} />
        <ButtonValueWithInputText
          valueInput={buttonValue}
          onClickInput={() => {
            onClickStartPause();
          }}
        />
        {inputTimeVar}
        {inputFinish}
      </ContainerFlexCenter>
    </ContainerFlexGame>
  );
};
