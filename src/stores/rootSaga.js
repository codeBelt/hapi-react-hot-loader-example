import {all, fork, takeLatest, select} from 'redux-saga/effects';
import UserSaga from './user/UserSaga';
import UserAction from './user/UserAction';

export default function* rootSaga() {
    const filteredSagas = [
        fork(UserSaga.loadUser),
        takeLatest(UserAction.LOAD_USER, UserSaga.loadUser),
    ];

    yield all(filteredSagas);
}
