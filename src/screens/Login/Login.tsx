import React, { useCallback, useState } from "react";
import { withInput } from "@/HOC/withInput";
import { InputText } from "@/components";
import { useHistory } from "react-router-dom";
import { asyncAuthLocalStorage } from "@/api/authLocalStorage/auth";
import { useDispatch } from "react-redux";
import { login } from "./loginRdx";

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
  const [nameUser, setNameUser] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    async (ev: React.FormEvent) => {
      ev.preventDefault();
      await asyncAuthLocalStorage.login(nameUser);
      dispatch(login(nameUser));
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
