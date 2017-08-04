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

                <div className="row marketing">
                    <div className="col-lg-6">
                        <h4>{'Subheading'}</h4>
                        <p>{'Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.'}</p>

                        <h4>{'Subheading'}</h4>
                        <p>{'Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.'}</p>

                        <h4>{'Subheading'}</h4>
                        <p>{'Maecenas sed diam eget risus varius blandit sit amet non magna.'}</p>
                    </div>

                    <div className="col-lg-6">
                        <h4>{'Subheading'}</h4>
                        <p>{'Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.'}</p>

                        <h4>{'Subheading'}</h4>
                        <p>{'Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.'}</p>

                        <h4>{'Subheading'}</h4>
                        <p>{'Maecenas sed diam eget risus varius blandit sit amet non magna.'}</p>
                    </div>
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

