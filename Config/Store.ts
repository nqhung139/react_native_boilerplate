import Reactotron from 'reactotron-react-native'
import { applyMiddleware, compose, createStore } from 'redux'
import sagaMiddlewareFactory from 'redux-saga'

import Config from './DebugConfig'
import appReducer from './Reducers'
import rootSaga from './Sagas'

// creates the store
const configureStore = (reducers, sagas) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Saga Middleware ------------- */

  let opts = {}
  if (Config.useReactotron) {
    const sagaMonitor = Reactotron.createSagaMonitor()
    opts = { sagaMonitor }
  }
  const sagaMiddleware = sagaMiddlewareFactory(opts)
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))
  // enhancers.push(autoRehydrate());

  /* ------------- AutoRehydrate Enhancer ------------- */

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron
    ? Reactotron.createStore
    : createStore
  const store = createAppropriateStore(reducers, compose(...enhancers))

  // kick off root saga
  sagaMiddleware.run(sagas)

  return store
}

export default () => configureStore(appReducer, rootSaga)
