import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/styles.css';

import ProviderWrapper from './views/ProviderWrapper';

const rootEl = document.getElementById('root');
const render = (Component) =>
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        rootEl
    );

render(ProviderWrapper);

module.hot && module.hot.accept('./views/ProviderWrapper', () => render(ProviderWrapper));
