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
    loadingReducer: LoadingReducer.reducer,
    metaReducer: MetaReducer.reducer,
    modalReducer: ModalReducer.reducer,
    renderReducer: RenderReducer.reducer,
    router: routerReducer,
    userReducer: UserReducer.reducer,
};

export default combineReducers(reducers);
