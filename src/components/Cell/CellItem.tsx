import styled from "@emotion/styled";
import { css } from "@emotion/react";

const styleBaseCell = css`
  width: 15px;
  height: 15px;
  border: 1px solid black;
  border-radius: 1px;
  white-space: nowrap;
  display: flex;
  flex: 0 0 auto;
`;

const styleLiveCell = css`
  background: #29cf32;
`;

const styleDeadCell = css`
  background: #d8dedf;
`;

interface Props {
  isLive: boolean;
}

export const CellItem = styled.div<Props>`
  ${styleBaseCell};
  ${({ isLive }) => (isLive ? styleLiveCell : styleDeadCell)};
`;
