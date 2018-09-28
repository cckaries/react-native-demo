import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false
};

const uiStartLoading = (state, action) => {
  return {
    ...state,
    isLoading: true
  };
};

const uiStopLoading = (state, action) => {
  return {
    ...state,
    isLoading: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UI_START_LOADING:
      return uiStartLoading(state, action);
    case actionTypes.UI_STOP_LOADING:
      return uiStopLoading(state, action);
    default:
      return state;
  }
};

export default reducer;
