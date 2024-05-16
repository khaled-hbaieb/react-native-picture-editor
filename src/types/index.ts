import {SkPath} from '@shopify/react-native-skia';
import {Colors} from '../constants';

export type Color = (typeof Colors)[number];

export type PathWithColorAndWidth = {
  path: SkPath;
  color: Color;
  strokeWidth: number;
};

export enum ActionButtonType {
  CLEAR = 'clear',
  SAVE = 'save',
  IMPORT = 'import',
  STICKER = 'sticker',
  UNDO = 'undo',
}
