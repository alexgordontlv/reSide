import {createStore, applyMiddleware} from 'redux';
import rootReducer from './root-reducer';
import logger from 'redux-logger';

import { composeWithDevTools } from 'redux-devtools-extension';
const middlewares = []
if(process.env.NODE_ENV==='development'){
    middlewares.push(logger);;
}
const store = createStore(rootReducer, composeWithDevTools());

export default store;