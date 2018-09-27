import * as actionTypes from './actionsTypes'

export const tryAuth = (authData) => {
  return {
    type: actionTypes.TRY_AUTH,
    authData: authData
  }
}