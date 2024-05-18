import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  LayoutChangeEvent,
  View,
} from 'react-native';
import React from 'react';

interface ActionButtonProps {
  text?: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
  children?: React.ReactNode;
  isSelected?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  onPress,
  disabled,
  style,
  onLayout,
  children,
  isSelected,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onLayout={onLayout}
        disabled={disabled}
        onPress={() => {
          onPress?.();
        }}
        style={[
          styles.pressable,
          style,
          {
            borderColor: isSelected ? 'white' : undefined,
            borderWidth: isSelected ? 1 : undefined,
          },
        ]}>
        {children}
      </Pressable>
      {text ? <Text style={styles.textStyle}>{text}</Text> : null}
    </View>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    backgroundColor: 'rgba(42,42,42,1)',
    borderRadius: 35,
    marginHorizontal: 10,
  },
  textStyle: {
    color: 'rgba(160,160,166,1)',
    fontSize: 11,
    marginTop: 5,
  },
});
