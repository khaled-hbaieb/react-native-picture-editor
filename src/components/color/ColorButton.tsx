import {Pressable, StyleSheet} from 'react-native';
import {Color} from '../../types';

type ColorButtonProps = {
  color: Color;
  isSelected: boolean;
  onPress: () => void;
};

const ColorButton = ({color, onPress, isSelected}: ColorButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.colorButton,
        {backgroundColor: color},
        isSelected && {
          borderWidth: 2,
          borderColor: 'black',
        },
      ]}
    />
  );
};

export default ColorButton;

const styles = StyleSheet.create({
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginHorizontal: 5,
  },
});
