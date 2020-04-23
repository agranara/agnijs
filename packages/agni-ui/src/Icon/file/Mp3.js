import * as React from 'react';

const SvgMp3 = props => (
  <svg id={props.id} viewBox="0 0 385.87 517" width="1em" height="1em" {...props}>
    <defs>
      <style>
        {
          '.mp3_svg__cls-1{fill:#351d00}.mp3_svg__cls-5{stroke:#006bbf;stroke-miterlimit:10}.mp3_svg__cls-3,.mp3_svg__cls-5{fill:#006bbf}'
        }
      </style>
    </defs>
    <path
      className="mp3_svg__cls-1"
      d="M0 330.46h22.94v-30.11L0 330.46zM385.87 330.46h-22.93v-30.11l22.93 30.11z"
    />
    <path
      d="M138.92 2.5l-116 116v376a20 20 0 0020 20h300a20 20 0 0020-20v-472a20 20 0 00-20-20z"
      strokeWidth={5}
      stroke="#006bbf"
      strokeMiterlimit={10}
      fill="#fff"
    />
    <path className="mp3_svg__cls-3" d="M340 330.46H0L22.94 433.1h340l22.93-102.64H340z" />
    <text
      transform="translate(49.42 421.73)"
      fontSize={120}
      fontFamily="Calibri-Bold,Calibri"
      fontWeight={700}
      letterSpacing=".05em"
      fill="#fff"
    >
      .MP3
    </text>
    <path
      className="mp3_svg__cls-3"
      d="M202.37.91l-116 116h96a20 20 0 0020-20z"
      transform="translate(-63.45 1.59)"
    />
    <ellipse
      className="mp3_svg__cls-5"
      cx={288.68}
      cy={273.04}
      rx={35.69}
      ry={25}
      transform="rotate(-4.31 278.115 1117.011)"
    />
    <path
      className="mp3_svg__cls-5"
      transform="rotate(-4.31 240.603 1053.06)"
      d="M248.91 144.43h4.53v129.28h-4.53z"
    />
    <path
      className="mp3_svg__cls-5"
      d="M250.07 173.68l-68.44 14.7s57.57-26.8 62.5-42.39c1.87-5.99 5.94 27.69 5.94 27.69z"
      transform="translate(-63.45 1.59)"
    />
  </svg>
);

export default SvgMp3;
