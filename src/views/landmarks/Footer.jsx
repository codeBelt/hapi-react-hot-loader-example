import * as React from 'react';

class Footer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    render() {
        return (
            <footer className="footer">
                <p>{'This footer is a deferred async component. It does not render server-side. It lazy loads on the client-side.'}</p>
            </footer>
        );
    }

}

export default Footer;
