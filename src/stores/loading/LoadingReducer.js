import LoadingAction from './LoadingAction';

class LoadingReducer {

    static _initialState = {
        isLoading: false,
    };

    static reducer(state = LoadingReducer._initialState, action) {
        switch (action.type) {
            case LoadingAction.SET_LOADING:
                return LoadingReducer._setLoading(state, action);
            default:
                return state;
        }
    }

    static _setLoading(state, action) {
        return {
            ...state,
            isLoading: action.payload,
        };
    }

}

export default LoadingReducer;
