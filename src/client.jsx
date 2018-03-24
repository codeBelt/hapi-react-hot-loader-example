import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/screen.scss';

import 'fetch-everywhere';
import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from 'history';
import {AppContainer as ReactHotLoader} from 'react-hot-loader';
import {AsyncComponentProvider} from 'react-async-component';
import bootstrap from 'react-async-bootstrapper';
import RouterWrapper from './RouterWrapper';
import ProviderService from './services/ProviderService';

const codeSplittingState = window.__ASYNC_COMPONENTS_STATE__;
const serverState = window.__STATE__;
const initialState = {
    ...serverState,
    renderReducer: {
        ...serverState.renderReducer,
        isServerSide: false,
    },
};
const history = createBrowserHistory();
const store = ProviderService.createProviderStore(initialState, history);
const rootEl = document.getElementById('root');

delete window.__STATE__;
delete window.__ASYNC_COMPONENTS_STATE__;

const composeApp = (Component) => (
    <ReactHotLoader key={Math.random()}>
        <AsyncComponentProvider rehydrateState={codeSplittingState}>
            <Component store={store} history={history} />
        </AsyncComponentProvider>
    </ReactHotLoader>
);

const renderApp = () => {
    const routerWrapper = require('./RouterWrapper').default; // eslint-disable-line global-require

    ReactDOM.hydrate(
        composeApp(routerWrapper),
        rootEl,
    );
};

bootstrap(composeApp(RouterWrapper)).then(renderApp);

if (module.hot) {
    module.hot.accept('./RouterWrapper', renderApp);
}
