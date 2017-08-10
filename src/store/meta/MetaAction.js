class MetaAction {

    static SET_META = 'MetaAction.SET_META';

    static setMeta(meta) {
        try {
            document.title = meta.title;
        } catch (error) {
        }

        return {
            type: MetaAction.SET_META,
            payload: meta,
        };
    }

}

export default MetaAction;
