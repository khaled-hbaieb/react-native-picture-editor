import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const UndoIcon: React.FC<SvgProps> = props => {
  const {width = 16, height = 19, color = '#fff', ...restProps} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      {...restProps}>
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 7h11c1.87 0 2.804 0 3.5.402A3 3 0 0 1 19.598 8.5C20 9.196 20 10.13 20 12s0 2.804-.402 3.5a3 3 0 0 1-1.098 1.098C17.804 17 16.87 17 15 17H8M4 7l3-3M4 7l3 3"
      />
    </Svg>
  );
};
