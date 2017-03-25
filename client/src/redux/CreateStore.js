import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'

export default (rootReducer) => {
   
  const plugins = [ createLogger() ]

  const middleware = applyMiddleware(...plugins)

  const store = createStore(rootReducer, middleware)

  return store
}