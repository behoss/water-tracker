import * as React from "react";

function SvgStar(props) {
  return (
    <svg height={210} width={500} {...props}>
      <defs>
        <filter
          id="star_svg__a"
          primitiveUnits="objectBoundingBox"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feFlood x="0%" y="0%" floodColor="red" />
          <feOffset dy={0.5}>
            <animate attributeName="dy" from={1} to={0.5} dur="3s" />
          </feOffset>
          <feComposite operator="in" in2="SourceGraphic" />
          <feComposite in2="SourceGraphic" />
        </filter>
      </defs>
      <path
        filter="url(#star_svg__a)"
        fill="#fff"
        stroke="red"
        d="M165 185l23.511 12.361-4.49-26.181 19.021-18.541-26.286-3.819L165 125l-11.756 23.82-26.286 3.819 19.021 18.541-4.49 26.181L165 185z"
      />
    </svg>
  );
}

export default SvgStar;
