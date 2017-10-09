import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import UserReducer from './user/UserReducer';
import LoadingReducer from './loading/LoadingReducer';
import MetaReducer from './meta/MetaReducer';
import {reducer as formReducer} from 'redux-form';
import RenderReducer from './render/RenderReducer';

const reducers = {
    form: formReducer,
    loadingReducer: LoadingReducer.reduce,
    metaReducer: MetaReducer.reduce,
    renderReducer: RenderReducer.reduce,
    userReducer: UserReducer.reduce,
    router: routerReducer,
};

export default combineReducers(reducers);
