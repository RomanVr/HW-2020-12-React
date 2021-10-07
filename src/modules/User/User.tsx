import React from "react";
import { InputText } from "@/components";
import { withInput } from "@/HOC/withInput";
import { ContainerFlexEnd } from "@/screen/ContainerFlexEnd";
import { RouteComponentProps } from "react-router";

const params = {
  type: "button",
  valueInput: "Logout",
  nameInput: "ButtonLogout",
};

const ButtonLoginWithInputText = withInput(InputText, params);

interface RouteParams {
  name: string;
}

export const User: React.FC<RouteComponentProps<RouteParams>> = (props) => {
  const logoutClick = () => {
    localStorage.removeItem("nameUser");
    props.history.push("/");
  };

  return (
    <ContainerFlexEnd>
      <h3>Hello, {props.match.params.name}!</h3>
      <ButtonLoginWithInputText onClickInput={logoutClick} />
    </ContainerFlexEnd>
  );
};
