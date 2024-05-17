import React from 'react';
import ColorButton from './ColorButton';
import {Color} from '../../types';

type CurrentColorItemProps = {
  color: Color;
  showColors: boolean;
  setShowColors: (showColors: boolean) => void;
};
const CurrentColorItem: React.FC<CurrentColorItemProps> = ({
  color,
  showColors,
  setShowColors,
}) => {
  return (
    <ColorButton
      color={color}
      onPress={() => {
        setShowColors(!showColors);
      }}
    />
  );
};

export default CurrentColorItem;
