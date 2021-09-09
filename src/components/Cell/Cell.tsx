import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

export interface CellProps {
  coordX: number;
  coordY: number;
  getCoordsClick: (x: number, y: number) => void;
}

const styleBaseCell = css`
  background: #95d7f1;
  width: 10px;
  height: 10px;
  border: 1px solid black;
  border-radius: 1px;
  display: table-cell;
`;

const CellItem = styled.div`
  ${styleBaseCell};
`;

export const Cell: React.FC<CellProps> = ({
  coordX,
  coordY,
  getCoordsClick,
}) => (
  <CellItem
    data-testid="items-field-item"
    onClick={() => getCoordsClick(coordX, coordY)}
  ></CellItem>
);
