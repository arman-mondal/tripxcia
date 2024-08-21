// reducers/queryReducer.js
import { SET_QUERY } from '../actions/setQuery';

const initialState = {
  type: '',
  query: '',
};

const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        ...action.payload, // Update the state with the new query object
      };
    default:
      return state;
  }
};

export default queryReducer;
