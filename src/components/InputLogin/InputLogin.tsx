import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

const stylesInput = css`
  text-align: center;
`;

const InputItem = styled.input`
  ${stylesInput}
`;

interface InputLoginProps {
  nameUser: string;
  setNameUser: (name: string) => void;
}

export const InputLogin: React.FC<InputLoginProps> = ({
  nameUser,
  setNameUser,
}) => (
  <label>
    Name:
    <InputItem
      placeholder="Enter your Name"
      value={nameUser}
      minLength={4}
      maxLength={20}
      onChange={(ev) => setNameUser(ev.target.value)}
      data-testid="LoginInput"
    />
  </label>
);
