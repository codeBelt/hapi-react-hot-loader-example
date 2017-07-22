class CounterAction {

    static INCREASE_COUNT = 'CounterAction.INCREASE_COUNT';

    static increaseCount() {
        return {
            type: CounterAction.INCREASE_COUNT,
        };
    }

}

export default CounterAction;
