import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

const stylesSpan = css`
  color: red;
`;

const SpanItem = styled.span`
  ${stylesSpan}
`;

export const SpanError: React.FC = () => (
  <SpanItem data-testid="spanError">Please enter Number</SpanItem>
);
