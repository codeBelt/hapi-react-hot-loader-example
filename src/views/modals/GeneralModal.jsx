import * as React from 'react';
import withBaseModal from './withBaseModal';

class GeneralModal extends React.PureComponent {

    render() {
        return (
            <section className="modal-content modal-content_md">
                <div className="modal-body">
                    {this.props.modalData.message}
                </div>
                <div className="modal-footer modal-footer_block modal-footer_stack">
                    {this.props.modalData.rejectLabel &&
                        <button
                            onClick={this.props.onReject || this.props.closeModal}
                        >
                            {this.props.modalData.rejectLabel}
                        </button>
                    }
                    {this.props.modalData.acceptLabel &&
                        <button
                            onClick={this.props.onAccept || this.props.closeModal}
                        >
                            {this.props.modalData.acceptLabel}
                        </button>
                    }
                </div>
            </section>
        );
    }

}

export default withBaseModal(GeneralModal);
