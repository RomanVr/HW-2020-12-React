import React, { useState } from "react";
import { InputLogin } from "@/components";

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
    <form onSubmit={onSubmit} data-testid="FormLogin">
      <InputLogin nameUser={nameUser} setNameUser={setNameUser} />
    </form>
  );
};
