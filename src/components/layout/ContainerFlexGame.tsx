import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const stylesDiv = css`
  display: flex;
  flex-wrap: wrap;
  min-width: fit-content;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background: #00d8fb26;
`;
const DivItem = styled.div`
  ${stylesDiv}
`;

interface ContainerFlexGameProps {
  children?: React.ReactNode;
  dataTestId?: string;
}

export const ContainerFlexGame: React.FC<ContainerFlexGameProps> = ({
  children,
  dataTestId,
}): React.ReactElement => (
  <DivItem data-testid={dataTestId}>{children}</DivItem>
);
