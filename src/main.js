import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/styles.css';

import ProviderWrapper from './views/ProviderWrapper';
import ProviderService from './services/ProviderService';

const rootEl = document.getElementById('root');
const initialState = window['__STATE__'];
const store = ProviderService.createProviderStore(initialState);

delete window['__STATE__'];

const render = (Component) =>
    ReactDOM.render(
        <AppContainer>
            <Component store={store} />
        </AppContainer>,
        rootEl
    );

render(ProviderWrapper);

if (module.hot) {
    module.hot.accept('./views/ProviderWrapper', () => render(ProviderWrapper));

    module.hot.accept('./reducers/rootReducer', () => {
        const nextReducer = require('./reducers/rootReducer');

        store.replaceReducer(nextReducer);
    });
}

// import 'babel-polyfill';
// https://gist.github.com/markerikson/dc6cee36b5b6f8d718f2e24a249e0491
// https://github.com/glenjamin/ultimate-hot-reloading-example/blob/master/client/server-render.js
