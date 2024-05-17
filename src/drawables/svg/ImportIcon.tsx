import * as React from "react";
import Svg, { Path, SvgProps,G } from "react-native-svg";

export const ImportIcon: React.FC<SvgProps> = (props) => {
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
    <G fill="#0F0F0F">
      <Path
        fillRule="evenodd"
        d="M23 4a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V4Zm-2 0a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4Z"
        clipRule="evenodd"
      />
      <Path d="M4.807 17.521 9.122 9.61a1 1 0 0 1 1.756 0l3.168 5.81 1.086-1.9a1 1 0 0 1 1.736 0l2.277 3.985A1 1 0 0 1 18.277 19H5.685a1 1 0 0 1-.878-1.479ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </G>
  </Svg>
  );
};
