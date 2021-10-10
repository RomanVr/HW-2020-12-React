import React, { useState } from "react";
import { withInput } from "@/HOC/withInput";
import { InputText } from "@/components";
import { useHistory } from "react-router";
import { login } from "@/api/auth";

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

interface LoginProps {
  onSubmitLogin: (nameUser: string) => void;
}

const ButtonSubmitWithInputText = withInput(InputText, paramsSubmit);

export const Login: React.FC<LoginProps> = ({ onSubmitLogin }) => {
  const [nameUser, setNameUser] = useState("");
  const history = useHistory();

  const onSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();
    login(nameUser);
    onSubmitLogin(nameUser);
    history.push(`/`);
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
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
