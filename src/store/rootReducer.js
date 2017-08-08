import {combineReducers} from 'redux';
import UserReducer from './user/UserReducer';
import LoadingReducer from './loading/LoadingReducer';
import MetaReducer from './meta/MetaReducer';
import {reducer as formReducer} from 'redux-form';
import RenderReducer from './render/RenderReducer';

const rootReducer = combineReducers({
    form: formReducer,
    loadingReducer: LoadingReducer.reduce,
    metaReducer: MetaReducer.reduce,
    renderReducer: RenderReducer.reduce,
    userReducer: UserReducer.reduce,
});

export default rootReducer;
