class MetaAction {

    static SET_META = 'MetaAction.SET_META';

    static setMeta(meta) {
        if (global.document) {
            global.document.title = meta.title;
        }

        return {
            type: MetaAction.SET_META,
            payload: meta,
        };
    }

}

export default MetaAction;
