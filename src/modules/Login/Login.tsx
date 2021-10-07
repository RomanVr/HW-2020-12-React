import React, { useEffect, useState } from "react";
import { withInput } from "@/HOC/withInput";
import { InputText } from "@/components";
import { useHistory } from "react-router";

const params = {
  labelInput: "Name:",
  placeholderInput: "Enter your Name",
  minLengthInput: 4,
  maxLengthInput: 20,
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

  useEffect(() => {
    setNameUser(localStorage.getItem("nameUser") || "");
  }, []);

  const onSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();
    localStorage.setItem("nameUser", nameUser);
    history.push(`/user/${nameUser}`);
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
