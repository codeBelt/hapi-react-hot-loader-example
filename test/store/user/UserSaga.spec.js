import 'fetch-everywhere';
import jest from 'jest';
import nock from 'nock';
import UserSaga from '../../../src/store/user/UserSaga';
import {put} from 'redux-saga/effects';
import LoadingAction from '../../../src/store/loading/LoadingAction';
import UserAction from '../../../src/store/user/UserAction';

describe('UserSaga', () => {

    beforeEach(() => {
        // global.fetch = jest.fn().mockImplementation(() => {
        //     return new Promise((resolve, reject) => {
        //         resolve({
        //             ok: true,
        //             json: () => {
        //                 return {Id: '123'};
        //             },
        //         });
        //     });
        // });
    });

    afterEach(() => {
        nock.cleanAll();
    });

    test('should loadUser', () => {
        const expectedBody = {};

        // nock('https://randomuser.me')
        //     .get('/api/?inc=picture,name,email,phone,id,dob')
        //     .reply(200, expectedBody);

        const generator = UserSaga.loadUser();

        expect(generator.next().value).toEqual(put({
            type: LoadingAction.SET_LOADING,
            payload: true,
        }));

        expect(generator.next().value).toEqual({});

        expect(generator.next().value).toEqual(put({
            type: UserAction.LOAD_USER_SUCCESS,
            payload: {},
            meta: null,
            error: {},
        }));

        expect(generator.next().value).toEqual(put({
            type: LoadingAction.SET_LOADING,
            payload: false,
        }));
    });

});
