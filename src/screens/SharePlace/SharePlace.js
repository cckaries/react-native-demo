import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView
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
    navBarBurronColor: 'orange'
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

  placeAddedHandler = () => {
    if (this.state.controls.placeName.value.trim() !== '') {
      this.props.onAddPlace(this.state.controls.placeName.value);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container}>
            <MainText>
              <HeadingText>Share a place with us</HeadingText>
            </MainText>
            <PickImage />
            <PickLocation />
            <PlaceInput
              placeData={this.state.controls.placeName}
              onChangeText={this.placeNameChangedHandler}
            />
            <View style={styles.button}>
              <Button
                title="Share!"
                onPress={this.placeAddedHandler}
                disabled={!this.state.controls.placeName.valid}
              />
            </View>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddPlace: placeName => dispatch(actions.addPlace(placeName))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SharePlaceScreen);
