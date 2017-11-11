import * as React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import ModalAction from '../../stores/modal/ModalAction';
import KeyCode from '../../constants/KeyCode';

const withBaseModal = (ModalContent) => {

    const mapStateToProps = (state) => ({});
    const mapDispatchToProps = (dispatch) => ({
        closeModal: () => dispatch(ModalAction.closeModal()),
    });

    class BaseModal extends React.Component {

        static defaultProps = {
            isRequired: false,
        };

        _onKeyDownModalHandler = this._onKeyDownModal.bind(this);
        _onClickOverlayHandler = this._onClickOverlay.bind(this);

        componentDidMount() {
            if (!this.props.isRequired) {
                global.window.addEventListener('keydown', this._onKeyDownModalHandler);
            }
        }

        componentWillUnmount() {
            if (!this.props.isRequired) {
                global.window.removeEventListener('keydown', this._onKeyDownModalHandler);
            }
        }

        render() {
            return (
                <div
                    className="modal"
                    role="alert"
                    aria-live="polite"
                >
                    <div
                        className={this._buildModalOverlayClassames()}
                        onClick={this._onClickOverlayHandler}
                    />
                    <ModalContent {...this.props} />
                </div>
            );
        }

        _onClickOverlay(event) {
            if (!this.props.isRequired) {
                this.props.closeModal();
            }
        }

        _onKeyDownModal(event) {
            if (event.keyCode === KeyCode.ESCAPE) {
                event.preventDefault();

                this.props.closeModal();
            }
        }

        _buildModalOverlayClassames() {
            return classNames({
                'modal-overlay': true,
                'modal-overlay_required': this.props.isRequired,
            });
        }

    }

    return connect(mapStateToProps, mapDispatchToProps)(BaseModal);

};

export default withBaseModal;
