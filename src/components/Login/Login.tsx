import React, { useState } from "react";

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
      <label>
        Name:
        <input
          placeholder="Enter your Name"
          value={nameUser}
          minLength={4}
          maxLength={20}
          onChange={(ev) => setNameUser(ev.target.value)}
          data-testid="LoginInput"
        />
      </label>
    </form>
  );
};
