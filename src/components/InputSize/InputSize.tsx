import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

export interface InputSizeProps {
  size: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  label: string;
}

const stylesLabel = css`
  display: "block-inline",
  background: "gray",
  border: "1px solid black",
  borderRadius: "5px",
  height: "30px",
`;
const LabelInput = styled.label`
  ${stylesLabel}
`;

const stylesInput = css`
  background: "white",
  border: "1px solid grey",
  borderRadius: "5px",
  height: "30px",
`;
const InputItem = styled.input`
  ${stylesInput}
`;

export const InputSize: React.FC<InputSizeProps> = ({
  size,
  onChange,
  placeHolder,
  label,
}) => (
  <>
    <LabelInput>{label}</LabelInput>
    <InputItem
      data-testid="inputSize"
      type="text"
      value={size}
      onChange={onChange}
      placeholder={placeHolder}
    ></InputItem>
  </>
);
