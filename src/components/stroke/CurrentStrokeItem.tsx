import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

type CurrentStrokeItemProps = {
  strokeWidth: number;
  showStrokes: boolean;
  setShowStrokes: (showStrokes: boolean) => void;
};

const CurrentStrokeItem = ({
  strokeWidth,
  showStrokes,
  setShowStrokes,
}: CurrentStrokeItemProps) => {
  return (
    <Pressable
      style={styles.currentStroke}
      onPress={() => setShowStrokes(!showStrokes)}>
      <Text>{strokeWidth}</Text>
    </Pressable>
  );
};

export default CurrentStrokeItem;

const styles = StyleSheet.create({
  currentStroke: {
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
  },
});
