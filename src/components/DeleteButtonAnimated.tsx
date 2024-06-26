import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  LayoutChangeEvent,
  Dimensions,
} from 'react-native';
import {DeleteIcon} from '../drawables/svg';

const {width} = Dimensions.get('window');

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
        <DeleteIcon width={35} height={35} color={'white'} />
      </Animated.View>
    </View>
  );
};

export default DeleteButtonAnimated;

const styles = StyleSheet.create({
  container: {
    height: 50,
    bottom: width * 0.45,
    width: 50,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});
