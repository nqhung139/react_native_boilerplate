import { createActions, createReducer } from 'reduxsauce'
import * as Immutable from 'seamless-immutable'

import { failure, request, success } from '../../Config/ReducerDefaultFunc'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['phone', 'password'],
  loginSuccess: null,
  loginFailure: ['error'],
  updateProfile: ['info'],
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  type: '',
  userInfo: {},
})

/* ------------- Reducers ------------- */

export const update = (state, { type, info }) =>
  Immutable.merge(state, {
    type,
    userInfo: {
      ...state.info,
      ...info,
    },
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.UPDATE_PROFILE]: update,
})

/* ------------- Selectors ------------- */
