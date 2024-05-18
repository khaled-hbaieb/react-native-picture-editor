import {SkPath} from '@shopify/react-native-skia';
import {Colors} from '../constants';

export type Color = (typeof Colors)[number];

export type PathWithColorAndWidth = {
  path: SkPath;
  color: Color;
  strokeWidth: number;
};

export enum ActionButtonType {
  CLEAR = 'Clear',
  SAVE = 'Save',
  IMPORT = 'Import',
  STICKER = 'Stickers',
  UNDO = 'Undo',
  SHOWSTROKES = 'Strokes',
  SHOWCOLORS = 'Colors',
}
