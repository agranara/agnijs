import * as React from 'react';

const SvgPdf = props => (
  <svg id={props.id} viewBox="0 0 385.87 517" width="1em" height="1em" {...props}>
    <defs>
      <style>{'.pdf_svg__cls-1{fill:#351d00}.pdf_svg__cls-3{fill:#b40019}'}</style>
    </defs>
    <path
      className="pdf_svg__cls-1"
      d="M0 330.46h22.94v-30.11L0 330.46zM385.87 330.46h-22.93v-30.11l22.93 30.11z"
    />
    <path
      d="M138.92 2.5l-116 116v376a20 20 0 0020 20h300a20 20 0 0020-20v-472a20 20 0 00-20-20z"
      stroke="#b40019"
      strokeMiterlimit={10}
      strokeWidth={5}
      fill="#fff"
    />
    <path className="pdf_svg__cls-3" d="M340 330.46H0L22.94 433.1h340l22.93-102.64H340z" />
    <text
      transform="translate(66.91 421.73)"
      fontSize={120}
      fontFamily="Calibri-Bold,Calibri"
      fontWeight={700}
      letterSpacing=".05em"
      fill="#fff"
    >
      {'.PDF'}
    </text>
    <path
      className="pdf_svg__cls-3"
      d="M217.45.11l-116 116h96a20 20 0 0020-20z"
      transform="translate(-78.53 2.39)"
    />
    <rect className="pdf_svg__cls-3" x={78.91} y={153.03} width={239.37} height={19.91} rx={7.76} />
    <rect className="pdf_svg__cls-3" x={78.91} y={196.34} width={239.37} height={19.91} rx={7.76} />
    <rect className="pdf_svg__cls-3" x={78.91} y={239.65} width={239.37} height={19.91} rx={7.76} />
  </svg>
);

export default SvgPdf;
