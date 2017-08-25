import MetaAction from './MetaAction';

class MetaReducer {

    static _initialState = {
        title: 'Robert is cool',
        description: '',
    };

    static reduce(state = MetaReducer._initialState, action = {}) {
        switch (action.type) {
            case MetaAction.SET_META:
                return MetaReducer._setMeta(state, action);
            default:
                return state;
        }
    }

    static _setMeta(state, action) {
        return {
            ...state,
            ...action.payload,
        };
    }

}

export default MetaReducer;
