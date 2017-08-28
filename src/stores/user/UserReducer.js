import UserAction from './UserAction';

class UserReducer {

    static _initialState = {
        name: {
            title: '',
            first: '',
            last: '',
        },
        email: '',
        dob: '',
        phone: '',
        id: {
            name: '',
            value: '',
        },
        picture: {
            large: '',
            medium: '',
            thumbnail: '',
        },
    };

    static reduce(state = UserReducer._initialState, action) {
        switch (action.type) {
            case UserAction.LOAD_USER_SUCCESS:
                return UserReducer._loadUser(state, action);
            default:
                return state;
        }
    }

    static _loadUser(state, action) {
        return {
            ...state,
            ...action.payload,
        };
    }

}

export default UserReducer;
