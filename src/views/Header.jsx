import * as React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="header clearfix">
                <nav>
                    <ul className="nav nav-pills float-right">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="contact">Contact</a>
                        </li>
                    </ul>
                </nav>
                <h3 className="text-muted">Project name</h3>
            </div>
        );
    }
}

export default Header;