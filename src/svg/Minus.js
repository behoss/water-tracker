import * as React from "react";

function SvgMinus(props) {
  return (
    <svg width={60} height={60} {...props}>
      <g transform="translate(-76 -711)">
        <g
          transform="translate(76 711)"
          stroke="#fff"
          strokeWidth={4}
          fill="none"
        >
          <circle cx={30} cy={30} r={30} stroke="none" />
          <circle cx={30} cy={30} r={28} />
        </g>
        <rect
          width={22}
          height={6}
          rx={1}
          transform="translate(95 738)"
          fill="#fff"
        />
      </g>
    </svg>
  );
}

export default SvgMinus;
