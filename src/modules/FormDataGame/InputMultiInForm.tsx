import React from "react";
import { InputSize } from "@/components";

interface InputMultiInFormProps {
  sizeState: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  label: string;
  nameState: string;
}

export const InputMultiInForm: React.FC<InputMultiInFormProps> = ({
  sizeState,
  onChange,
  placeHolder,
  label,
  nameState,
}) => (
  <InputSize
    size={sizeState}
    onChange={onChange}
    placeHolder={placeHolder}
    label={label}
    nameState={nameState}
  ></InputSize>
);
