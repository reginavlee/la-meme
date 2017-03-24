import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import reducer from './Reducer'

export default () => {
  const rootReducer = combineReducers({ reducer })
  return configureStore(rootReducer)
}