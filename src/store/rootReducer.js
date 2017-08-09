import {combineReducers} from 'redux';
import UserReducer from './user/UserReducer';
import LoadingReducer from './loading/LoadingReducer';
import MetaReducer from './meta/MetaReducer';
import RenderReducer from './render/RenderReducer';

const rootReducer = combineReducers({
    loadingReducer: LoadingReducer.reduce,
    metaReducer: MetaReducer.reduce,
    renderReducer: RenderReducer.reduce,
    userReducer: UserReducer.reduce,
});

export default rootReducer;
