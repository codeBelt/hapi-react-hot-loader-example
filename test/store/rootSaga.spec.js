import 'fetch-everywhere';
import jest from 'jest';
import {fork, takeLatest} from 'redux-saga/effects';
import rootSaga from '../../src/store/rootSaga';
import UserAction from '../../src/store/user/UserAction';
import UserSaga from '../../src/store/user/UserSaga';

describe('rootSaga', () => {
    const expectStoreData = {
        renderReducer: {
            isServerSide: true,
        },
    };

    // TODO: mock 'const store = yield select();` to return expectStoreData.
    // const select = jest.fn();

    test('should start root saga', async () => {
        const generator = rootSaga();

        expect(generator.next().value).toEqual(expectStoreData);

        expect(generator.next().value).toEqual([
            fork(UserSaga.loadUser),
            takeLatest(UserAction.LOAD_USER, UserSaga.loadUser),
        ]);
    });

});
