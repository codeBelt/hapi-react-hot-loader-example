import {combineReducers} from 'redux';
import CounterReducer from './counter/CounterReducer';

const combineReducer = combineReducers({
    counterReducer: CounterReducer.reduce,
});

export default combineReducer;
