import * as React from 'react';
import {connect} from 'react-redux';
import UserAction from '../store/user/UserAction';
import MetaAction from '../store/meta/MetaAction';

const mapStateToProps = (state) => ({
    user: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
    loadUser: () => dispatch(UserAction.loadUser()),
    setMeta: (meta) => dispatch(MetaAction.setMeta(meta)),
});

class Home extends React.Component {

    componentWillMount() {
        this.props.setMeta({
            title: 'Home Page',
            description: 'This is the Home Page',
        });
    }

    render() {
        const user = this.props.user;

        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">{user.name.title} {user.name.first} {user.name.last}</h1>
                    <img
                        className="rounded mx-auto d-block"
                        src={user.picture.large}
                        alt=""
                    />
                    <p>
                        <button
                            className="btn btn-lg btn-success"
                            onClick={this.props.loadUser}
                        >
                            {'Load Another User'}
                        </button>
                    </p>
                </div>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

