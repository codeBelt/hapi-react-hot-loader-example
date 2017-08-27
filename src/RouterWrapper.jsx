import * as React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {StaticRouter} from 'react-router';
import AboutAsync from './views/about/AboutAsync';
import Home from './views/home/Home';
import Contact from './views/contact/Contact';
import FooterAsync from './views/landmarks/FooterAsync';
import Header from './views/landmarks/Header';
import NotFoundAsync from './views/errors/NotFoundAsync';

const RouterWrapper = (props) => {
    const Router = props.isServerSide ? StaticRouter : BrowserRouter;

    return (
        <Provider store={props.store}>
            <Router
                context={props.context}
                location={props.location}
            >
                <div className="container">
                    <Header />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={Home}
                        />
                        <Route
                            path="/about"
                            component={AboutAsync}
                        />
                        <Route
                            path="/contact"
                            component={Contact}
                        />
                        <Redirect
                            from="/old-path"
                            to="/"
                        />
                        <Route component={NotFoundAsync} />
                    </Switch>
                    <FooterAsync />
                </div>
            </Router>
        </Provider>
    );
};

export default RouterWrapper;
