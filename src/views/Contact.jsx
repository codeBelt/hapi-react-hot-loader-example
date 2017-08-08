import * as React from 'react';
import {connect} from 'react-redux';
import MetaAction from '../store/meta/MetaAction';


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
                <form>
                    <div className="form-group">
                        <label htmlFor="emailInput">{'Email'}</label>
                        <input type="email" className="form-control" id="emailInput" placeholder="Enter email" />
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

}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
