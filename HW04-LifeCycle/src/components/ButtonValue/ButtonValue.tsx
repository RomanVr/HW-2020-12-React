import React from "react";

interface ButtonValueProp {
  value: string;
  handleClick: () => void;
}
export const ButtonValue: React.FC<ButtonValueProp> = ({
  value,
  handleClick,
}) => (
  <input
    data-testid="buttonValue"
    type="button"
    value={value}
    onClick={handleClick}
  />
);