import { css } from '@emotion/core';

export const absoluteFullStyle = css`
  position: absolute;
  width: 100%;
`;

export const columnStyle = css`
  box-sizing: content-box;
  display: block;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  float: left;
`;

export const contentTableStyle = css`
  position: relative;
  width: 100%;
  overflow: auto;
  outline: 0;
`;

export const cellStyle = css`
  position: absolute;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0px 4px;
`;
