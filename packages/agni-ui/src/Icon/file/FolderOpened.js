import * as React from 'react';

const SvgFolderOpened = props => (
  <svg viewBox="0 0 342.63 248.69" width="1em" height="1em" id={props.id} {...props}>
    <defs>
      <radialGradient
        id="folder-opened_svg__a"
        cx={301.47}
        cy={257.85}
        r={136.16}
        gradientTransform="matrix(1.01 0 0 1 -.77 0)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#ffe66a" />
        <stop offset={1} stopColor="#ffc755" />
      </radialGradient>
    </defs>
    <path
      d="M287.51 32.91H169.16L125.6 0 34.5.25C15.5.25.09 13.79.09 30.5v25.43c0 .66-.09 1.32-.09 2v165.22a25 25 0 0025 25h262.51a25 25 0 0025-25V57.91a25 25 0 00-25-25z"
      fill="#f49e00"
    />
    <path
      d="M419.22 347.89h-262.8a25 25 0 01-24.54-30.47l29.3-130.08a25.12 25.12 0 0124.54-19.53h262.8a25 25 0 0124.54 30.46l-29.3 130.08a25.12 25.12 0 01-24.54 19.54z"
      transform="translate(-131.05 -99.2)"
      fill="url(#folder-opened_svg__a)"
    />
  </svg>
);

export default SvgFolderOpened;
