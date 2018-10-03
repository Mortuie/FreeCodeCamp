import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Reducers from './Reducers';

const logger = createLogger();

export default createStore(Reducers, applyMiddleware(thunk, logger));