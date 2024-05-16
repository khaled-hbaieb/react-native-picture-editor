import type {SkMatrix, Vector} from '@shopify/react-native-skia';
import {Skia} from '@shopify/react-native-skia';

export const scale = (matrix: SkMatrix, s: number, origin: Vector) => {
  'worklet';
  const source = Skia.Matrix(matrix.get());
  source.translate(origin.x, origin.y);
  source.scale(s, s);
  source.translate(-origin.x, -origin.y);
  return source;
};

export const rotateZ = (matrix: SkMatrix, theta: number, origin: Vector) => {
  'worklet';
  const source = Skia.Matrix(matrix.get());
  source.translate(origin.x, origin.y);
  source.rotate(theta);
  source.translate(-origin.x, -origin.y);
  return source;
};

export const translate = (matrix: SkMatrix, x: number, y: number) => {
  'worklet';
  const m = Skia.Matrix();
  m.translate(x, y);
  m.concat(matrix);
  return m;
};

export const toM4 = (m3: SkMatrix) => {
  'worklet';
  const m = m3.get();
  // Directly use the indices as they would map to their matrix elements
  const tx = m[2];
  const ty = m[5];
  const sx = m[0];
  const sy = m[4];
  const skewX = m[1];
  const skewY = m[3];
  const persp0 = m[6];
  const persp1 = m[7];
  const persp2 = m[8];
  return [
    sx,
    skewY,
    persp0,
    0,
    skewX,
    sy,
    persp1,
    0,
    0,
    0,
    1,
    0,
    tx,
    ty,
    persp2,
    1,
  ];
};
