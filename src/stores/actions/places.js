import * as actionTypes from './actionTypes';
import * as actions from './index';

export const addPlace = (placeName, location, image) => {
  // return {
  //   type: actionTypes.ADD_PLACE,
  //   placeName: placeName,
  //   location: location,
  //   image: image
  // };

  return dispatch => {
    dispatch(actions.uiStartLoading());
    fetch('https://us-central1-rn-test-x1.cloudfunctions.net/storeImage', {
      method: 'POST',
      body: JSON.stringify({
        image: image.base64
      })
    })
      .catch(err => {
        console.log(err);
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location: location,
          image: parsedRes.imageUrl
        };

        return fetch('https://rn-test-x1.firebaseio.com/places.json', {
          method: 'POST',
          body: JSON.stringify(placeData)
        });
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong, please try again');
        dispatch(actions.uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(actions.uiStopLoading());
      });
  };
};

export const getPlaces = () => {
  return dispatch => {
    fetch('https://rn-test-x1.firebaseio.com/places.json')
      .catch(err => {
        alert('Somthing went wrong, sorry');
        console.log(err);
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log('Fetched data: ', parsedRes);
        const places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            key: key
          });
        }
        dispatch(setPlaces(places));
      });
  };
};

export const setPlaces = places => {
  return {
    type: actionTypes.SET_PLACES,
    places: places
  };
};

export const deletePlace = key => {
  return dispatch => {
    dispatch(removePlace(key));
    fetch('https://rn-test-x1.firebaseio.com/places/' + key + '.json', {
      method: 'DELETE'
    })
      .catch(err => {
        alert('Somthing went wrong, sorry');
        console.log(err);
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log('Done!');
      });
  };
};

export const removePlace = key => {
  return {
    type: actionTypes.REMOVE_PLACE,
    key: key
  };
};
