import React from "react";
import { InputText } from "@/components";
import { withInput } from "@/HOC/withInput";

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
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
    }}
  >
    <h3>Hello, {nameUser}!</h3>
    <ButtonLoginWithInputText onClickInput={logoutClick} />
  </div>
);
