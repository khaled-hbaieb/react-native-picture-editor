import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {strokes} from '../../constants';
import StrokeItem from './StrokeItem';

type StrokesMenuProps = {
  handleStrokeWidthChange: (stroke: number) => void;
};

const StrokesMenu = ({handleStrokeWidthChange}: StrokesMenuProps) => {
  const renderItem = ({item}: {item: number}) => (
    <StrokeItem
      stroke={item}
      handleStrokeWidthChange={handleStrokeWidthChange}
    />
  );
  return (
    <View style={[styles.toolbar, styles.strokeToolbar]}>
      <FlatList
        data={strokes}
        keyExtractor={item => item.toString()}
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default StrokesMenu;

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#ffffff',
    height: 50,
    width: 350,
    borderRadius: 100,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  strokeToolbar: {
    position: 'absolute',
    top: 80,
    justifyContent: 'space-between',
    zIndex: 100,
  },
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
