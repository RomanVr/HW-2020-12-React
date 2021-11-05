import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { withInput } from "@/HOC/withInput";
import { InputText } from "@/components";
import { actions, selectUserName } from "./loginRdx";
// import { loadStateFromLS_ActionCreator } from "@/modules/GameOfLife/gameRdx";
import { useAppDispatch, useAppSelector } from "@/rdx/hooks";

const params = {
  labelInput: "Name:",
  placeholderInput: "Enter your Name",
  minLengthInput: 4,
  maxLengthInput: 20,
  required: true,
};
const InputLoginWithInputText = withInput(InputText, params);

const paramsSubmit = {
  type: "submit",
  valueInput: "Sing In",
  nameInput: "ButtonSubmit",
  maxLengthInput: 40,
};
const ButtonSubmitWithInputText = withInput(InputText, paramsSubmit);

export const Login: React.FC = () => {
  const loginUserName = useAppSelector(selectUserName);
  console.log(`Login useAppSelector loginUserName: ${loginUserName}`);
  const [nameUser, setNameUser] = useState(loginUserName);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async (ev: React.FormEvent) => {
      console.log(`Login onSubmit nameUser: ${nameUser}`);
      ev.preventDefault();
      dispatch(actions.login(nameUser));
      // dispatch(loadStateFromLS_ActionCreator(nameUser));
      history.push(`/game`);
    },
    [nameUser]
  );

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
      data-testid="FormLogin"
    >
      <InputLoginWithInputText
        valueInput={nameUser}
        onChangeInput={setNameUser}
      />
      <ButtonSubmitWithInputText />
    </form>
  );
};
