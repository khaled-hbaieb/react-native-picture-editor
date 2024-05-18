import {
  Canvas,
  Path,
  SkImage,
  Skia,
  TouchInfo,
  useCanvasRef,
  useTouchHandler,
  Image as SkiaImage,
} from '@shopify/react-native-skia';
import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  View,
} from 'react-native';
import {
  removeFileProtocol,
  saveBase64Image,
  selectImageFromGallery,
} from '../utils/fileSystemUtils';
import Toolbar from './Toolbar';
import {Color, PathWithColorAndWidth} from '../types';
import {Colors, initialLayout, strokes} from '../constants';
import {useStickerContext} from './StickerContext';
import {GestureHandler} from './GestureHandler';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {StickerModal} from './StickerModal';
import DeleteButtonAnimated from './DeleteButtonAnimated';

const {width, height} = Dimensions.get('window');

const PaintingCanvas = () => {
  const [paths, setPaths] = useState<PathWithColorAndWidth[]>([]);
  const [color, setColor] = useState<Color>(Colors[0]);
  const ref = useCanvasRef();
  const [image, setImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<SkImage | null>();
  const [isDeletebuttonVisible, setIsDeletebuttonVisible] = useState(false);
  const [deleteBtnlayout, setDeleteBtnlayout] =
    useState<LayoutRectangle>(initialLayout);
  const [isOverLappedIndex, setIsOverLappedIndex] = useState<null | string>(
    null,
  );

  const [strokeWidth, setStrokeWidth] = useState(strokes[0]);

  const {stickers, removeSticker} = useStickerContext();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Modal callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {}, []);

  const onSave = async () => {
    // you can pass an optional rectangle
    // to only save part of the image
    const image = ref.current?.makeImageSnapshot();

    if (image) {
      // you can use image in an <Image> component
      // Or save to file using encodeToBytes -> Uint8Array
      const bytes = image.encodeToBytes();
      // Specify a file name for the saved image

      // Call the saveBase64Image function to save the image
      saveBase64Image(bytes)
        .then(filePath => {
          if (filePath) {
            console.log('Image saved at:', filePath);
            const filePathPatformSpecific = removeFileProtocol(filePath);
            setImage(filePathPatformSpecific);

            // Handle success
            Alert.alert('Success', 'Image saved successfully.');
          } else {
            console.log('Failed to save image.');
            // Handle failure
          }
        })
        .catch(error => {
          console.error('Error saving image:', error);
          // Handle error
        });
    }
  };

  const onImport = async () => {
    const result = await selectImageFromGallery();
    if (result) {
      const uri = result?.assets?.[0].uri!;

      const imageData = await Skia.Data.fromURI(uri);
      setBackgroundImage(Skia.Image.MakeImageFromEncoded(imageData));
    }
  };

  const onDrawingStart = useCallback(
    (touchInfo: TouchInfo) => {
      setPaths(currentPaths => {
        const {x, y} = touchInfo;
        const newPath = Skia.Path.Make();
        newPath.moveTo(x, y);
        return [
          ...currentPaths,
          {
            path: newPath,
            color,
            strokeWidth,
          },
        ];
      });
    },
    [color, strokeWidth],
  );

  const onDrawingActive = useCallback((touchInfo: TouchInfo) => {
    setPaths(currentPaths => {
      const {x, y} = touchInfo;
      const currentPath = currentPaths[currentPaths.length - 1];
      const lastPoint = currentPath.path.getLastPt();
      const xMid = (lastPoint.x + x) / 2;
      const yMid = (lastPoint.y + y) / 2;

      currentPath.path.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
      return [...currentPaths.slice(0, currentPaths.length - 1), currentPath];
    });
  }, []);

  const undoLastDraw = () => {
    setPaths(currentPaths => currentPaths.slice(0, currentPaths.length - 1));
  };

  const touchHandler = useTouchHandler(
    {
      onActive: onDrawingActive,
      onStart: onDrawingStart,
    },
    [onDrawingActive, onDrawingStart],
  );

  const showDeleteButton = () => {
    setIsDeletebuttonVisible(true);
  };

  const hideDeleteButton = () => {
    setIsDeletebuttonVisible(false);
  };

  const onButtonLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const {x, y, width, height} = event.nativeEvent.layout;
      setDeleteBtnlayout({x, y, width, height});
    },
    [deleteBtnlayout?.x],
  );

  const animatedDeketeBtnScale = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    animatedDeketeBtnScale.setValue(1);
  }, []);

  const handleAnimatedDeketeBtnScale = () => {
    animatedDeketeBtnScale.setValue(0.8);
    Animated.spring(animatedDeketeBtnScale, {
      toValue: 1,
      bounciness: 24,
      speed: 20,
      useNativeDriver: true,
    }).start();
  };

  const checkOverlap = (
    stickerCenterX: number,
    stickerCenterY: number,
    stickerIndex: number,
  ) => {
    // Define the delete button area
    const {x: btnX, y: btnY, width, height} = deleteBtnlayout;

    // Check if the sticker's position overlaps with the delete button area
    if (stickerCenterY >= height + btnY) {
      setIsOverLappedIndex(stickerIndex.toString());
      handleAnimatedDeketeBtnScale();
    } else {
      setIsOverLappedIndex(null);
    }
  };

  const handleDeleteSticker = (stickerIndex: number) => {
    if (isOverLappedIndex) {
      removeSticker(stickerIndex);
    }
  };

  return (
    <View style={style.container}>
      <Toolbar
        color={color}
        strokeWidth={strokeWidth}
        setColor={setColor}
        setStrokeWidth={setStrokeWidth}
        onSave={onSave}
        onImport={onImport}
        setPaths={setPaths}
        setBackgroundImage={setBackgroundImage}
        handlePresentModalPress={handlePresentModalPress}
        undoLastDraw={undoLastDraw}
      />

      <Canvas style={style.container} onTouch={touchHandler} ref={ref}>
        {backgroundImage ? (
          <SkiaImage
            image={backgroundImage}
            fit={'contain'}
            x={0}
            y={-50}
            width={width}
            height={height}
            style={'stroke'}
          />
        ) : (
          <></>
        )}
        {paths.map((path, index) => (
          <Path
            key={index}
            path={path.path}
            color={path.color}
            style={'stroke'}
            strokeWidth={path.strokeWidth}
          />
        ))}
        {stickers.map(({Sticker, matrix, index}) => {
          return <Sticker key={index} matrix={matrix} />;
        })}
      </Canvas>
      {stickers.map(({size, matrix, index}) => {
        return (
          <GestureHandler
            key={index}
            matrix={matrix}
            size={size}
            showDeleteButton={showDeleteButton}
            hideDeleteButton={hideDeleteButton}
            checkOverlap={checkOverlap}
            handleDeleteSticker={handleDeleteSticker}
            stickerIndex={index}
          />
        );
      })}
      <StickerModal
        handleSheetChanges={handleSheetChanges}
        handlePresentModalPress={handlePresentModalPress}
        bottomSheetModalRef={bottomSheetModalRef}
      />
      {isDeletebuttonVisible && (
        <DeleteButtonAnimated
          onLayout={onButtonLayout}
          animatedDeketeBtnScale={animatedDeketeBtnScale}
        />
      )}
    </View>
  );
};

export default PaintingCanvas;

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
  },
});
