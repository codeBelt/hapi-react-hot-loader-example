import * as React from 'react';
import {connect} from 'react-redux';
import MetaAction from '../../stores/meta/MetaAction';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    setMeta: (meta) => dispatch(MetaAction.setMeta(meta)),
});

class About extends React.Component {

    componentWillMount() {
        this.props.setMeta({title: 'About Page'});
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">{'About'}</h1>
                    <p className="lead">{'This is a React Universal application that uses the libraries below.'}</p>
                </div>

                <div className="row marketing">
                    <div className="col-lg-6">
                        <h4>{'Webpack 3'}</h4>
                        <p>{'Facilitates creating builds for production, staging, and development.'}</p>

                        <h4>{'React'}</h4>
                        <p>{'Library to build user interfaces.'}</p>

                        <h4>{'React Router 4'}</h4>
                        <p>{'Adds routing to React'}</p>

                        <h4>{'React Saga'}</h4>
                        <p>{'Facilitates server side rendering and data fetching.'}</p>
                    </div>

                    <div className="col-lg-6">
                        <h4>{'Redux'}</h4>
                        <p>{'Manages data state in your application.'}</p>

                        <h4>{'Redux Form'}</h4>
                        <p>{'Manages form data in Redux and does validation.'}</p>

                        <h4>{'React Hot Loader 3'}</h4>
                        <p>{'Updates the browser with JavaScript and CSS changes without having to refresh the page.'}</p>

                        <h4>{'Hapi'}</h4>
                        <p>{'A node server framework.'}</p>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(About);
