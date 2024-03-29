import React from "react";

export interface InputSizeProps {
  size: string;
  handleChangeSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const stylesLabel = {
  display: "block-inline",
  background: "gray",
  border: "1px solid black",
  borderRadius: "5px",
  height: "30px",
};

const stylesInput = {
  background: "white",
  border: "1px solid grey",
  borderRadius: "5px",
  height: "30px",
};

export const InputSize: React.FC<InputSizeProps> = ({
  size,
  handleChangeSize,
}) => (
  <>
    <label style={stylesLabel}>Введите размер поля:</label>
    <br></br>
    <input
      data-testid="inputSize"
      style={stylesInput}
      type="text"
      value={size}
      onChange={handleChangeSize}
      placeholder="Enter size"
    ></input>
  </>
);
