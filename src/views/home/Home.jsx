import * as React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import UserAction from '../../stores/user/UserAction';
import MetaAction from '../../stores/meta/MetaAction';
import GeneralModalAsync from '../modals/GeneralModalAsync';
import ModalAction from '../../stores/modal/ModalAction';
import ExampleFormModalAsync from '../modals/ExampleFormModalAsync';

const mapStateToProps = (state) => ({
    user: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
    historyPush: (route) => dispatch(push(route)),
    loadUser: () => dispatch(UserAction.loadUser()),
    setMeta: (meta) => dispatch(MetaAction.setMeta(meta)),
    addModal: (modal) => dispatch(ModalAction.addModal(modal)),
});

class Home extends React.Component {

    _onClickPushExampleHandler = this._onClickPushExample.bind(this);
    _onClickOpenModalHandler = this._onClickOpenModal.bind(this);
    _onClickFormModalHandler = this._onClickFormModal.bind(this);
    _onAcceptHandler = this._onAccept.bind(this);

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
                <ol>
                    <li><button onClick={this._onClickPushExampleHandler}>{'Example of Manual Routing'}</button></li>
                    <li><button onClick={this._onClickOpenModalHandler}>{'Open Example Generic Modal'}</button></li>
                    <li><button onClick={this._onClickFormModalHandler}>{'Open Example Form Modal'}</button></li>
                </ol>
            </div>
        );
    }

    _onClickPushExample(event) {
        event.preventDefault();

        this.props.historyPush('/About');
    }

    _onClickOpenModal(event) {
        event.preventDefault();

        const genericModal = (
            <GeneralModalAsync
                modalData={{
                    message: (
                        <div>
                            <h3>{'Generic Modal'}</h3>
                            <p>{'Example of a generic modal. Used for simple messages.'}</p>
                        </div>
                    ),
                    acceptLabel: 'Open Another Modal',
                    rejectLabel: 'Close',
                }}
                onAccept={this._onAcceptHandler}
            />
        );

        this.props.addModal(genericModal);
    }

    _onAccept(event) {
        event.preventDefault();

        const genericModal = (
            <GeneralModalAsync
                modalData={{
                    message: (
                        <div>
                            <p>{'Handles opening multiple modals.'}</p>
                        </div>
                    ),
                    acceptLabel: 'Ok',
                }}
            />
        );

        this.props.addModal(genericModal);
    }

    _onClickFormModal(event) {
        event.preventDefault();

        const formModal = (
            <ExampleFormModalAsync isRequired={true} />
        );

        this.props.addModal(formModal);
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

