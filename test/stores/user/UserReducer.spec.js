import UserReducer from '../../../src/stores/user/UserReducer';
import UserAction from '../../../src/stores/user/UserAction';

describe('UserReducer', () => {

    test('should return the initial state', () => {
        const actual = UserReducer.reduce();
        const expected = UserReducer._initialState;

        expect(actual).toEqual(expected);
    });

    test('should set user data', () => {
        const action = {
            type: UserAction.LOAD_USER,
            payload: UserReducer._initialState,
        };
        const actual = UserReducer.reduce(undefined, action);
        const expected = action.payload;

        expect(actual).toEqual(expected);
    });

});
