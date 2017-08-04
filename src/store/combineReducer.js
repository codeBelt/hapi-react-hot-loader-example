import {combineReducers} from 'redux';
import UserReducer from './user/UserReducer';

const combineReducer = combineReducers({
    userReducer: UserReducer.reduce,
});

export default combineReducer;
