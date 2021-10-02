import React, { FormEvent } from "react";
import { InputText } from "@/components";
import { withInput } from "@/HOC/withInput";

const params = {
  type: "text",
};

const InputSizeWithInputText = withInput(InputText, params);

interface InputMultiInFormProps {
  sizeState: string;
  onChange: (
    value: string,
    ev: FormEvent<HTMLInputElement> | undefined
  ) => void;
  placeHolder: string;
  label: string;
  nameState: string;
}

export const InputMultiInForm: React.FC<InputMultiInFormProps> = ({
  sizeState,
  onChange,
  label,
  nameState,
}) => (
  <InputSizeWithInputText
    valueInput={sizeState}
    onChangeInput={onChange}
    labelInput={label}
    nameInput={nameState}
  />
);
