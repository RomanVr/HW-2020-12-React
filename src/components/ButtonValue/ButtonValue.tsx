import React from "react";

export interface ButtonValueProps {
  value: string;
  handleClick: () => void;
}
export const ButtonValue: React.FC<ButtonValueProps> = ({
  value,
  handleClick,
}) => (
  <input
    data-testid="buttonValue"
    type="button"
    value={value}
    onClick={handleClick}
    style={{ display: "inline-block" }}
  />
);
