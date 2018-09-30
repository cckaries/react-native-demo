import * as actionTypes from './actionTypes';
import * as actions from './index';

export const startAddPlace = () => {
  return {
    type: actionTypes.START_ADD_PLACE
  };
};

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(actions.uiStartLoading());
    dispatch(actions.authGetToken())
      .catch(() => {
        alert('No valid token found!');
      })
      .then(token => {
        authToken = token;
        return fetch(
          'https://us-central1-rn-test-x1.cloudfunctions.net/storeImage',
          {
            method: 'POST',
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              Authorization: 'Bearer ' + authToken
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong, please try again!');
        dispatch(actions.uiStopLoading());
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        console.log('pass');
        const placeData = {
          name: placeName,
          location: location,
          image: parsedRes.imageUrl,
          imagePath: parsedRes.imagePath
        };
        return fetch(
          'https://rn-test-x1.firebaseio.com/places.json?auth=' + authToken,
          {
            method: 'POST',
            body: JSON.stringify(placeData)
          }
        );
      })
      .then(res => res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(actions.uiStopLoading());
        dispatch(placeAdded());
      })
      .catch(err => {
        console.log(err);
        alert('Something went very wrong, please try again!');
        dispatch(actions.uiStopLoading());
      });
  };
};

export const placeAdded = () => {
  return {
    type: actionTypes.PLACE_ADDED
  };
};

export const getPlaces = () => {
  return dispatch => {
    dispatch(actions.authGetToken())
      .catch(() => {
        alert('No valid token found!');
      })
      .then(token => {
        return fetch(
          'https://rn-test-x1.firebaseio.com/places.json?auth=' + token
        );
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
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
      })
      .catch(err => {
        alert('Somthing went wrong, sorry');
        console.log(err);
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
    dispatch(actions.authGetToken())
      .catch(() => {
        alert('No valid token found!');
      })
      .then(token => {
        dispatch(removePlace(key));
        return fetch(
          'https://rn-test-x1.firebaseio.com/places/' +
            key +
            '.json?auth=' +
            token,
          {
            method: 'DELETE'
          }
        );
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        console.log('Done!');
      })
      .catch(err => {
        alert('Somthing went wrong, sorry');
        console.log(err);
      });
  };
};

export const removePlace = key => {
  return {
    type: actionTypes.REMOVE_PLACE,
    key: key
  };
};
