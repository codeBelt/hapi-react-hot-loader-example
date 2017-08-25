import * as React from 'react';
import {connect} from 'react-redux';
import MetaAction from '../../store/meta/MetaAction';
import ContactForm from './ContactForm';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    setMeta: (meta) => dispatch(MetaAction.setMeta(meta)),
});

class Contact extends React.Component {

    componentWillMount() {
        this.props.setMeta({title: 'Contact Page'});
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">{'Contact'}</h1>
                    <p className="lead">{'This contact form uses redux-form to do client-side validation.'}</p>
                </div>
                <ContactForm />
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
