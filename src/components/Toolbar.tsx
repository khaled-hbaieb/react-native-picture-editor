import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {ActionButtonType, Color, PathWithColorAndWidth} from '../types';
import Separator from './Separator';
import StrokesMenu from './stroke/StrokesMenu';
import CurrentStrokeItem from './stroke/CurrentStrokeItem';
import CurrentColorItem from './color/CurrentColorItem';
import ColorsMenu from './color/ColorsMenu';
import ActionButton from './ActionButton';
import {SkImage} from '@shopify/react-native-skia';
import {
  SaveIcon,
  ImportIcon,
  ClearIcon,
  StickerIcon,
  UndoIcon,
} from '../drawables/svg';

const {width, height} = Dimensions.get('window');

type ToolbarProps = {
  color: Color;
  strokeWidth: number;
  setColor: (color: Color) => void;
  setStrokeWidth: (strokeWidth: number) => void;
  onSave: () => void;
  onImport: () => void;
  setPaths: (paths: PathWithColorAndWidth[]) => void;
  setBackgroundImage: (image: SkImage | null) => void;
  handlePresentModalPress: () => void;
  undoLastDraw: () => void;
};

const Toolbar = ({
  color,
  strokeWidth,
  setColor,
  setStrokeWidth,
  onSave,
  onImport,
  setPaths,
  setBackgroundImage,
  handlePresentModalPress,
  undoLastDraw,
}: ToolbarProps) => {
  const [showStrokes, setShowStrokes] = useState(false);
  const [showColors, setShowColors] = useState(false);

  const handleStrokeWidthChange = (stroke: number) => {
    setStrokeWidth(stroke);
    setShowStrokes(false);
  };

  const handleChangeColor = (color: Color) => {
    setColor(color);
    setShowColors(false);
  };

  const handleClear = () => {
    setPaths([]);
    setBackgroundImage(null);
  };

  return (
    <>
      {showStrokes && (
        <StrokesMenu handleStrokeWidthChange={handleStrokeWidthChange} />
      )}
      {showColors && (
        <ColorsMenu handleChangeColor={handleChangeColor} color={color} />
      )}
      <View style={styles.toolbar}>
        <CurrentStrokeItem
          strokeWidth={strokeWidth}
          showStrokes={showStrokes}
          setShowStrokes={setShowStrokes}
        />
        <Separator />
        <CurrentColorItem
          color={color}
          setShowColors={setShowColors}
          showColors={showColors}
        />
        <Separator />
        <ActionButton
          onPress={onImport}
          text={ActionButtonType.IMPORT}
          children={<ImportIcon width={20} height={20} />}
        />
        <Separator />
        <ActionButton
          onPress={onSave}
          text={ActionButtonType.SAVE}
          children={<SaveIcon width={20} height={20} />}
        />
        <Separator />
        <ActionButton
          onPress={handleClear}
          text={ActionButtonType.CLEAR}
          children={<ClearIcon width={20} height={20} />}
        />
        <Separator />
        <ActionButton
          onPress={handlePresentModalPress}
          text={ActionButtonType.STICKER}
          children={<StickerIcon width={20} height={20} />}
        />
        <Separator />
        <ActionButton
          onPress={undoLastDraw}
          text={ActionButtonType.UNDO}
          children={<UndoIcon width={20} height={20} />}
        />
      </View>
    </>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#ffffff',
    height: 50,
    width: width * 0.9,
    position: 'absolute',
    top: 20,
    zIndex: 100,
    borderRadius: 100,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
