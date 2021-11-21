import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const stylesDiv = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const DivItem = styled.div`
  ${stylesDiv}
`;

interface ContainerFlexEndProps {
  children?: React.ReactNode;
}

export const ContainerFlexEnd: React.FC<ContainerFlexEndProps> = ({
  children,
}): React.ReactElement => <DivItem>{children}</DivItem>;
