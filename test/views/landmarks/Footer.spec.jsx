import React from 'react';
import {shallow, mount, render} from 'enzyme';
import Footer from '../../../src/views/landmarks/Footer';
import configureStore from 'redux-mock-store';

describe('Footer', () => {
    const initialState = {};
    const mockStore = configureStore();
    let store;
    let component;

    beforeEach(() => {
        store = mockStore(initialState);
        component = mount(<Footer />);
    });

    test('should match mapStateToProps', () => {
        // TODO: how to test mapStateToProps
    });

    test('should call X number of actions', () => {
        const actions = store.getActions();
        const actual = actions.length;
        const expected = 0;

        expect(actual).toBe(expected);
    });

});
