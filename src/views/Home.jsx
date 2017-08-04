import * as React from 'react';
import {connect} from 'react-redux';
import UserAction from '../store/user/UserAction';

class Home extends React.Component {

    render() {
        const user = this.props.user;

        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">{user.name.title} {user.name.first} {user.name.last}</h1>
                    <img
                        className="rounded mx-auto d-block"
                        src={user.picture.large}
                        alt="Users Photo"
                    />
                    <p>
                        <button
                            className="btn btn-lg btn-success"
                            role="button"
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

const mapStateToProps = (state) => ({
    user: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
    loadUser: () => dispatch(UserAction.loadUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

