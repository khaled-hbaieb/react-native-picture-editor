import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import {DeleteIcon} from '../drawables/svg';

interface DeleteButtonAnimatedProps {
  onLayout?: (event: LayoutChangeEvent) => void;
  animatedDeketeBtnScale?: Animated.Value;
}
const DeleteButtonAnimated: React.FC<DeleteButtonAnimatedProps> = ({
  onLayout,
  animatedDeketeBtnScale,
}) => {
  return (
    <View style={styles.container} onLayout={onLayout}>
      <Animated.View style={{transform: [{scale: animatedDeketeBtnScale}]}}>
        <DeleteIcon width={40} height={40} color={'white'} />
      </Animated.View>
    </View>
  );
};

export default DeleteButtonAnimated;

const styles = StyleSheet.create({
  container: {
    height: 50,
    bottom: 20,
    width: 50,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});