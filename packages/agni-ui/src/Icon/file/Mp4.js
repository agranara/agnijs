import * as React from 'react';

const SvgMp4 = props => (
  <svg id={props.id} viewBox="0 0 385.87 517" width="1em" height="1em" {...props}>
    <defs>
      <style>{'.mp4_svg__cls-1{fill:#351d00}.mp4_svg__cls-3{fill:#9f0082}'}</style>
    </defs>
    <path
      className="mp4_svg__cls-1"
      d="M0 330.46h22.94v-30.11L0 330.46zM385.87 330.46h-22.93v-30.11l22.93 30.11z"
    />
    <path
      d="M138.91 2.5l-116 116v376a20 20 0 0020 20h300a20 20 0 0020-20v-472a20 20 0 00-20-20z"
      stroke="#9f0082"
      strokeMiterlimit={10}
      strokeWidth={5}
      fill="#fff"
    />
    <path className="mp4_svg__cls-3" d="M340 330.46H0L22.94 433.1h340l22.93-102.64H340z" />
    <text
      transform="translate(49.42 421.73)"
      fontSize={120}
      fontFamily="Calibri-Bold,Calibri"
      fontWeight={700}
      letterSpacing=".05em"
      fill="#fff"
    >
      .MP4
    </text>
    <path
      className="mp4_svg__cls-3"
      d="M210.34.21l-116 116h96a20 20 0 0020-20z"
      transform="translate(-71.43 2.29)"
    />
    <rect className="mp4_svg__cls-3" x={100.77} y={172.35} width={128.68} height={92.68} rx={25} />
    <path
      className="mp4_svg__cls-3"
      d="M354.06 185.53v63.41A15 15 0 01330.18 261l-59.52-43.7 59.51-43.84a15 15 0 0123.89 12.07z"
      transform="translate(-71.43 2.29)"
    />
  </svg>
);

export default SvgMp4;
