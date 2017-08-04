import LoadingAction from './LoadingAction';

class LoadingReducer {

    static _initialState = {
        isLoading: false,
    };

    static reduce(state = LoadingReducer._initialState, action) {
        switch (action.type) {
            case LoadingAction.LOAD_USER_SUCCESS:
                return LoadingReducer._loadLoading(state, action);
            default:
                return state;
        }
    }

    static _loadLoading(state, action) {
        return {
            ...state,
            ...action.payload,
        };
    }

}

export default LoadingReducer;


