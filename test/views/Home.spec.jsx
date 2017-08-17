import React from 'react';
import {Provider} from 'react-redux';
import {shallow, mount, render} from 'enzyme';
import Home from '../../src/views/Home';
import configureStore from 'redux-mock-store';
import MetaAction from '../../src/store/meta/MetaAction';
import UserAction from '../../src/store/user/UserAction';

describe('views/Home', () => {
    const initialState = {
        userReducer: {
            gender: 'male',
            name: {
                title: 'mr',
                first: 'romain',
                last: 'hoogmoed',
            },
            location: {
                street: '1861 jan pieterszoon coenstraat',
                city: 'maasdriel',
                state: 'zeeland',
                postcode: 69217,
            },
            email: 'romain.hoogmoed@example.com',
            dob: '1983-07-14 07:29:45',
            phone: '(656)-976-4980',
            id: {
                name: 'BSN',
                value: '04242023',
            },
            picture: {
                large: 'https://randomuser.me/api/portraits/men/83.jpg',
                medium: 'https://randomuser.me/api/portraits/med/men/83.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/thumb/men/83.jpg',
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

    it('should match mapStateToProps', () => {
        // TODO: how to test mapStateToProps
    });

    it('should display users name', () => {
        const actual = component.find('h1').text();
        const expected = `${initialState.userReducer.name.title} ${initialState.userReducer.name.first} ${initialState.userReducer.name.last}`;

        expect(actual).toBe(expected);
    });

    it('should display correct image', () => {
        const actual = component.find('img').prop('src');
        const expected = initialState.userReducer.picture.large;

        expect(actual).toBe(expected);
    });

    it('should call setMeta action', () => {
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

    it('should call loadUser action on button click', () => {
        component.find('button').simulate('click');

        const actions = store.getActions();
        const actual = actions[1];
        const expected = {
            type: UserAction.LOAD_USER,
        };

        expect(actual).toEqual(expected);
    });

    it('should call X number of actions', () => {
        component.find('button').simulate('click');

        const actions = store.getActions();
        const actual = actions.length;
        const expected = 2;

        expect(actual).toBe(expected);
    });

});
