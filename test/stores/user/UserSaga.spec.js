import 'fetch-everywhere';
import jest from 'jest';
import nock from 'nock';
import UserSaga from '../../../src/stores/user/UserSaga';
import {put} from 'redux-saga/effects';
import LoadingAction from '../../../src/stores/loading/LoadingAction';
import UserAction from '../../../src/stores/user/UserAction';

describe('UserSaga', () => {

    // https://codereviewvideos.com/course/react-redux-and-redux-saga-with-symfony-3/video/testing-javascript-s-fetch-with-jest-happy-path

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

    test('should loadUser', async () => {
        const expectedBody = {
            status: 200,
            results: [{}],
        };

        nock('https://randomuser.me')
            .get('/api/?inc=picture,name,email,phone,id,dob')
            .reply(200, expectedBody);

        const generator = UserSaga.loadUser();

        expect(generator.next().value).toEqual(put({
            type: LoadingAction.SET_LOADING,
            payload: true,
        }));

        // TODO: Do I use await here or should I use generator.next().value ?
        const response = await generator.next().value;
        const json = await response.json();

        expect(json).toEqual(expectedBody);

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
