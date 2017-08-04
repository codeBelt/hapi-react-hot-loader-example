import {combineReducers} from 'redux';
import UserReducer from './user/UserReducer';
import LoadingReducer from './loading/LoadingReducer';
import MetaReducer from './meta/MetaReducer';

const rootReducer = combineReducers({
    userReducer: UserReducer.reduce,
    loadingReducer: LoadingReducer.reduce,
    metaReducer: MetaReducer.reduce,
});

export default rootReducer;
