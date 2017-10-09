import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../stores/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware, {END} from 'redux-saga';
import rootSaga from '../stores/rootSaga';

class ProviderService {

    static createProviderStore(initialState = {}, history = null, isServerSide = false) {
        const sagaMiddleware = createSagaMiddleware();

        const store = createStore(
            rootReducer,
            initialState,
            composeWithDevTools(applyMiddleware(
                sagaMiddleware,
                routerMiddleware(history),
            )),
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
            module.hot.accept('../stores/rootReducer', () => {
                const nextReducer = require('../stores/rootReducer').default; // eslint-disable-line global-require

                store.replaceReducer(nextReducer);
            });
        }
    }

}

export default ProviderService;
