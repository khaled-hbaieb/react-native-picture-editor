import * as React from "react";
import Svg, { Path, SvgProps,Ellipse } from "react-native-svg";

export const StrokeWidthIcon: React.FC<SvgProps> = (props) => {
  const { width = 16, height = 19, color = "#000", ...restProps } = props;
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width={width}
    height={height}
    {...restProps}>
    <Path d="M0 0h20v5H0V0zm0 7h20v4H0V7zm0 6h20v3H0v-3zm0 5h20v2H0v-2z" />
  </Svg>
  );
};
