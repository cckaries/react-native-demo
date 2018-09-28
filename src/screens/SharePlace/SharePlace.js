import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../../stores/actions/index';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import validate from '../../utility/validation';

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };

  state = {
    controls: {
      placeName: {
        value: '',
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      },
      location: {
        value: null,
        valid: false
      },
      image: {
        value: null,
        valid: false
      }
    }
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.setOnNavigatorEvent);
  }

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

  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      };
    });
  };

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      };
    });
  };

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      };
    });
  };

  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value
    );
  };

  render() {
    let submitButton = (
      <Button
        title="Share!"
        onPress={this.placeAddedHandler}
        disabled={
          !this.state.controls.placeName.valid ||
          !this.state.controls.location.valid ||
          !this.state.controls.image.value
        }
      />
    );

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }

    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container}>
            <MainText>
              <HeadingText>Share a place with us</HeadingText>
            </MainText>
            <PickImage onImagePicked={this.imagePickedHandler} />
            <PickLocation onLocationPick={this.locationPickedHandler} />
            <PlaceInput
              placeData={this.state.controls.placeName}
              onChangeText={this.placeNameChangedHandler}
            />
            <View style={styles.button}>{submitButton}</View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  placeholder: {
    width: '80%',
    height: 200,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#eee'
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddPlace: (placeName, location, image) =>
      dispatch(actions.addPlace(placeName, location, image))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharePlaceScreen);
