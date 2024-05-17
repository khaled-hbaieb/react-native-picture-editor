import * as React from "react";
import Svg, { Path, SvgProps,G } from "react-native-svg";

export const ClearIcon: React.FC<SvgProps> = (props) => {
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
    <G stroke="#000" strokeWidth={1.5}>
      <Path d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5v-1Z" />
      <Path
        strokeLinecap="round"
        d="m14.5 11-5 5m0-5 5 5M21 16c0 2.829 0 4.243-.879 5.122C19.243 22 17.828 22 15 22H9c-2.828 0-4.243 0-5.121-.878C3 20.242 3 18.829 3 16v-3m13-8.998c2.175.012 3.353.109 4.121.877C21 5.758 21 7.172 21 10v2M8 4.002c-2.175.012-3.353.109-4.121.877-.769.768-.865 1.946-.877 4.121"
      />
    </G>
  </Svg>
  );
};
