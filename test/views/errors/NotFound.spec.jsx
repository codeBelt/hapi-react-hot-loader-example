import React from 'react';
import {Provider} from 'react-redux';
import {shallow, mount, render} from 'enzyme';
import configureStore from 'redux-mock-store';
import MetaAction from '../../../src/store/meta/MetaAction';
import NotFound from '../../../src/views/errors/NotFound';

describe('views/NotFound', () => {
    const initialState = {};
    const mockStore = configureStore();
    let store;
    let wrapper;
    let component;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(
            <Provider store={store}>
                <NotFound />
            </Provider>
        );

        component = wrapper.find(NotFound).first();
    });

    test('should match mapStateToProps', () => {
        // TODO: how to test mapStateToProps
    });

    test('should call setMeta action', () => {
        const actions = store.getActions();
        const actual = actions[0];
        const expected = {
            type: MetaAction.SET_META,
            payload: {
                title: '404 Page Not Found',
            },
        };

        expect(actual).toEqual(expected);
    });

    test('should call X number of actions', () => {
        const actions = store.getActions();
        const actual = actions.length;
        const expected = 1;

        expect(actual).toBe(expected);
    });

});
