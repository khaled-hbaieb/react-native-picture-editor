import {StyleSheet} from 'react-native';
import React from 'react';
import ColorButton from './ColorButton';
import {Color} from '../../types';

type CurrentColorItemProps = {
  isSelected: boolean;
  color: Color;
  showColors: boolean;
  setShowColors: (showColors: boolean) => void;
};
const CurrentColorItem: React.FC<CurrentColorItemProps> = ({
  isSelected,
  color,
  showColors,
  setShowColors,
}) => {
  return (
    <ColorButton
      color={color}
      isSelected={isSelected}
      onPress={() => setShowColors(!showColors)}
    />
  );
};

export default CurrentColorItem;

const styles = StyleSheet.create({});
