import * as React from 'react';
import {connect} from 'react-redux';
import MetaAction from '../../store/meta/MetaAction';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    setMeta: (meta) => dispatch(MetaAction.setMeta(meta)),
});

class NotFound extends React.Component {

    componentWillMount() {
        this.props.setMeta({title: '404 Page Not Found'});
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">{'404'}</h1>
                    <p className="lead">{'We are sorry but the page you are looking for does not exist.'}</p>
                </div>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
