import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/styles.css';

const rootEl = document.getElementById('root');
const render = (Component) =>
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        rootEl
    );

render(App);

module.hot && module.hot.accept('./App', () => render(App));
