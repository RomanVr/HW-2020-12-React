import React, { useEffect, useState } from "react";
import { FormDataGame } from "@/modules/FormDataGame/FormDataGame";
import { withInput } from "@/HOC/withInput";
import { InputTime, Field, NameGame, InputText } from "@/components";
import { ContainerFlexGame } from "@/components/layout/ContainerFlexGame";
import { ContainerFlexCenter } from "@/components/layout/ContainerFlexCenter";
import { useAppDispatch, useAppSelector } from "@/rdx/hooks";
import {
  clearField,
  clickOnCellAction,
  decVelosity,
  fillRandomField,
  incVelosity,
  nextStepAction,
  pauseGame,
  resizeField,
  selectCountStep,
  selectField,
  selectFinish,
  selectSpeed,
  selectStart,
  startGameActionCreator,
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

export const GameOfLife: React.FC = (): React.ReactElement => {
  const [gameRnd, setRnd] = useState(30);
  const [timerStep, setTimer] = useState(0);
  const [buttonValue, setButtonValue] = useState(START);
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
    if (gameFinish && timerStep) {
      dispatch(pauseGame(timerStep));
    }
  }, [gameStep, gameStart]);

  function getSizeXY(sizeX: number, sizeY: number): void {
    dispatch(resizeField({ sizeX, sizeY }));
  }

  function handleOnChangeRnd(value: string): void {
    const rnd = Number(value);
    if (rnd >= 0 && rnd < 100) {
      setRnd(rnd);
    }
  }

  function onClickStartPause(): void {
    if (gameStart) {
      dispatch(pauseGame(timerStep));
    } else {
      dispatch(startGameActionCreator(setTimer));
    }
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
    <ContainerFlexGame dataTestId="GameofLife">
      <NameGame />
      <ContainerFlexCenter>
        <FormDataGame getSizeXY={getSizeXY} />
        <ButtonValueWithInputText
          onClickInput={() => {
            dispatch(clearField(timerStep));
          }}
          valueInput="Clear"
        />
        <InputWithInputText
          valueInput={String(gameRnd)}
          onChangeInput={handleOnChangeRnd}
        />
        <ButtonValueWithInputText
          onClickInput={() => {
            dispatch(fillRandomField(gameRnd));
          }}
          valueInput="Random Fill"
        />
      </ContainerFlexCenter>
      <Field
        fieldData={gameField}
        handleClickOnCell={(x, y) => {
          dispatch(clickOnCellAction({ x, y }));
        }}
      />
      <ContainerFlexCenter>
        <ButtonValueWithInputText
          onClickInput={() => {
            dispatch(decVelosity());
          }}
          valueInput="Damp"
        />
        <InputReadOnlyWithInputText valueInput={gameSpeed.toPrecision(2)} />
        <ButtonValueWithInputText
          onClickInput={() => {
            dispatch(incVelosity());
          }}
          valueInput="Rase"
        />
        <ButtonValueWithInputText
          onClickInput={() => {
            dispatch(nextStepAction());
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
