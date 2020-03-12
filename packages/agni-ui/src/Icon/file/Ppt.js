import * as React from 'react';

const SvgPpt = props => (
  <svg id={props.id} viewBox="0 0 385.87 512" width="1em" height="1em" {...props}>
    <defs>
      <style>
        {'.ppt_svg__cls-1{fill:#351d00}.ppt_svg__cls-3{fill:#b40019}.ppt_svg__cls-6{fill:#fff}'}
      </style>
    </defs>
    <path
      className="ppt_svg__cls-1"
      d="M0 327.96h22.94v-30.11L0 327.96zM385.87 327.96h-22.93v-30.11l22.93 30.11z"
    />
    <path
      d="M207.49 0l-116 116v376a20 20 0 0020 20h300a20 20 0 0020-20V20a20 20 0 00-20-20z"
      transform="translate(-68.57)"
      fill="#e9002e"
    />
    <path className="ppt_svg__cls-3" d="M340 327.96H0L22.94 430.6h340l22.93-102.64H340z" />
    <text
      transform="translate(70.81 419.23)"
      fill="#fff"
      fontSize={120}
      fontFamily="Calibri-Bold,Calibri"
      fontWeight={700}
      letterSpacing=".05em"
    >
      {'.P'}
      <tspan x={107.92} y={0}>
        {'P'}
      </tspan>
      <tspan x={177.43} y={0}>
        {'T'}
      </tspan>
    </text>
    <path
      className="ppt_svg__cls-3"
      d="M207.49 0l-116 116h96a20 20 0 0020-20z"
      transform="translate(-68.57)"
    />
    <path
      className="ppt_svg__cls-6"
      d="M165.49 144.17v112.7h194v-112.7zm184.62 102.49h-175.2v-92.28h175.2z"
      transform="translate(-68.57)"
    />
    <path className="ppt_svg__cls-6" d="M190.87 139.06H197v10.21h-6.13z" />
    <path
      className="ppt_svg__cls-6"
      transform="rotate(-45 249.9 353.418)"
      d="M281.13 243.04h6.13v55.19h-6.13z"
    />
    <path
      className="ppt_svg__cls-6"
      transform="rotate(-135 206.544 284.84)"
      d="M237.77 243.04h6.13v55.19h-6.13z"
    />
    <path
      className="ppt_svg__cls-6"
      d="M146.72 203.15h8.43v16.09h-8.43zM157.96 196.77h8.43v22.47h-8.43zM169.19 189.36h8.43v29.87h-8.43z"
    />
    <path
      className="ppt_svg__cls-6"
      d="M289 176a25.15 25.15 0 1025.15 25.15H289z"
      transform="translate(-68.57)"
    />
    <path
      className="ppt_svg__cls-6"
      d="M292.79 172v25.15h25.15A25.15 25.15 0 00292.79 172z"
      transform="translate(-68.57)"
    />
  </svg>
);

export default SvgPpt;
