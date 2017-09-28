import 'fetch-everywhere';
import jest from 'jest';
import {fork, takeLatest} from 'redux-saga/effects';
import rootSaga from '../../src/stores/rootSaga';
import UserAction from '../../src/stores/user/UserAction';
import UserSaga from '../../src/stores/user/UserSaga';

describe('rootSaga', () => {
    const expectStoreData = {
        renderReducer: {
            isServerSide: true,
        },
    };

    // TODO: mock 'const stores = yield select();` to return expectStoreData.
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
