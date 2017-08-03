import {createStore, applyMiddleware} from 'redux';
import combineReducer from '../reducers/combineReducer';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware, {END} from 'redux-saga';
import combineSaga from '../sagas/combineSaga';

class ProviderService {

    static createProviderStore(initialState = {}, isServerSide = false) {
        const sagaMiddleware = createSagaMiddleware();

        const store = createStore(
            combineReducer,
            initialState,
            composeWithDevTools(applyMiddleware(sagaMiddleware))
        );

        if (isServerSide) {
            store.runSaga = sagaMiddleware.run;
            store.endSaga = () => store.dispatch(END);
        } else {
            sagaMiddleware.run(combineSaga);
        }

        // Saga reloading https://gist.github.com/markerikson/dc6cee36b5b6f8d718f2e24a249e0491

        ProviderService._setupHotReloading(store);

        return store;
    }

    static _setupHotReloading(store) {
        if (module.hot) {
            module.hot.accept('../reducers/combineReducer', () => {
                const nextReducer = require('../reducers/combineReducer').default;

                store.replaceReducer(nextReducer);
            });
        }
    }

}

export default ProviderService;
