import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {strokes} from '../../constants';
import StrokeItem from './StrokeItem';

const {width} = Dimensions.get('window');

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
    backgroundColor: 'rgba(30,30,30,1)',
    height: 50,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
    bottom: width * 0.3,
    justifyContent: 'space-between',
    zIndex: 100,
  },
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
