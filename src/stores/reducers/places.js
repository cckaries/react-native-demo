import * as actionTypes from '../actions/actionsTypes';
import placeImg from '../../assets/img1.jpg';

const initialState = {
  places: []
  // selectedPlace: null
};

const addPlace = (state, action) => {
  return {
    ...state,
    places: state.places.concat({
      key: Math.random(0, 10000).toString(),
      name: action.placeName,
      // image: {
      //   uri: 'https://images.unsplash.com/photo-1449312605762-1df9d89ee6b7?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=2ff905f2786e370a548ce8141fb0b5e0'
      // }
      image: placeImg,
      location: action.location
    })
  };
};

const deletePlace = (state, action) => {
  return {
    ...state,
    places: state.places.filter(place => {
      return place.key !== action.placeKey;
    })
    // selectedPlace: null
  };
};

// const selectPlace = (state, action) => {
//   return {
//     ...state,
//     selectedPlace: state.places.find(place => {
//       return place.key === action.placeKey;
//     })
//   }
// };

// const deselectPlace = (state, action) => {
//   return {
//     ...state,
//     selectedPlace: null
//   }
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLACE:
      return addPlace(state, action);
    case actionTypes.DELETE_PLACE:
      return deletePlace(state, action);
    // case actionTypes.SELECT_PLACE: return selectPlace(state, action);
    // case actionTypes.DESELECT_PLACE: return deselectPlace(state, action);
    default:
      return state;
  }
};

export default reducer;
