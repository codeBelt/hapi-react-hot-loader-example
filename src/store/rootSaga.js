import {all, fork, takeLatest} from 'redux-saga/effects';
import UserSaga from './user/UserSaga';
import UserAction from './user/UserAction';

export default function *rootSaga() {
    yield all([
        fork(UserSaga.loadUser),
        takeLatest(UserAction.LOAD_USER, UserSaga.loadUser),
    ]);
}
