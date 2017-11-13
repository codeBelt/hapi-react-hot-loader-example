import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import UserReducer from './user/UserReducer';
import LoadingReducer from './loading/LoadingReducer';
import MetaReducer from './meta/MetaReducer';
import {reducer as formReducer} from 'redux-form';
import RenderReducer from './render/RenderReducer';
import ModalReducer from './modal/ModalReducer';

const reducers = {
    form: formReducer,
    loadingReducer: LoadingReducer.reduce,
    metaReducer: MetaReducer.reduce,
    modalReducer: ModalReducer.reduce,
    renderReducer: RenderReducer.reduce,
    router: routerReducer,
    userReducer: UserReducer.reduce,
};

export default combineReducers(reducers);
