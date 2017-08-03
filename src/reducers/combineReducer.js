import {combineReducers} from 'redux';
import CounterReducer from './CounterReducer';

const combineReducer = combineReducers({
    counterReducer: CounterReducer.reduce,
});

export default combineReducer;
