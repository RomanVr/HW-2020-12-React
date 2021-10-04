import React, { useState } from "react";
import { withInput } from "@/HOC/withInput";
import { InputText } from "@/components";

const params = {
  labelInput: "Name:",
  placeholderInput: "Enter your Name",
  minLengthInput: 4,
  maxLengthInput: 20,
};

const InputLoginWithInputText = withInput(InputText, params);

interface LoginProps {
  onLogin: (nameUser: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [nameUser, setNameUser] = useState("");
  const onSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();
    onLogin(nameUser);
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
    </form>
  );
};
