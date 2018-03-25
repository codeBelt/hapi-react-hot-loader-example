import * as React from 'react';
import {form2js} from 'form2js';
import withBaseModal from './withBaseModal';
import InputField from '../components/InputField';

class ExampleFormModal extends React.Component {

    _formElement = null;
    _onClickAcceptHandler = this._onClickAccept.bind(this);

    render() {
        return (
            <section className="modal-content">
                <h2 className="modal-header modal-header_left">{'Modal Form Title'}</h2>
                <div className="modal-body">
                    {this._buildFormJsx()}
                </div>
                <div className="modal-footer modal-footer_stack">
                    <button onClick={this.props.closeModal}>
                        {'Cancel'}
                    </button>
                    <button onClick={this._onClickAcceptHandler}>
                        {'Accept'}
                    </button>
                </div>
            </section>
        );
    }

    _buildFormJsx() {
        return (
            <form
                autoComplete="off"
                className="modalForm u-validate"
                noValidate={true}
                ref={(element) => {
                    this._formElement = element;
                }}
            >
                <p className="modalForm-warning">
                    {'This is an example of a custom modal. The "isRequired" attribute is set to "true" which prevents the user from clicking the esc key or click outside of the modal to close it. It also has form validation.' }
                </p>
                <div className="modalForm-item">
                    <label
                        htmlFor="modal-form-name"
                        className="modalForm-item-label"
                    >
                        {'Name'}<sup>{'*'}</sup>
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'modal-form-name'}
                            name="name"
                            isRequired={true}
                        />
                    </div>
                </div>
                <div className="modalForm-item">
                    <label
                        htmlFor="modal-form-exposure-limit"
                        className="modalForm-item-label"
                    >
                        {'Age'}<sup>{'*'}</sup>
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'example-form-age'}
                            name="age"
                            step={'1'}
                            type={'number'}
                            isRequired={true}
                        />
                    </div>
                </div>
                <div className="modalForm-item">
                    <label
                        htmlFor="modal-form-molecular-weight"
                        className="modalForm-item-label"
                    >
                        {'Email'}<sup>{'*'}</sup>
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'example-form-modal-email'}
                            name="email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                            isRequired={true}
                        />
                    </div>
                </div>
                <div className="modalForm-item">
                    <label
                        htmlFor="example-form-modal"
                        className="modalForm-item-label"
                    >
                        {'Address'}
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'example-form-modal-address'}
                            name="address"
                        />
                    </div>
                </div>
            </form>
        );
    }

    _onClickAccept(event) {
        event.preventDefault();

        if (this._formElement.checkValidity()) {
            const formData = form2js(this._formElement, '.', false);

            console.log(formData);

            this.props.closeModal();
        } else {
            this._formElement.classList.remove('u-validate');
        }
    }

}

export default withBaseModal(ExampleFormModal);
