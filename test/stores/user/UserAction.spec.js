import Chance from 'chance';
import UserAction from '../../../src/stores/user/UserAction';

describe('UserAction', () => {
    const chance = new Chance();

    test('should create an action', () => {
        const actual = UserAction.loadUser();
        const expected = {
            type: UserAction.LOAD_USER,
        };

        expect(actual).toEqual(expected);
    });
});
