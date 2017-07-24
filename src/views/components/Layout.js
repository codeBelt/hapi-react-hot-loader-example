import * as React from 'react';

class Layout extends React.PureComponent {

    render() {
        return (
            <div>
                <h1>{'Hellos, sdf!'}</h1>
                {this.props.children}
            </div>
        );
    }

}

export default Layout;
