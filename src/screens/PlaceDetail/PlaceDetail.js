import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import * as actions from '../../stores/actions/index';

class PlaceDetail extends Component {
  state = {
    viewMode: 'portrait'
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateState)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateState)
  }

  updateState = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  };

  placeDeleteHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop({
      animated: true
    });
  };

  render() {
    // let modalContent = null;
    // if (props.selectedPlace) {
    //   modalContent = (
    //     <View style={styles.modalContainer}>
    //       <Image source={props.selectedPlace.image} style={styles.placeImage} />
    //       <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
    //     </View>
    //   );
    // }

    return (
      <View
        style={[
          styles.container,
          this.state.viewMode === 'portrait'
            ? styles.portraitContainer
            : styles.landscapeContainer
        ]}
      >
        <View style={styles.subContainer}>
          <Image
            source={this.props.selectedPlace.image}
            style={styles.placeImage}
          />
        </View>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>
              {this.props.selectedPlace.name}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.placeDeleteHandler}>
              <View style={styles.deleteButton}>
                <Ionicons
                  size={30}
                  name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                  color="red"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 22
  },
  subContainer: {
    flex: 1
  },
  potraitContainer: {
    flexDirection: 'column'
  },
  landscapeContainer: {
    flexDirection: 'row'
  },
  placeImage: {
    width: '100%',
    height: 200
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  deleteButton: {
    alignItems: 'center'
  }
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDeletePlace: key => dispatch(actions.deletePlace(key))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PlaceDetail);
