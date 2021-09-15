import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

interface Props {
  value: number | string;
}
const stylesWidthInput = (props: Props) => css`
  width: ${String(props.value).length * 8 + 10}px;
  text-align: center;
`;
const InputItem = styled.input`
  ${stylesWidthInput}
`;

interface InputOnLengthProps {
  value: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  readonly?: boolean;
}

export const InputOnLength: React.FC<InputOnLengthProps> = ({
  value,
  onChange,
  placeHolder,
  readonly,
}) => (
  <InputItem
    type="text"
    value={value}
    placeholder={placeHolder}
    readOnly={readonly}
    onChange={onChange}
  />
);
