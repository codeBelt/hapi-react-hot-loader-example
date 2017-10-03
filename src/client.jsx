import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/styles.css';

import 'fetch-everywhere';
import {AppContainer as ReactHotLoader} from 'react-hot-loader';
import {AsyncComponentProvider} from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import React from 'react';
import ReactDOM from 'react-dom';
import RouterWrapper from './RouterWrapper';
import ProviderService from './services/ProviderService';

const codeSplittingState = window.__ASYNC_COMPONENTS_STATE__;
const initialState = {
    ...window.__STATE__,
    renderReducer: {
        isServerSide: false,
    },
};
const store = ProviderService.createProviderStore(initialState);
const rootEl = document.getElementById('root');

delete window.__STATE__;
delete window.__ASYNC_COMPONENTS_STATE__;

const composeApp = (Component) => (
    <ReactHotLoader key={Math.random()}>
        <AsyncComponentProvider rehydrateState={codeSplittingState}>
            <Component store={store} />
        </AsyncComponentProvider>
    </ReactHotLoader>
);

const renderApp = () => {
    const routerWrapper = require('./RouterWrapper').default; // eslint-disable-line global-require

    ReactDOM.render(
        composeApp(routerWrapper),
        rootEl,
    );
};

asyncBootstrapper(composeApp(RouterWrapper)).then(renderApp);

if (module.hot) {
    module.hot.accept('./RouterWrapper', renderApp);
}
