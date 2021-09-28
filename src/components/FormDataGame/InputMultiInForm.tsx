import React from "react";
import { InputSize } from "../InputSize/InputSize";

interface InputMultiInFormProps {
  sizeState: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  label: string;
}

export const InputMultiInForm: React.FC<InputMultiInFormProps> = ({
  sizeState,
  onChange,
  placeHolder,
  label,
}) => (
  <InputSize
    size={sizeState}
    onChange={onChange}
    placeHolder={placeHolder}
    label={label}
  ></InputSize>
);
