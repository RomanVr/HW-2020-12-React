import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export interface InputSizeProps {
  size: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  label: string;
}

const stylesLabel = css`
  /* display: "block-inline"; */
  background: gray;
  border: 1px solid black;
  border-radius: 5px;
  height: 30px;
`;
const LabelInput = styled.label`
  ${stylesLabel}
`;

const stylesInput = css`
  /* display: "block-inline"; */
  flex: auto;
  white-space: pre;
  background: white;
  border: 1px solid grey;
  border-radius: 5px;
  height: 10px;
  text-align: center;
  padding: 5px;
  min-width: 30px;
`;
interface Props {
  value: number | string;
}
const stylesWidthInput = (props: Props) => css`
  width: ${String(props.value).length * 8}px;
`;
const InputItem = styled.input`
  ${stylesInput};
  ${stylesWidthInput}
`;

export const InputSize: React.FC<InputSizeProps> = ({
  size,
  onChange,
  placeHolder,
  label,
}) => (
  <>
    <LabelInput>
      {label}
      <InputItem
        data-testid="inputSize"
        type="text"
        value={size}
        onChange={onChange}
        placeholder={placeHolder}
      ></InputItem>
    </LabelInput>
  </>
);
