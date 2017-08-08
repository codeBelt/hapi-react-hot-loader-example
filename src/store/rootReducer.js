import {combineReducers} from 'redux';
import UserReducer from './user/UserReducer';
import LoadingReducer from './loading/LoadingReducer';
import MetaReducer from './meta/MetaReducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
    userReducer: UserReducer.reduce,
    loadingReducer: LoadingReducer.reduce,
    metaReducer: MetaReducer.reduce,
});

export default rootReducer;
