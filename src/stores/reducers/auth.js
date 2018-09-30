import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  expiryDate: null
};

const authSetToken = (state, action) => {
  return {
    ...state,
    token: action.token,
    expiryDate: action.expiryDate
  };
};

const authRemoveToken = (state, action) => {
  return {
    ...state,
    token: null,
    expiryDate: null
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SET_TOKEN:
      return authSetToken(state, action);
    case actionTypes.AUTH_REMOVE_TOKEN:
      return authRemoveToken(state, action);
    default:
      return state;
  }
};

export default reducer;
