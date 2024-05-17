import * as React from "react";
import Svg, { Path, SvgProps,G } from "react-native-svg";

export const DeleteIcon: React.FC<SvgProps> = (props) => {
  const { width = 16, height = 19, color = "#000", ...restProps } = props;
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...restProps}
  >
    <G
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <Path d="M10 11v6M14 11v6M4 7h16M6 7h12v11a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V7ZM9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z" />
    </G>
  </Svg>
  );
};
