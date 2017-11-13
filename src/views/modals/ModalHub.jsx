import * as React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    currentModal: state.modalReducer.currentModal,
});
const mapDispatchToProps = (dispatch) => ({});

class ModalHub extends React.Component {

    render() {
        return this.props.currentModal;
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ModalHub);
