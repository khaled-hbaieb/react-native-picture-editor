import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  LayoutChangeEvent,
} from 'react-native';
import React from 'react';

interface ActionButtonProps {
  text?: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
  children?: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  onPress,
  disabled,
  style,
  onLayout,
  children,
}) => {
  return (
    <Pressable
      onLayout={onLayout}
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, style]}>
      {children}
      {text ? <Text style={styles.textStyle}>{text}</Text> : null}
    </Pressable>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  textStyle: {
    color: '#000000',
    fontSize: 13,
  },
});
