import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/styles.css';

import RouterWrapper from './RouterWrapper';
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

render(RouterWrapper);

if (module.hot) {
    module.hot.accept('./RouterWrapper', () => render(RouterWrapper));
}
