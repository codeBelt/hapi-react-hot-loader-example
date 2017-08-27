import {asyncComponent} from 'react-async-component';

export default asyncComponent({
    name: 'AboutAsync',
    serverMode: 'resolve',
    resolve: () => import(/* webpackChunkName: "About" */ './About'),
});
