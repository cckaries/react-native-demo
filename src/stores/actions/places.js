import * as actionTypes from './actionsTypes';

export const addPlace = placeName => {
  return {
    type: actionTypes.ADD_PLACE,
    placeName: placeName
  };
};

export const deletePlace = (key) => {
  return {
    type: actionTypes.DELETE_PLACE,
    placeKey: key
  };
};

// export const selectPlace = key => {
//   return {
//     type: actionTypes.SELECT_PLACE,
//     placeKey: key
//   };
// };

// export const deselectPlace = () => {
//   return {
//     type: actionTypes.DESELECT_PLACE
//   };
// };
