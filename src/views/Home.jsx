import * as React from 'react';
import {connect} from 'react-redux';
import CounterAction from '../actions/CounterAction';

class Home extends React.Component {

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">{'Jumbotron heading'}</h1>
                    <p className="lead">{'Current count:'} {this.props.count}</p>
                    <p>
                        <button
                            className="btn btn-lg btn-success"
                            role="button"
                            onClick={this.props.increaseCount}
                        >
                            {'Increase Count'}
                        </button>
                    </p>
                </div>

                <div className="row marketing">
                    <div className="col-lg-6">
                        <h4>{'Subheading'}</h4>
                        <p>{'Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.'}</p>

                        <h4>Subheading</h4>
                        <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus
                            sit amet fermentum.</p>

                        <h4>Subheading</h4>
                        <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
                    </div>

                    <div className="col-lg-6">
                        <h4>Subheading</h4>
                        <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>

                        <h4>Subheading</h4>
                        <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus
                            sit amet fermentum.</p>

                        <h4>Subheading</h4>
                        <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    count: state.counterReducer.count
});

const mapDispatchToProps = (dispatch) => {
    return {
        increaseCount: () => dispatch(CounterAction.increaseCount())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

