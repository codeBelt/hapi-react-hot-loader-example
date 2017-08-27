import {asyncComponent} from 'react-async-component';

export default asyncComponent({
    name: 'AboutAsync',
    serverMode: 'resolve',
    resolve: () => System.import(/* webpackChunkName: "About" */ './About'),
});
