import Chance from 'chance';
import React from 'react';
import {Provider} from 'react-redux';
import {shallow, mount, render} from 'enzyme';
import configureStore from 'redux-mock-store';
import MetaAction from '../../../src/store/meta/MetaAction';
import UserAction from '../../../src/store/user/UserAction';
import Home from '../../../src/views/home/Home';

describe('Home', () => {
    const chance = new Chance();
    const initialState = {
        userReducer: {
            gender: chance.string(),
            name: {
                title: chance.string(),
                first: chance.string(),
                last: chance.string(),
            },
            location: {
                street: chance.string(),
                city: chance.string(),
                state: chance.string(),
                postcode: chance.integer(),
            },
            email: chance.string(),
            dob: chance.string(),
            phone: chance.string(),
            id: {
                name: chance.string(),
                value: chance.string(),
            },
            picture: {
                large: chance.string(),
                medium: chance.string(),
                thumbnail: chance.string(),
            },
        },
    };
    const mockStore = configureStore();
    let store;
    let wrapper;
    let component;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        component = wrapper.find(Home).first();
    });

    test('should match mapStateToProps', () => {
        // TODO: how to test mapStateToProps
    });

    test('should display users name', () => {
        const actual = component.find('h1').text();
        const expected = `${initialState.userReducer.name.title} ${initialState.userReducer.name.first} ${initialState.userReducer.name.last}`;

        expect(actual).toBe(expected);
    });

    test('should display correct image', () => {
        const actual = component.find('img').prop('src');
        const expected = initialState.userReducer.picture.large;

        expect(actual).toBe(expected);
    });

    test('should call setMeta action', () => {
        const actions = store.getActions();
        const actual = actions[0];
        const expected = {
            type: MetaAction.SET_META,
            payload: {
                title: 'Home Page',
                description: 'This is the Home Page',
            },
        };

        expect(actual).toEqual(expected);
    });

    test('should call loadUser action on button click', () => {
        component.find('button').simulate('click');

        const actions = store.getActions();
        const actual = actions[1];
        const expected = {
            type: UserAction.LOAD_USER,
        };

        expect(actual).toEqual(expected);
    });

    test('should call X number of actions', () => {
        component.find('button').simulate('click');

        const actions = store.getActions();
        const actual = actions.length;
        const expected = 2;

        expect(actual).toBe(expected);
    });

});
