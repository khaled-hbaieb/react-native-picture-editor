import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ActionButtonType, Color, PathWithColorAndWidth} from '../types';
import StrokesMenu from './stroke/StrokesMenu';
import ColorsMenu from './color/ColorsMenu';
import ActionButton from './ActionButton';
import {SkImage} from '@shopify/react-native-skia';
import {
  SaveIcon,
  ImportIcon,
  ClearIcon,
  StickerIcon,
  StrokeWidthIcon,
  PencilIcon,
} from '../drawables/svg';

const {width, height} = Dimensions.get('window');

interface ToolbarItem {
  type: 'ActionButton';
  text: ActionButtonType;
  icon: React.ReactNode;
  onPress: string;
}

const toolbarItems: ToolbarItem[] = [
  {
    type: 'ActionButton',
    text: ActionButtonType.SHOWCOLORS,
    icon: <PencilIcon width={28} height={28} />,
    onPress: 'setShowColors',
  },

  {
    type: 'ActionButton',
    text: ActionButtonType.SHOWSTROKES,
    icon: <StrokeWidthIcon width={20} height={20} />,
    onPress: 'setShowStrokes',
  },
  {
    type: 'ActionButton',
    text: ActionButtonType.STICKER,
    icon: <StickerIcon width={20} height={20} />,
    onPress: 'handlePresentModalPress',
  },
  {
    type: 'ActionButton',
    text: ActionButtonType.IMPORT,
    icon: <ImportIcon width={20} height={20} />,
    onPress: 'onImport',
  },

  {
    type: 'ActionButton',
    text: ActionButtonType.SAVE,
    icon: <SaveIcon width={20} height={20} />,
    onPress: 'onSave',
  },

  {
    type: 'ActionButton',
    text: ActionButtonType.CLEAR,
    icon: <ClearIcon width={20} height={20} />,
    onPress: 'handleClear',
  },
];

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
  const [isSelected, setSelected] = useState('');

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

  const renderItem = ({item}: {item: ToolbarItem}) => {
    switch (item.type) {
      case 'ActionButton':
        const onPressHandler = () => {
          switch (item.onPress) {
            case 'onImport':
              setSelected('');

              onImport();
              break;
            case 'onSave':
              setSelected('');

              onSave();
              break;
            case 'handleClear':
              setSelected('');

              handleClear();
              break;
            case 'handlePresentModalPress':
              setSelected('');

              handlePresentModalPress();
              setShowStrokes(false);
              setShowColors(false);
              break;

            case 'setShowStrokes':
              setSelected(isSelected === item.text ? '' : item.text);

              setShowStrokes(!showStrokes);
              setShowColors(false);
              break;
            case 'setShowColors':
              setSelected(isSelected === item.text ? '' : item.text);

              setShowColors(!showColors);
              setShowStrokes(false);

            default:
              break;
          }
        };
        return (
          <ActionButton
            onPress={onPressHandler}
            text={item.text}
            children={item.icon}
            isSelected={isSelected === item.text}
          />
        );
      default:
        return null;
    }
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
        <View style={{marginTop: 10}}>
          <Text style={{color: 'rgba(160,160,166,1)', fontSize: 14}}>Edit</Text>
        </View>
        <FlatList
          horizontal
          data={toolbarItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.toolBarList}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  toolbar: {
    height: width * 0.3,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    borderWidth: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: 'rgba(31,31,31,1)',
  },
  toolBarList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
});
