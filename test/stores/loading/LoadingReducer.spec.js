import Chance from 'chance';
import LoadingReducer from '../../../src/stores/loading/LoadingReducer';
import LoadingAction from '../../../src/stores/loading/LoadingAction';

describe('LoadingAction', () => {
    const chance = new Chance();

    test('should return the initial state', () => {
        const actual = LoadingReducer.reduce(undefined, {});
        const expected = LoadingReducer._initialState;

        expect(actual).toEqual(expected);
    });

    test('should set loading', () => {
        const action = {
            type: LoadingAction.SET_LOADING,
            payload: chance.bool(),
        };
        const actual = LoadingReducer.reduce(undefined, action);
        const expected = {
            isLoading: action.payload,
        };

        expect(actual).toEqual(expected);
    });

});
