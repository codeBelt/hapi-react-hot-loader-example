import * as React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import UserAction from '../../stores/user/UserAction';
import MetaAction from '../../stores/meta/MetaAction';

const mapStateToProps = (state) => ({
    user: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
    historyPush: (route) => dispatch(push(route)),
    loadUser: () => dispatch(UserAction.loadUser()),
    setMeta: (meta) => dispatch(MetaAction.setMeta(meta)),
});

class Home extends React.Component {

    _onClickPushExampleHandler = this._onClickPushExample.bind(this);

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
                <button onClick={this._onClickPushExampleHandler}>{'Go to About'}</button>
            </div>
        );
    }

    _onClickPushExample(event) {
        event.preventDefault();

        this.props.historyPush('/About');
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

