import React from "react";
import { InputText } from "@/components";
import { withInput } from "@/HOC/withInput";
import { ContainerFlexEnd } from "@/components/layout/ContainerFlexEnd";
import { RouteComponentProps } from "react-router";
import { logout } from "@/api/auth";
import { authorizedOnlyHoc } from "@/HOC/authorizedOnlyHoc";

const params = {
  type: "button",
  valueInput: "Logout",
  nameInput: "ButtonLogout",
};

const ButtonLoginWithInputText = withInput(InputText, params);

interface RouteParams {
  name: string;
}

const RawUser: React.FC<RouteComponentProps<RouteParams>> = (props) => {
  const logoutClick = () => {
    logout("nameUser");
    props.history.push("/");
  };

  return (
    <ContainerFlexEnd>
      <h3>Hello, {props.match.params.name}!</h3>
      <ButtonLoginWithInputText onClickInput={logoutClick} />
    </ContainerFlexEnd>
  );
};

export const UserScreen = authorizedOnlyHoc(RawUser, "/login");
