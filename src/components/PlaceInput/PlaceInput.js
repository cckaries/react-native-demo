import React from 'react';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

const PlaceInput = props => {
  // state = {
  //   placeName: ''
  // };

  // placeNameChangedHandler = val => {
  //   this.setState({ placeName: val });
  // };

  // placeSubmitHandler = () => {
  //   if (this.state.placeName.trim() === '') {
  //     return;
  //   }

  //   this.props.onPlaceAdded(this.state.placeName);
  // };

  // render() {
    // return (
    //   <View style={styles.inputContainer}>
    //     <TextInput
    //       style={styles.placeInput}
    //       placeholder={this.props.placeholder}
    //       value={this.state.placeName}
    //       onChangeText={this.placeNameChangedHandler}
    //     />
    //     <Button
    //       style={styles.placeButton}
    //       title={this.props.btnTitle}
    //       onPress={this.placeSubmitHandler}
    //     />
    //   </View>
    // );
    return (
      <DefaultInput
        placeholder="Place Name"
        value={props.placeData.value}
        valid={props.placeData.valid}
        touched={props.placeData.touched}
        onChangeText={props.onChangeText}
      />
    );
  // }
}

// const styles = StyleSheet.create({
//   inputContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   placeInput: {
//     width: '70%'
//   },
//   placeButton: {
//     width: '30%'
//   }
// });

export default PlaceInput;
