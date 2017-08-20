import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/styles.css';

import {AppContainer as ReactHotLoader} from 'react-hot-loader';
import {AsyncComponentProvider} from 'react-async-component';
import React from 'react';
import ReactDOM from 'react-dom';
import RouterWrapper from './RouterWrapper';
import ProviderService from './services/ProviderService';

const initialState = {
    ...window['__STATE__'],
    renderReducer: {
        isServerSide: false,
    },
};
const store = ProviderService.createProviderStore(initialState);
const rootEl = document.getElementById('root');

delete window['__STATE__'];

const renderApp = (Component) =>
    ReactDOM.render(
        <ReactHotLoader key={Math.random()}>
            <AsyncComponentProvider>
                <Component store={store} />
            </AsyncComponentProvider>
        </ReactHotLoader>,
        rootEl,
    );

renderApp(RouterWrapper);

if (module.hot) {
    module.hot.accept('./RouterWrapper', () => renderApp(RouterWrapper));
}
