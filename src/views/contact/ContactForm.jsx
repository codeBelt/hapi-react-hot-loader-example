import * as React from 'react';
import {reduxForm, Field} from 'redux-form';

class ContactForm extends React.Component {

    _handleSubmitHandler = (formData) => this._onFormSubmit(formData);

    render() {
        const {handleSubmit, reset} = this.props;

        return (
            <form onSubmit={handleSubmit(this._handleSubmitHandler)}>
                <div className="form-group">
                    <Field
                        component={this._renderInputField}
                        label="Name"
                        name="name"
                        placeholder=""
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <Field
                        component={this._renderInputField}
                        label="Email"
                        name="email"
                        placeholder="example@example.com"
                        type="email"
                    />
                    <small
                        className="form-text text-muted"
                        id="emailHelp"
                    >
                        {'We\'ll never share your email with anyone else.'}
                    </small>
                </div>
                <div className="form-group">
                    <Field
                        label={'Example select'}
                        name="exampleSelect1"
                        component={this._renderSelect}
                    />
                </div>
                <div className="form-group">
                    <Field
                        component={this._renderTextArea}
                        label="Message"
                        name="message"
                        placeholder=""
                    />
                </div>
                <fieldset className="form-group">
                    <legend>{'Code Quality'}</legend>

                    <Field
                        component={this._renderRadio}
                        label="This code is awesome!"
                        name="codeQualityRadio"
                        option="1"
                        checked={true}
                    />
                    <Field
                        component={this._renderRadio}
                        label="This code is ok."
                        name="codeQualityRadio"
                        option="2"
                    />
                    <Field
                        component={this._renderRadio}
                        label="This code is bad."
                        name="codeQualityRadio"
                        option="3"
                        disabled={true}
                    />
                </fieldset>
                <div className="form-check">
                    <Field
                        component={this._renderCheckbox}
                        label="Did you star my repo?"
                        name="starred"
                        type="checkbox"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {'Submit'}
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={reset}
                >
                    {'Reset'}
                </button>
            </form>
        );
    }

    _onFormSubmit(formData) {
        console.info(formData);

        window.alert(JSON.stringify(formData, null, 2));
    }

    _renderInputField(field) {
        const {meta: {touched, error}} = field;
        const className = `small text-danger ${touched && error ? '' : 'd-none'}`;

        return (
            <div>
                <label htmlFor={field.input.name}>
                    {field.label} <span className={className}>{error}</span>
                </label>
                <input
                    {...field.input}
                    className="form-control"
                    id={field.input.name}
                    placeholder={field.placeholder}
                    type={field.type}
                />
            </div>
        );
    }

    _renderCheckbox(field) {
        return (
            <label
                className="form-check-label"
                htmlFor={field.input.name}
            >
                <input
                    {...field.input}
                    className="form-check-input"
                    type="checkbox"
                />
                {field.label}
            </label>
        );
    }

    _renderRadio(field) {
        return (
            <div className="form-check">
                <label htmlFor={field.input.name} className="form-check-label">
                    <input
                        {...field.input}
                        checked={field.checked}
                        className="form-check-input"
                        disabled={field.disabled}
                        id={field.input.name}
                        name={field.input.name}
                        type="radio"
                        value={field.option}
                    />
                    {field.label}
                </label>
            </div>
        );
    }

    _renderTextArea(field) {
        const {meta: {touched, error}} = field;
        const className = `small text-danger ${touched && error ? '' : 'd-none'}`;

        return (
            <div>
                <label htmlFor={field.input.name}>
                    {field.label} <span className={className}>{error}</span>
                </label>
                <textarea
                    {...field.input}
                    className="form-control"
                    placeholder={field.placeholder}
                    rows="3"
                />
            </div>
        );
    }

    /* eslint-disable jsx-a11y/label-has-for */
    _renderSelect(field) {
        return (
            <div>
                <label htmlFor={field.name}>
                    {field.label}
                </label>
                <select
                    {...field.input}
                    id={field.name}
                    className="form-control"
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>
        );
    }

}

export default reduxForm({
    form: 'contactForm',
    validate: (formData) => {
        const errors = {};
        const validEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!validEmailRegex.test(formData.email)) {
            errors.email = 'Invalid email address';
        }

        if (!formData.name) {
            errors.name = 'Required';
        }

        if (!formData.message) {
            errors.message = 'Required';
        }

        return errors;
    },
})(ContactForm);
