import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import bgImg from '../../assets/background.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../utility/validation';
import * as actions from '../../stores/actions/index';

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    authMode: 'login',
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          iminLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
    }
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      };
    });
  };

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  };

  loginHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onLogin(authData);
    startMainTabs();
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }

    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }

    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === 'password'
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  render() {
    let headingText = null;
    let confirmPasswordControl = null;

    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Auth Screen</HeadingText>
        </MainText>
      );
    }

    if (this.state.authMode === 'signup') {
      confirmPasswordControl = (
        <DefaultInput
          placeholder="Confirm password"
          style={styles.input}
          value={this.state.controls.confirmPassword.value}
          onChangeText={val => this.updateInputState('confirmPassword', val)}
          valid={this.state.controls.confirmPassword.valid}
          touched={this.state.controls.confirmPassword.touched}
          secureTextEntry
        />
      );
    }

    return (
      <ImageBackground source={bgImg} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {headingText}
          <ButtonWithBackground
            color="#2988f4"
            onPress={this.switchAuthModeHandler}
          >
            Switch to {this.state.authMode === 'login' ? 'sign up' : 'log in'}
          </ButtonWithBackground>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder="Email address"
                style={styles.input}
                value={this.state.controls.email.value}
                onChangeText={val => this.updateInputState('email', val)}
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
              <View
                style={
                  this.state.viewMode === 'portrait' ||
                  this.state.authMode === 'login'
                    ? styles.portraitPasswordContainer
                    : styles.landscapePasswordContainer
                }
              >
                <View
                  style={
                    this.state.viewMode === 'portrait' ||
                    this.state.authMode === 'login'
                      ? styles.portraitPasswordWrapper
                      : styles.landscapePasswordWrapper
                  }
                >
                  <DefaultInput
                    placeholder="Password"
                    style={styles.input}
                    value={this.state.controls.password.value}
                    onChangeText={val => this.updateInputState('password', val)}
                    valid={this.state.controls.password.valid}
                    touched={this.state.controls.password.touched}
                    secureTextEntry
                  />
                </View>
                <View
                  style={
                    this.state.viewMode === 'portrait'
                      ? styles.portraitPasswordWrapper
                      : styles.landscapePasswordWrapper
                  }
                >
                  {confirmPasswordControl}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <ButtonWithBackground
            color="#2988f4"
            onPress={this.loginHandler}
            disabled={
              (!this.state.controls.confirmPassword.valid &&
                this.state.authMode === 'signup') ||
              !this.state.controls.password.valid ||
              !this.state.controls.email.valid
            }
          >
            Submit
          </ButtonWithBackground>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    width: '100%'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordWrapper: {
    width: '45%'
  },
  portraitPasswordWrapper: {
    width: '100%'
  }
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogin: authData => dispatch(actions.tryAuth(authData))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AuthScreen);