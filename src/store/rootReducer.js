import {combineReducers} from 'redux';
import UserReducer from './user/UserReducer';

const rootReducer = combineReducers({
    userReducer: UserReducer.reduce,
});

export default rootReducer;
