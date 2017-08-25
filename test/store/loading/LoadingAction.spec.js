import Chance from 'chance';
import LoadingAction from '../../../src/store/loading/LoadingAction';

describe('LoadingAction', () => {
    const chance = new Chance();
    const expectedData = chance.bool();

    test('should create an action', () => {
        const actual = LoadingAction.showLoader(expectedData);
        const expected = {
            type: LoadingAction.SET_LOADING,
            payload: expectedData,
        };

        expect(actual).toEqual(expected);
    });
});
