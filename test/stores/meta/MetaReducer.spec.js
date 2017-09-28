import Chance from 'chance';
import MetaReducer from '../../../src/stores/meta/MetaReducer';
import MetaAction from '../../../src/stores/meta/MetaAction';

describe('MetaReducer', () => {
    const chance = new Chance();

    test('should return the initial state', () => {
        const actual = MetaReducer.reduce(undefined, {});
        const expected = MetaReducer._initialState;

        expect(actual).toEqual(expected);
    });

    test('should set title and description', () => {
        const action = {
            type: MetaAction.SET_META,
            payload: {
                title: chance.string(),
                description: chance.string(),
            },
        };
        const actual = MetaReducer.reduce(undefined, action);
        const expected = action.payload;

        expect(actual).toEqual(expected);
    });

});
