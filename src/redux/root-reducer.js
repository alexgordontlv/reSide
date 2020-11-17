import userReducer from './user/user.reducer';
import {combineReducers} from 'redux';
import customerReducer from './customers/customers.reducers';

export default combineReducers({
    user: userReducer
})