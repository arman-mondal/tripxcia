// reducers/index.js
import { combineReducers } from 'redux';
import queryReducer from './queryReducer';
// other reducers...

const rootReducer = combineReducers({
  query: queryReducer,
  // other reducers...
});

export default rootReducer;
