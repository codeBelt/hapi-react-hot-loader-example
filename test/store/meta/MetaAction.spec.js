import MetaAction from '../../../src/store/meta/MetaAction';

describe('action/MetaAction', () => {
    const expectedData = {
        title: 'Home Page',
        description: 'This is the Home Page',
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
