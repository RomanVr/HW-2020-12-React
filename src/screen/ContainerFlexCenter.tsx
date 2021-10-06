import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const stylesDiv = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const DivItem = styled.div`
  ${stylesDiv}
`;

interface ContainerFlexCenterProps {
  children?: React.ReactNode;
  dataTestId?: string;
}

export const ContainerFlexCenter: React.FC<ContainerFlexCenterProps> = ({
  children,
  dataTestId,
}): React.ReactElement => (
  <DivItem data-testid={dataTestId}>{children}</DivItem>
);
