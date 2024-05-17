import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Color} from '../../types';
import {PencilIcon} from '../../drawables/svg/PencilIcon';

type ColorButtonProps = {
  color: Color;
  onPress: () => void;
  inMenu?: boolean;
};

const ColorButton = ({color, onPress, inMenu}: ColorButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{...styles.colorButton, marginHorizontal: inMenu ? 10 : 5}}>
      <PencilIcon
        width={inMenu ? 25 : 20}
        height={inMenu ? 25 : 20}
        color={color === 'white' ? '#f0f0f0' : color}
      />
      <Text style={styles.textStyle}>{color}</Text>
    </TouchableOpacity>
  );
};

export default ColorButton;

const styles = StyleSheet.create({
  colorButton: {
    borderRadius: 15,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 12,
  },
});
