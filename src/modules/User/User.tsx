import React from "react";
import { InputText } from "@/components";
import { withInput } from "@/HOC/withInput";
import { ContainerFlexEnd } from "@/screen/ContainerFlexEnd";

const params = {
  type: "button",
  valueInput: "Logout",
  nameInput: "ButtonLogout",
};

const ButtonLoginWithInputText = withInput(InputText, params);

interface UserProps {
  logoutClick: () => void;
  nameUser: string;
}

export const User: React.FC<UserProps> = ({ logoutClick, nameUser }) => (
  <ContainerFlexEnd>
    <h3>Hello, {nameUser}!</h3>
    <ButtonLoginWithInputText onClickInput={logoutClick} />
  </ContainerFlexEnd>
);
