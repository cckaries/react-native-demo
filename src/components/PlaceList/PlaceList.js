import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ListItem from './ListItem/ListItem';

const PlaceList = props => {
  return (
    <FlatList
      data={props.listItems}
      renderItem={info => (
        <ListItem
          placeName={info.item.name}
          placeImage={info.item.image}
          onItemPressed={() => props.onItemSelected(info.item.key)}
        />
      )}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%'
  }
});

export default PlaceList;
