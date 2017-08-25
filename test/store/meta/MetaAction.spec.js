import Chance from 'chance';
import MetaAction from '../../../src/store/meta/MetaAction';

describe('MetaAction', () => {
    const chance = new Chance();
    const expectedData = {
        title: chance.string(),
        description: chance.string(),
    };

    test('should create an action', () => {
        const actual = MetaAction.setMeta(expectedData);
        const expected = {
            type: MetaAction.SET_META,
            payload: expectedData,
        };

        expect(actual).toEqual(expected);
    });
});
