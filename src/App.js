import React, {Component} from 'react';
import Layout from './Layout';
import Counter from './Counter';
import Footer from "./views/Footer";
import Header from "./views/Header";
import Home from "./views/Home";

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182
export default class App extends Component {
    render() {
        return (
            <div className="container">
                <Header/>
                <Home/>
                <Footer/>
            </div>
        );
    }
}
