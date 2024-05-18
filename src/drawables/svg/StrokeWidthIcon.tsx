import * as React from 'react';
import Svg, {Path, SvgProps, G, Rect} from 'react-native-svg';

export const StrokeWidthIcon: React.FC<SvgProps> = props => {
  const {width = 16, height = 19, color = '#000', ...restProps} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#fff"
      viewBox="0 0 48 48"
      width={width}
      height={height}
      {...props}>
      <G data-name="Layer 2">
        <Path fill="none" d="M0 0h48v48H0z" data-name="invisible box" />
        <G data-name="icons Q2">
          <Rect width={40} height={2} x={4} y={40} rx={1} ry={1} />
          <Rect width={40} height={4} x={4} y={31} rx={1} ry={1} />
          <Rect width={40} height={6} x={4} y={20} rx={1} ry={1} />
          <Rect width={40} height={8} x={4} y={7} rx={1} ry={1} />
        </G>
      </G>
    </Svg>
  );
};
