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
import {Dimensions, FlatList, Pressable, StyleSheet, View} from 'react-native';
import {makeMutable} from 'react-native-reanimated';
import type {StickerProps} from './stickers/Sticker';
import {deflate} from '../helpers/stickers';
import {stickers} from './stickers';
import {useStickerContext} from './StickerContext';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const window = Dimensions.get('window');
const COLS = 2;
const tileWidth = window.width / COLS;
const tileHeight = 125;
const width = window.width;

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

  const renderItem = ({item, index}) => {
    const {Sticker, size} = item;
    const {width, height} = size;
    const src = rect(0, 0, width, height);
    const dst = deflate(rect(0, 0, tileWidth, tileHeight), 12);
    const transform = fitbox('contain', src, dst);

    return (
      <Pressable key={index} onPress={() => onPress(Sticker, size)}>
        <Canvas style={{width: tileWidth, height: tileHeight}}>
          <Group transform={transform}>
            <Sticker matrix={Skia.Matrix()} />
          </Group>
        </Canvas>
      </Pressable>
    );
  };

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '75%', '90%'], []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetFlatList
          data={stickers}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.contentContainer}
          style={{flex: 1}}
          numColumns={2}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    backgroundColor: 'rgb(34, 33, 33)',
    width: '100%',
    // Hack for list items to show because of Toolbar overlap
    paddingBottom: width * 0.3,
  },
});
