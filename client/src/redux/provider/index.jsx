import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from '../reducers/index';

// Create the Redux store
const store = createStore(rootReducer);

const ReduxProvider = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default ReduxProvider;