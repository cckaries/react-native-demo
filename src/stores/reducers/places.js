import * as actionTypes from '../actions/actionTypes';
import placeImg from '../../assets/img1.jpg';

const initialState = {
  places: [],
  placeAdded: false
};

const addPlace = (state, action) => {
  return {
    ...state,
    places: state.places.concat({
      key: Math.random(0, 10000).toString(),
      name: action.placeName,
      image: {
        uri: action.image.uri
      },
      location: action.location
    })
  };
};

const removePlace = (state, action) => {
  return {
    ...state,
    places: state.places.filter(place => {
      return place.key !== action.key;
    })
  };
};

const setPlaces = (state, action) => {
  return {
    ...state,
    places: action.places
  };
};

const placeAdded = (state, action) => {
  return {
    ...state,
    placeAdded: false
  }
}

const startAddPlace = (state, action) => {
  return {
    ...state,
    placeAdded: false
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLACE:
      return addPlace(state, action);
    case actionTypes.REMOVE_PLACE:
      return removePlace(state, action);
    case actionTypes.SET_PLACES:
      return setPlaces(state, action);
    case actionTypes.PLACE_ADDED:
      return placeAdded(state, action);
    case actionTypes.START_ADD_PLACE:
      return startAddPlace(state, action);
    default:
      return state;
  }
};

export default reducer;
