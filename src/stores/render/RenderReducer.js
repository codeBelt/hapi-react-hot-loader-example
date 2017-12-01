class RenderReducer {

    static _initialState = {
        isServerSide: true,
    };

    static reducer(state = RenderReducer._initialState, action) {
        return state;
    }

}

export default RenderReducer;
