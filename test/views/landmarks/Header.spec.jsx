import React from 'react';
import {shallow, mount, render} from 'enzyme';
import Header from '../../../src/views/landmarks/Header';
import configureStore from 'redux-mock-store';
import { MemoryRouter as Router } from 'react-router-dom';

describe('Header', () => {
    const initialState = {};
    const mockStore = configureStore();
    let store;
    let wrapper;
    let component;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(
            <Router>
                <Header />
            </Router>
        );

        component = wrapper.find(Header).first();
    });

    test('should match routes', () => {
        // TODO: test navlink route
    });

    test('should call X number of actions', () => {
        const actions = store.getActions();
        const actual = actions.length;
        const expected = 0;

        expect(actual).toBe(expected);
    });

});
