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

        ProviderService._setupHotReloading(store);

        return store;
    }

    static _setupHotReloading(store) {
        if (module.hot) {
            module.hot.accept('../reducers/rootReducer', () => {
                const nextReducer = require('../reducers/rootReducer').default;

                store.replaceReducer(nextReducer);
            });
        }
    }

}

export default ProviderService;
