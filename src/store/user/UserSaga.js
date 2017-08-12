import {put} from 'redux-saga/effects';
import UserAction from './UserAction';
import LoadingAction from '../loading/LoadingAction';

class UserSaga {

    static* loadUser(action) {
        yield put({
            type: LoadingAction.SET_LOADING,
            payload: true,
        });

        const response = yield fetch('https://randomuser.me/api/?inc=picture,name,email,phone,id,dob');
        const type = (response.status === 200) ? UserAction.LOAD_USER_SUCCESS : UserAction.LOAD_USER_FAIL;

        let data = null;

        if (response.status === 200) {
            const json = yield response.json();

            data = json.results[0];
        }

        yield put({
            type,
            payload: data,
            meta: null,
            error: response.error,
        });

        yield put({
            type: LoadingAction.SET_LOADING,
            payload: false,
        });
    }

}

export default UserSaga;
