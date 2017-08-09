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
        const { handleSubmit } = this.props;

        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">{'Contact'}</h1>
                    <p className="lead">{'This contact form uses redux-form to do client-side validation.'}</p>
                </div>
                <form onSubmit={handleSubmit(this._handleSubmitHandler)}>
                    <div className="form-group">
                        <Field
                            name="name"
                            type="text"
                            label="Name"
                            placeholder="Enter name"
                            component={this._renderInputField}
                        />
                    </div>
                    <div className="form-group">
                        <Field
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="Enter email"
                            component={this._renderInputField}
                        />
                        <small id="emailHelp" className="form-text text-muted">{'We\'ll never share your email with anyone else.'}</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleSelect1">{'Example select'}</label>
                        <select className="form-control" id="exampleSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="messageTextArea">{'Message'}</label>
                        <textarea className="form-control" id="messageTextArea" rows="3"></textarea>
                    </div>
                    <fieldset className="form-group">
                        <legend>{'Radio buttons'}</legend>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="codeQualityRadio" id="codeQualityRadio1" value="option1" defaultChecked />
                                {'This code is awesome!'}
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="codeQualityRadio" id="codeQualityRadio2" value="option2" />
                                {'This code is ok.'}
                            </label>
                        </div>
                        <div className="form-check disabled">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="codeQualityRadio" id="codeQualityRadio3" value="option3" disabled />
                                {'This code is bad'}
                            </label>
                        </div>
                    </fieldset>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" />
                            {'Did you star my repo?'}
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">{'Submit'}</button>
                </form>
            </div>
        );
    }

    _onFormSubmit(formData){
        // TODO: Can an acton with the form data.
        console.log(formData);
    }

    _renderInputField(field) {
        const {meta: {touched, error}} = field;
        console.log(`touched, error`, touched, error);
        const className = `small text-danger ${touched && error ? '' : 'd-none'}`;
console.log(`className`, className);
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
            <div className="inputForm-item-checkGroup">
                <input
                    {...field.input}
                    className="u-isVisuallyHidden"
                    type="checkbox"
                />
                <label htmlFor={field.input.name}>{'Notify Me for Special Offers!'}</label>
            </div>
        );
    }

    _renderTextArea(field) {
        const { meta: { touched, error } } = field;
        const className = `inputForm-area ${touched && error ? 'inputForm-warning' : ''}`;

        return (
            <div className="inputForm-item">
                <label
                    className="u-isVisuallyHidden"
                    htmlFor={field.input.name}
                >
                    {field.label}
                </label>
                <textarea
                    {...field.input}
                    className={className}
                    placeholder={field.placeholder}
                />
            </div>
        );
    }

}

Contact = connect(mapStateToProps, mapDispatchToProps)(Contact);

export default reduxForm({
    form: 'contactForm',
    validate: (formData) => {
        const errors = {};

        if (!formData.name) {
            errors.name = 'Required';
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
            errors.email = 'Invalid email address';
        }

        // if (!formData.phone) {
        //     errors.phone = 'Required';
        // }

        // if (!formData.message) {
        //     errors.message = 'Required';
        // }

        return errors;
    },
})(Contact);



// import * as React from 'react';
// import {Field, FormProps, reduxForm} from 'redux-form';
// import INewsletter from '../../interfaces/reducers/INewsletter';
//
// interface INewsletterFormProps extends FormProps<INewsletter, void, void> {
//     actions;
// }
//
// export const NEWSLETTER_FORM_NAME = 'newsletterForm';
//
// class NewsletterForm extends React.Component<INewsletterFormProps, void> {
//
//     public render(): JSX.Element {
//         const { handleSubmit } = this.props;
//
//         return (
//             <form
//                 className="inputForm u-vr_x6_bplarge"
//                 onSubmit={handleSubmit((formData: INewsletter) => this._onFormSubmit(formData))}
//             >
//                 <Field
//                     name="firstName"
//                     label="Fist Name"
//                     placeholder="Fist Name"
//                     component={this._renderInputField}
//                 />
//                 <Field
//                     name="lastName"
//                     label="Last Name"
//                     placeholder="Last Name"
//                     component={this._renderInputField}
//                 />
//                 <Field
//                     name="email"
//                     label="Email"
//                     placeholder="Email"
//                     component={this._renderInputField}
//                 />
//                 <Field
//                     name="phone"
//                     label="Phone Number"
//                     placeholder="Phone Number"
//                     component={this._renderInputField}
//                 />
//                 <Field
//                     name="message"
//                     label="Message"
//                     placeholder="Message"
//                     component={this._renderTextArea}
//                 />
//                 <div className="inputForm-item">
//                     <Field
//                         label="I am a Nerdery employee"
//                         name="isEmployee"
//                         type="checkbox"
//                         component={this._renderCheckbox}
//                     />
//                     <Field
//                         label="Notify Me for Special Offers!"
//                         name="allowSpecialOffers"
//                         type="checkbox"
//                         component={this._renderCheckbox}
//                     />
//                 </div>
//                 <div className="inputForm-item">
//                     <input
//                         className="btn btn_dark"
//                         type="submit"
//                         value="Sign Up"
//                     />
//                 </div>
//             </form>
//         );
//     }
//
//     _renderInputField(field) {
//         const { meta: { touched, error } } = field;
//         const className = `inputForm-text ${touched && error ? 'inputForm-warning' : ''}`;
//
//         return (
//             <div className="inputForm-item inputForm-item_half">
//                 <label
//                     className="u-isVisuallyHidden"
//                     htmlFor={field.input.name}
//                 >
//                     {field.label}
//                 </label>
//                 <input
//                     {...field.input}
//                     type="text"
//                     className={className}
//                     placeholder={field.placeholder}
//                 />
//             </div>
//         );
//     }
//
//     _renderCheckbox(field) {
//         return (
//             <div className="inputForm-item-checkGroup">
//                 <input
//                     {...field.input}
//                     className="u-isVisuallyHidden"
//                     type="checkbox"
//                 />
//                 <label htmlFor={field.input.name}>{'Notify Me for Special Offers!'}</label>
//             </div>
//         );
//     }
//
//     _renderTextArea(field) {
//         const { meta: { touched, error } } = field;
//         const className = `inputForm-area ${touched && error ? 'inputForm-warning' : ''}`;
//
//         return (
//             <div className="inputForm-item">
//                 <label
//                     className="u-isVisuallyHidden"
//                     htmlFor={field.input.name}
//                 >
//                     {field.label}
//                 </label>
//                 <textarea
//                     {...field.input}
//                     className={className}
//                     placeholder={field.placeholder}
//                 />
//             </div>
//         );
//     }
//
//     _onFormSubmit(formData: INewsletter){
//         this.props.actions.signUpForNewsletter(formData);
//     }
//
// }
//
// export default reduxForm({
//     form: NEWSLETTER_FORM_NAME,
//     validate: (formData: INewsletter) => {
//         const errors = {};
//
//         if (!formData.firstName) {
//             errors.firstName = 'Required';
//         }
//
//         if (!formData.lastName) {
//             errors.lastName = 'Required';
//         }
//
//         if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
//             errors.email = 'Invalid email address';
//         }
//
//         if (!formData.phone) {
//             errors.phone = 'Required';
//         }
//
//         if (!formData.message) {
//             errors.message = 'Required';
//         }
//
//         return errors;
//     },
// })(NewsletterForm);
