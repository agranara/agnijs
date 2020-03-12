import * as React from 'react';

const SvgUnknown = props => (
  <svg viewBox="0 0 345 517" width="1em" height="1em" id={props.id} {...props}>
    <path
      d="M118.45 2.5l-116 116v376a20 20 0 0020 20h300a20 20 0 0020-20v-472a20 20 0 00-20-20z"
      fill="#fff"
      stroke="#070015"
      strokeMiterlimit={10}
      strokeWidth={5}
    />
    <path d="M118.45 2.5l-116 116h96a20 20 0 0020-20z" fill="#070015" />
    <text
      transform="translate(116.88 289.39)"
      fontSize={120}
      fontFamily="Calibri-Bold,Calibri"
      fontWeight={700}
      letterSpacing=".05em"
    >
      {'...'}
    </text>
  </svg>
);

export default SvgUnknown;
