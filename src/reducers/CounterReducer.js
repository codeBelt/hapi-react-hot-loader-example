import CounterAction from '../actions/CounterAction';

class CounterReducer {

    static _initialState = {
        count: 0,
    };

    static reduce(state = CounterReducer._initialState, action) {
        switch (action.type) {
            case CounterAction.INCREASE_COUNT:
                return CounterReducer._increaseCount(state, action);
            default:
                return state;
        }
    }

    static _increaseCount(state, action) {
        return {
            ...state,
            count: action.payload,
        };
    }

}

export default CounterReducer;
