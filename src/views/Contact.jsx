import * as React from 'react';
import {connect} from 'react-redux';
import MetaAction from '../store/meta/MetaAction';
import {Field, FormProps, reduxForm} from 'redux-form';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    setMeta: (meta) => dispatch(MetaAction.setMeta(meta)),
});

class Contact extends React.Component {

    _handleSubmitHandler = (formData) => this._onFormSubmit(formData);

    componentWillMount() {
        this.props.setMeta({title: 'Contact Page'});
    }

    render() {
        const {handleSubmit, reset} = this.props;

        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">{'Contact'}</h1>
                    <p className="lead">{'This contact form uses redux-form to do client-side validation.'}</p>
                </div>
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
                        <small id="emailHelp" className="form-text text-muted">{'We\'ll never share your email with anyone else.'}</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleSelect1">{'Example select'}</label>
                        <Field
                            name="exampleSelect1"
                            className="form-control"
                            component="select"
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Field>
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
            </div>
        );
    }

    _onFormSubmit(formData){
        // TODO: Can an acton with the form data.
        alert(formData);
        console.log(formData);
    }

    _renderInputField(field) {
        const {meta: {touched, error}} = field;
        const className = `small text-danger ${touched && error ? '' : 'd-none'}`;

        return (
            <span>
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
            </span>
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
                <label className="form-check-label">
                    <input
                        {...field.input}
                        type="radio"
                        className="form-check-input"
                        name={field.input.name}
                        value={field.option}
                        disabled={field.disabled}
                        checked={field.checked}
                    />
                    {field.label}
                </label>
            </div>
        );
    }

    _renderTextArea(field) {
        const { meta: { touched, error } } = field;
        const className = `small text-danger ${touched && error ? '' : 'd-none'}`;

        return (
            <span>
                <label htmlFor={field.input.name}>
                    {field.label} <span className={className}>{error}</span>
                </label>
                <textarea
                    {...field.input}
                    className="form-control"
                    placeholder={field.placeholder}
                    rows="3"
                >
                </textarea>
            </span>
        );
    }

}

Contact = connect(mapStateToProps, mapDispatchToProps)(Contact);

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
})(Contact);
