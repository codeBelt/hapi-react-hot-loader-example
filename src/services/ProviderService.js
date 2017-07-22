import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

class ProviderService {

    static createProviderStore(initialState = {}, isServerSide = false) {

        const store = createStore(
            rootReducer,
            initialState,
            composeWithDevTools(applyMiddleware())
        );

        return store;
    }

}

export default ProviderService;
