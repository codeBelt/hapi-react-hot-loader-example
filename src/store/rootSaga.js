import {all, fork, takeLatest, select} from 'redux-saga/effects';
import UserSaga from './user/UserSaga';
import UserAction from './user/UserAction';

export default function* rootSaga() {
    const store = yield select();
    const isServerSide = store.renderReducer.isServerSide;

    const filteredSagas = [
        isServerSide ? fork(UserSaga.loadUser) : null,
        takeLatest(UserAction.LOAD_USER, UserSaga.loadUser),
    ].filter(Boolean);

    yield all(filteredSagas);
}
