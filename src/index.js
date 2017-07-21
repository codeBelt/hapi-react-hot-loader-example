import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/styles.css';

// https://v4-alpha.getbootstrap.com/examples/

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
