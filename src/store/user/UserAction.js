class UserAction {

    static LOAD_USER = 'UserAction.LOAD_USER';
    static LOAD_USER_SUCCESS = 'UserAction.LOAD_USER_SUCCESS';
    static LOAD_USER_FAIL = 'UserAction.LOAD_USER_FAIL';

    static loadUser() {
        return {
            type: UserAction.LOAD_USER,
        };
    }

}

export default UserAction;
