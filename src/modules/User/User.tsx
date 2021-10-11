import React from "react";
import { InputText } from "@/components";
import { withInput } from "@/HOC/withInput";
import { logout } from "@/api/auth";
import { useHistory, useParams } from "react-router-dom";
import { ContainerFlexCenter } from "@/components/layout/ContainerFlexCenter";

const params = {
  type: "button",
  valueInput: "Logout",
  nameInput: "ButtonLogout",
};

const ButtonLoginWithInputText = withInput(InputText, params);

interface paramsType {
  name: string;
}

interface RawUserProps {
  onSubmitLogin: (nameUser: string) => void;
}

export const User: React.FC<RawUserProps> = ({ onSubmitLogin }) => {
  const history = useHistory();
  const { name } = useParams<paramsType>();

  const logoutClick = () => {
    logout();
    onSubmitLogin("");
    history.push("/");
  };

  return (
    <ContainerFlexCenter>
      <h3>Hello, {name}!</h3>
      <ButtonLoginWithInputText onClickInput={logoutClick} />
    </ContainerFlexCenter>
  );
};
