import * as React from 'react';
import {NavLink} from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <div className="header clearfix">
                <nav>
                    <ul className="nav nav-pills float-right">
                        <li className="nav-item">
                            <NavLink
                                exact
                                className="nav-link"
                                activeClassName="active"
                                to="/"
                            >
                                {'Home'}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                to="/about"
                            >
                                {'About'}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                to="/contact"
                            >
                                {'Contact'}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <h3 className="text-muted">Project name</h3>
            </div>
        );
    }
}

export default Header;
