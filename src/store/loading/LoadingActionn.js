class LoadingAction {

    static SET_LOADING = 'LoadingAction.SET_LOADING';

    static showLoader(isLoading) {
        return {
            type: LoadingAction.SET_LOADING,
            payload: isLoading,
        };
    }

}

export default LoadingAction;
