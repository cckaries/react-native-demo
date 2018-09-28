import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';
import * as actions from '../../stores/actions/index';

class FindPlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    placesAnim: new Animated.Value(0)
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.setOnNavigatorEvent);
  }

  componentDidMount = () => {
    this.props.onLoadPlaces();
  };

  setOnNavigatorEvent = e => {
    console.log(e);
    if (e.type === 'NavBarButtonPress') {
      if (e.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left'
        });
      }
    }
  };

  placesLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({ placesLoaded: true });
      this.placesLoadedHandler();
    });
  };

  itemSelectedHandler = key => {
    const setPlace = this.props.places.find(place => {
      return place.key === key;
    });

    this.props.navigator.push({
      screen: 'test.PlaceDetailScreen',
      title: setPlace.name,
      passProps: {
        selectedPlace: setPlace
      }
    });
  };

  render() {
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if (this.state.placesLoaded) {
      content = (
        <Animated.View
          style={{
            opacity: this.state.placesAnim
          }}
        >
          <PlaceList
            listItems={this.props.places}
            onItemSelected={this.itemSelectedHandler}
          />
        </Animated.View>
      );
    }
    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    places: state.places.places
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoadPlaces: () => dispatch(actions.getPlaces())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindPlaceScreen);
