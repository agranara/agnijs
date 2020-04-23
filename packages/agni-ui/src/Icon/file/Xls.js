import * as React from 'react';

const SvgXls = props => (
  <svg id={props.id} viewBox="0 0 385.87 512" width="1em" height="1em" {...props}>
    <defs>
      <style>{'.xls_svg__cls-3{fill:#351d00}.xls_svg__cls-4{fill:#006a47}'}</style>
    </defs>
    <path
      d="M211.58.11l-116 116v376a20 20 0 0020 20h300a20 20 0 0020-20v-472a20 20 0 00-20-20z"
      transform="translate(-72.66 -.11)"
      fill="#00b423"
    />
    <path
      d="M176.43 135v158.21h182.68V135zm83.28 144.93h-67.84V245h67.84zm0-48.36h-67.84v-34.93h67.84zm0-48.35h-67.84v-34.94h67.84zm84 96.71h-67.88V245h67.83zm0-48.36h-67.88v-34.93h67.83zm0-48.35h-67.88v-34.94h67.83z"
      transform="translate(-72.66 -.11)"
      fill="#fff"
    />
    <path
      className="xls_svg__cls-3"
      d="M0 327.96h22.94v-30.11L0 327.96zM385.87 327.96h-22.93v-30.11l22.93 30.11z"
    />
    <path className="xls_svg__cls-4" d="M340 327.96H0L22.94 430.6h340l22.93-102.64H340z" />
    <text
      transform="translate(77.43 419.23)"
      fontSize={120}
      fontFamily="Calibri-Bold,Calibri"
      fontWeight={700}
      letterSpacing=".05em"
      fill="#fff"
    >
      .XLS
    </text>
    <path
      className="xls_svg__cls-4"
      d="M211.58.11l-116 116h96a20 20 0 0020-20z"
      transform="translate(-72.66 -.11)"
    />
  </svg>
);

export default SvgXls;
