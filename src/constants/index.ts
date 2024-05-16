import {LayoutRectangle} from 'react-native';

export const Colors = [
  'red',
  'black',
  'blue',
  'green',
  'yellow',
  'white',
  'orange',
  'purple',
  'pink',
  'cyan',
  'brown',
  'teal',
  'lime',
  'magenta',
  'silver',
  'gold',
  'navy',
  'indigo',
  'maroon',
  'olive',
  'lavender',
  'coral',
] as const;

export const strokes = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

export const initialLayout = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
} as LayoutRectangle;
