import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants';
import ColorButton from './ColorButton';
import {Color} from '../../types';

const {width} = Dimensions.get('window');

type ColorsMenuProps = {
  handleChangeColor: (color: Color) => void;
  color: Color;
};

const ColorsMenu: React.FC<ColorsMenuProps> = ({handleChangeColor, color}) => {
  const renderItem = ({item}: {item: Color}) => (
    <ColorButton
      color={item}
      onPress={() => handleChangeColor(item)}
      inMenu={true}
    />
  );
  return (
    <View style={[styles.toolbar, styles.colorToolbar]}>
      <FlatList
        data={Colors}
        keyExtractor={item => item.toString()}
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ColorsMenu;

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#ffffff',
    height: 50,
    width: width * 0.8,
    borderRadius: 100,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  colorToolbar: {
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
