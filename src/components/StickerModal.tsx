import type {FC} from 'react';
import React, {useCallback, useMemo} from 'react';
import type {SkSize} from '@shopify/react-native-skia';
import {
  Canvas,
  Group,
  Skia,
  fitbox,
  rect,
  processTransform2d,
} from '@shopify/react-native-skia';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import {makeMutable} from 'react-native-reanimated';
import type {StickerProps} from './stickers/Sticker';
import {deflate} from '../helpers/stickers';
import {stickers} from './stickers';
import {useStickerContext} from './StickerContext';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const window = Dimensions.get('window');
const COLS = 2;
const tileWidth = window.width / COLS;
const tileHeight = 125;

interface StickerModalProps {
  handlePresentModalPress: () => void;
  handleSheetChanges: (index: number) => void;
  bottomSheetModalRef: any;
}

export const StickerModal: React.FC<StickerModalProps> = ({
  handlePresentModalPress,
  handleSheetChanges,
  bottomSheetModalRef,
}) => {
  const {addSticker} = useStickerContext();
  const onPress = useCallback(
    (Sticker: FC<StickerProps>, size: SkSize) => {
      const src = rect(0, 0, size.width, size.height);
      const dst = deflate(rect(0, 0, window.width, window.height), 24);
      const m3 = processTransform2d(fitbox('contain', src, dst));
      const matrix = makeMutable(m3);
      addSticker({
        Sticker,
        size,
        matrix,
      });
      bottomSheetModalRef?.current?.dismiss();
    },
    [addSticker],
  );

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            {stickers.map(({Sticker, size}, index) => {
              const {width, height} = size;
              const src = rect(0, 0, width, height);
              const dst = deflate(rect(0, 0, tileWidth, tileHeight), 12);
              const transform = fitbox('contain', src, dst);
              return (
                <Pressable
                  key={index}
                  onPress={onPress.bind(null, Sticker, size)}>
                  <Canvas style={{width: tileWidth, height: tileHeight}}>
                    <Group transform={transform}>
                      <Sticker matrix={Skia.Matrix()} />
                    </Group>
                  </Canvas>
                </Pressable>
              );
            })}
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
