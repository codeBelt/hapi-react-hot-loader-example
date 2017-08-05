import * as React from 'react';
import {connect} from 'react-redux';
import MetaAction from '../store/meta/MetaAction';

class About extends React.Component {

    componentWillMount() {
        this.props.setMeta({title: 'About Page'});
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">{'About'}</h1>
                    <p className="lead">{'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.'}</p>
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    setMeta: (meta) => dispatch(MetaAction.setMeta(meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
