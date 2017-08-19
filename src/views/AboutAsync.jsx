import {asyncComponent} from 'react-async-component';

export default asyncComponent({
    name: 'AboutAsync',
    serverMode: 'defer',
    resolve: () => System.import(/* webpackChunkName: "About" */ './About'),
});
