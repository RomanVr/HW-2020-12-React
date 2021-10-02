import { InputTextProps } from "@/components/InputText/InputText";
import React from "react";

export const withInput = (
  Component: React.FC<InputTextProps>,
  params?: InputTextProps
): React.FC<InputTextProps> => {
  const WithInput = (props: InputTextProps) => (
    <Component {...params} {...props} />
  );

  WithInput.displayName = `${Component.displayName}withInput`;
  return WithInput;
};
