import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

type StrokeItemProps = {
  stroke: number;
  handleStrokeWidthChange: (stroke: number) => void;
};

const StrokeItem = ({stroke, handleStrokeWidthChange}: StrokeItemProps) => {
  return (
    <Pressable
      style={styles.strokeOptionContainer}
      onPress={() => handleStrokeWidthChange(stroke)}
      key={stroke}>
      <Text style={styles.strokeOptionText}>{stroke}</Text>
    </Pressable>
  );
};

export default StrokeItem;

const styles = StyleSheet.create({
  strokeOptionContainer: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginHorizontal: 5,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  strokeOptionText: {
    fontSize: 18,
  },
});
