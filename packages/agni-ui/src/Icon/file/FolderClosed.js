import * as React from 'react';

const SvgFolderClosed = props => (
  <svg viewBox="0 0 312.51 248.15" width="1em" height="1em" id={props.id} {...props}>
    <defs>
      <radialGradient cx={156.26} cy={140.53} r={134.16} gradientUnits="userSpaceOnUse">
        <stop offset={0} stopColor="#ffe66a" />
        <stop offset={1} stopColor="#ffc755" />
      </radialGradient>
    </defs>
    <path d="M204.66 59.77L.09 60.02v-29.5C.09 13.82 15.49.28 34.5.28l91.1-.26z" fill="#f49e00" />
    <rect y={32.91} width={312.51} height={215.23} rx={25} fill="url(#folder-closed_svg__a)" />
  </svg>
);

export default SvgFolderClosed;
