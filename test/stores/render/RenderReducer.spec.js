import Chance from 'chance';
import RenderReducer from '../../../src/stores/render/RenderReducer';

describe('RenderReducer', () => {
    const chance = new Chance();

    test('should return the initial state', () => {
        const actual = RenderReducer.reduce(undefined, {});
        const expected = RenderReducer._initialState;

        expect(actual).toEqual(expected);
    });

    test('should set isServerSide state', () => {
        const state = {
            isServerSide: chance.bool(),
        };
        const actual = RenderReducer.reduce(state, {});
        const expected = state;

        expect(actual).toEqual(expected);
    });

});
