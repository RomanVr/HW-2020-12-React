import React from "react";
import { InputText } from "@/components";
import { withInput } from "@/HOC/withInput";
import { useHistory, useParams } from "react-router-dom";
import { ContainerFlexCenter } from "@/components/layout/ContainerFlexCenter";
import { asyncAuthLocalStorage } from "@/api/authLocalStorage/auth";
import { useDispatch } from "react-redux";
import { logout } from "@/screens/Login/loginRdx";
import { clearField } from "../GameOfLife/gameRdx";

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

  const dispatch = useDispatch();

  const logoutClick = () => {
    asyncAuthLocalStorage.logout();
    dispatch(logout());
    dispatch(clearField());
    history.push("/");
  };

  return (
    <ContainerFlexCenter>
      <h3>Hello, {name}!</h3>
      <ButtonLoginWithInputText onClickInput={logoutClick} />
    </ContainerFlexCenter>
  );
};
