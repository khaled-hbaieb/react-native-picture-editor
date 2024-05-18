import * as React from 'react';
import Svg, {Path, SvgProps, G, Circle} from 'react-native-svg';

export const PencilIcon: React.FC<SvgProps> = props => {
  const {
    width = 16,
    height = 19,
    color = props.color ? props.color : '#fff',
    ...restProps
  } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={color}
      strokeWidth={3}
      viewBox="0 0 64 64"
      width={width}
      height={height}
      color={color}
      {...props}>
      <G strokeLinecap="round">
        <Path d="M34.07 50.93s19.79-6.55 11.61-24.33c0 0-4.8-11.46-19.31-13.27S8.3 20.8 8.3 20.8 1.81 33.68 13.1 35c1.62.19 5-.56 6.4 1.33s.29 4.2 0 8.8c-.16 2.56 1.77 8.74 14.57 5.8Z" />
        <Circle cx={17.2} cy={24.01} r={3.59} />
        <Circle cx={38.02} cy={28.02} r={2.43} />
        <Circle cx={38.02} cy={39.04} r={2.43} />
        <Circle cx={28.14} cy={44.38} r={2.43} />
        <Path d="M54 12.62c-.69 3.31-2.07 10.9-2.18 27a.41.41 0 0 0 .41.41h4.91a.41.41 0 0 0 .41-.42c-.1-2.82-.74-18.12-2.75-27a.41.41 0 0 0-.8.01ZM57.48 43.8c0 1.53-1.92 7.37-2.78 7.37s-2.78-5.84-2.78-7.37a2.78 2.78 0 1 1 5.56 0Z" />
      </G>
    </Svg>
  );
};
