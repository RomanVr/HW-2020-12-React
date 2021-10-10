import React from "react";
import { InputText } from "@/components";
import { withInput } from "@/HOC/withInput";
import { ContainerFlexEnd } from "@/components/layout/ContainerFlexEnd";
import { logout } from "@/api/auth";
// import { authorizedOnlyHoc } from "@/HOC/authorizedOnlyHoc";
import { useHistory, useParams } from "react-router-dom";

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

export const UserScreen: React.FC<RawUserProps> = ({ onSubmitLogin }) => {
  const history = useHistory();
  const { name } = useParams<paramsType>();

  const logoutClick = () => {
    logout();
    onSubmitLogin("");
    history.push("/");
  };

  return (
    <ContainerFlexEnd>
      <h3>Hello, {name}!</h3>
      <ButtonLoginWithInputText onClickInput={logoutClick} />
    </ContainerFlexEnd>
  );
};

// export const UserScreen = authorizedOnlyHoc(RawUser, "/login");
