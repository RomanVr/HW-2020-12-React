import React, { FormEvent } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface Props {
  value?: number | string;
  maxLength?: number;
}

const stylesInput = (props: Props) => css`
  width: ${!props.maxLength && String(props.value).length * 9 + 10}px;
  text-align: center;
`;

const InputItem = styled.input`
  ${stylesInput}
`;

const stylesLabel = css`
  display: flex;
  align-self: center;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  justify-self: center;
  text-align: center;
`;

const LabelItem = styled.label`
  ${stylesLabel}
`;

export interface InputTextProps {
  valueInput?: string;
  onChangeInput?: (
    name: string,
    ev: FormEvent<HTMLInputElement> | undefined
  ) => void;
  onClickInput?: () => void;
  labelInput?: string;
  placeholderInput?: string;
  minLengthInput?: number;
  maxLengthInput?: number;
  readOnly?: boolean;
  nameInput?: string;
  type?: string;
}

export const InputText: React.FC<InputTextProps> = ({
  valueInput,
  onChangeInput,
  onClickInput,
  labelInput,
  placeholderInput,
  minLengthInput,
  maxLengthInput,
  readOnly,
  nameInput,
  type,
}) => (
  <LabelItem>
    {labelInput}
    <InputItem
      placeholder={placeholderInput}
      value={valueInput}
      readOnly={readOnly}
      minLength={minLengthInput}
      maxLength={maxLengthInput}
      onChange={(ev) => onChangeInput && onChangeInput(ev.target.value, ev)}
      onClick={onClickInput}
      name={nameInput}
      data-testid={`InputText${nameInput ? nameInput : ""}`} // заменить в тестах id
      type={type}
    />
  </LabelItem>
);
