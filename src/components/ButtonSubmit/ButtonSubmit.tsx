import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";

const stylesSubmit = css`
  background: white;
  border: 1px solid grey;
  border-radius: 5px;
  width: 50px;
  height: 22px;
`;
const ButtonItem = styled.input`
  ${stylesSubmit}
`;

export const ButtonSubmit: React.FC = () => (
  <ButtonItem type="submit" value="Ok" data-testid="ButtonSubmit" />
);
