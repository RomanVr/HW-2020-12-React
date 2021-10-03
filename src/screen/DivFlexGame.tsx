import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const stylesDiv = css`
  display: flex,
  flex-direction: column,
  align-items: center,
  justify-content: center,
`;
const DivItem = styled.div`
  ${stylesDiv}
`;

interface DivFlexGameProps {
  children?: React.ReactNode;
  dataTestId?: string;
}

export const DivFlexGame: React.FC<DivFlexGameProps> = ({
  children,
  dataTestId,
}): React.ReactElement => (
  <DivItem data-testid={dataTestId}>{children}</DivItem>
);
