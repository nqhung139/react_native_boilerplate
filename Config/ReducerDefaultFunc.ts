import Immutable from 'seamless-immutable'

export const request = (state, { type }) =>
  Immutable.merge(state, { fetching: true, error: null, type })

export const success = (state, { type }) =>
  Immutable.merge(state, { fetching: false, error: null, type })

export const failure = (state, { error, type }) =>
  Immutable.merge(state, { fetching: false, error, type })
