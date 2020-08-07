import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import updateState from './cartReducer';

export default createStore(
    updateState,
);