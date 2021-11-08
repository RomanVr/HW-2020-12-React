import React from "react";
import { useHistory, useParams } from "react-router-dom";

import { InputText } from "@/components";
import { withInput } from "@/HOC/withInput";
import { ContainerFlexCenter } from "@/components/layout/ContainerFlexCenter";
import { actions } from "@/screens/Login/loginRdx";
import { actions as actionsGame } from "../GameOfLife/gameRdx";
import { useAppDispatch } from "@/rdx/hooks";

const params = {
  type: "button",
  valueInput: "Logout",
  nameInput: "ButtonLogout",
};

const ButtonLoginWithInputText = withInput(InputText, params);

interface paramsType {
  name: string;
}

export const User: React.FC = () => {
  const history = useHistory();
  const { name } = useParams<paramsType>();

  const dispatch = useAppDispatch();

  const logoutClick = () => {
    dispatch(actions.logout());
    dispatch(actionsGame.clearField());
    history.push("/");
  };

  return (
    <ContainerFlexCenter>
      <h3>Hello, {name}!</h3>
      <ButtonLoginWithInputText onClickInput={logoutClick} />
    </ContainerFlexCenter>
  );
};
