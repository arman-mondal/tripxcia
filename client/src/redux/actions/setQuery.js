// actions/queryActions.js
export const SET_QUERY = 'SET_QUERY';

export const setQuery = (query) => ({
  type: SET_QUERY,
  payload: query,
});
