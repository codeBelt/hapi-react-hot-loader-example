import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/screen.scss';

import bootstrap from 'react-async-bootstrapper';
import ProviderService from './services/ProviderService';
import React from 'react';
import ReactDOM from 'react-dom';
import RouterWrapper from './RouterWrapper';
import {AppContainer as ReactHotLoader} from 'react-hot-loader';
import {AsyncComponentProvider} from 'react-async-component';
import {createBrowserHistory} from 'history';

const initialState = {
    renderReducer: {
        isServerSide: false,
    },
};
const history = createBrowserHistory();
const store = ProviderService.createProviderStore(initialState, history);
const rootEl = document.getElementById('root');

const composeApp = (Component) => (
    <ReactHotLoader key={Math.random()}>
        <AsyncComponentProvider>
            <Component store={store} history={history} />
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

bootstrap(composeApp(RouterWrapper)).then(renderApp);

if (module.hot) {
    module.hot.accept('./RouterWrapper', renderApp);
}
