import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/styles.css';

import {AppContainer} from 'react-hot-loader';
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
