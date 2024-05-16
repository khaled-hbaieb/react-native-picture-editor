import {
  Skia,
  type SkMatrix,
  type SkSize,
  vec,
} from '@shopify/react-native-skia';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import type {SharedValue} from 'react-native-reanimated';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {rotateZ, scale, toM4, translate} from './matrixHelpers';

interface GestureHandlerProps {
  matrix: SharedValue<SkMatrix>;
  size: SkSize;
  stickerIndex: number;
  showDeleteButton?: () => void;
  hideDeleteButton?: () => void;
  checkOverlap?: (x: number, y: number, stickerIndex: number) => void;
  handleDeleteSticker?: (stickerIndex: number) => void;
}

export const GestureHandler = ({
  matrix,
  size,
  stickerIndex,
  showDeleteButton,
  hideDeleteButton,
  checkOverlap,
  handleDeleteSticker,
}: GestureHandlerProps) => {
  const pivot = useSharedValue(Skia.Point(0, 0));
  const offset = useSharedValue(Skia.Matrix());

  const pan = Gesture.Pan()
    .onChange(event => {
      //Show delete button
      if (showDeleteButton) runOnJS(showDeleteButton)?.();
      matrix.value = translate(matrix.value, event.changeX, event.changeY);
    })
    .onEnd(() => {
      // Check if the sticker is overlapped, if so, delete it
      if (handleDeleteSticker) runOnJS(handleDeleteSticker)?.(0);
      //Hide delete button
      if (hideDeleteButton) runOnJS(hideDeleteButton)?.();
    })
    .onUpdate(event => {
      const {absoluteX, absoluteY} = event;
      if (checkOverlap)
        // Check if the sticker is overlapped
        // TODO: To optimize!
        runOnJS(checkOverlap)(absoluteX, absoluteY, stickerIndex);
    });

  const pinch = Gesture.Pinch()
    .onBegin(event => {
      offset.value = matrix.value;
      pivot.value = vec(event.focalX, event.focalY);
    })
    .onChange(event => {
      matrix.value = scale(offset.value, event.scale, pivot.value);
    });

  const rotate = Gesture.Rotation()
    .onBegin(event => {
      offset.value = matrix.value;
      pivot.value = vec(event.anchorX, event.anchorY);
    })
    .onChange(event => {
      matrix.value = rotateZ(offset.value, event.rotation, pivot.value);
    });

  const gesture = Gesture.Race(pan, pinch, rotate);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    width: size.width,
    height: size.height,
    top: 0,
    left: 0,
    transform: [
      {
        translateX: -size.width / 2,
      },
      {
        translateY: -size.height / 2,
      },
      {matrix: toM4(matrix.value)},
      {
        translateX: size.width / 2,
      },
      {
        translateY: size.height / 2,
      },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={style} />
    </GestureDetector>
  );
};
