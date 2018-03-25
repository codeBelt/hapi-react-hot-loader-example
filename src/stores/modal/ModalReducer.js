import ModalAction from './ModalAction';

class ModalReducer {

    static _initialState = {
        currentModal: null,
        modalList: [],
    };

    static reducer(state = ModalReducer._initialState, action) {
        switch (action.type) {
            case ModalAction.ADD_MODAL:
                return ModalReducer._addModal(state, action);
            case ModalAction.REMOVE_MODAL:
                return ModalReducer._closeCurrentModal(state, action);
            default:
                return state;
        }
    }

    static _addModal(state, action) {
        return {
            ...state,
            currentModal: action.payload,
            modalList: [...state.modalList, action.payload],
        };
    }

    static _closeCurrentModal(state, action) {
        const modalIndex = state.modalList.indexOf(state.currentModal);
        const modals = [
            ...state.modalList.slice(0, modalIndex),
            ...state.modalList.slice(modalIndex + 1),
        ];
        const previousModal = modals[modals.length - 1];

        return {
            ...state,
            currentModal: previousModal || null,
            modalList: modals,
        };
    }

}

export default ModalReducer;
