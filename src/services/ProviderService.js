import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../store/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware, {END} from 'redux-saga';
import rootSaga from '../store/rootSaga';

class ProviderService {

    static createProviderStore(initialState = {}, isServerSide = false) {
        const sagaMiddleware = createSagaMiddleware();

        const store = createStore(
            rootReducer,
            initialState,
            composeWithDevTools(applyMiddleware(sagaMiddleware)),
        );

        if (isServerSide) {
            store.runSaga = sagaMiddleware.run;
            store.endSaga = () => store.dispatch(END);
        } else {
            sagaMiddleware.run(rootSaga);
        }

        ProviderService._setupHotReloading(store);

        return store;
    }

    static _setupHotReloading(store) {
        if (module.hot) {
            module.hot.accept('../store/rootReducer', () => {
                const nextReducer = require('../store/rootReducer').default; // eslint-disable-line global-require

                store.replaceReducer(nextReducer);
            });
        }
    }

}

export default ProviderService;
