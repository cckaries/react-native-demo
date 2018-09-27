import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class SideDrawer extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get('window').width * 0.8 }
        ]}
      >
        <TouchableOpacity>
          <View style={styles.drawerItem}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-log-out' : "ios-log-out"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white'
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eee'
  },
  drawerItemIcon: {
    marginRight: 10
  }
});
