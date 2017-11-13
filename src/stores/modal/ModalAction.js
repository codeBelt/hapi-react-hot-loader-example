class ModalAction {

    static ADD_MODAL = 'ModalAction.ADD_MODAL';
    static REMOVE_MODAL = 'ModalAction.REMOVE_MODAL';

    static addModal(modal) {
        return {
            type: ModalAction.ADD_MODAL,
            payload: modal,
        };
    }

    static closeModal() {
        return {
            type: ModalAction.REMOVE_MODAL,
        };
    }

}

export default ModalAction;
