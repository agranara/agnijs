import * as React from 'react';

const SvgDoc = props => (
  <svg id={props.id} viewBox="0 0 385.87 512" width="1em" height="1em" {...props}>
    <defs>
      <style>
        {'.doc_svg__cls-1{fill:#351d00}.doc_svg__cls-3{fill:#0051cf}.doc_svg__cls-5{fill:#fff}'}
      </style>
    </defs>
    <path
      className="doc_svg__cls-1"
      d="M0 327.96h22.94v-30.11L0 327.96zM385.87 327.96h-22.93v-30.11l22.93 30.11z"
    />
    <path
      d="M224 .64l-116 116v376a20 20 0 0020 20h300a20 20 0 0020-20v-472a20 20 0 00-20-20z"
      transform="translate(-85.11 -.64)"
      fill="#0081cf"
    />
    <path className="doc_svg__cls-3" d="M340 327.96H0L22.94 430.6h340l22.93-102.64H340z" />
    <text
      transform="translate(54.05 419.23)"
      fill="#fff"
      fontSize={120}
      fontFamily="Calibri-Bold,Calibri"
      fontWeight={700}
      letterSpacing=".05em"
    >
      .DOC
    </text>
    <path
      className="doc_svg__cls-3"
      d="M224 .64l-116 116h96a20 20 0 0020-20z"
      transform="translate(-85.11 -.64)"
    />
    <rect className="doc_svg__cls-5" x={78.91} y={150.53} width={158.76} height={19.91} rx={6.32} />
    <rect className="doc_svg__cls-5" x={78.91} y={193.84} width={200.12} height={19.91} rx={7.09} />
    <rect className="doc_svg__cls-5" x={78.91} y={237.15} width={239.37} height={19.91} rx={7.76} />
  </svg>
);

export default SvgDoc;
