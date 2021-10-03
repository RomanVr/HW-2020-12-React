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

interface DivFlexEndProps {
  children?: React.ReactElement[];
}

export const DivFlexEnd: React.FC<DivFlexEndProps> = ({
  children,
}): React.ReactElement => <DivItem>{children}</DivItem>;
