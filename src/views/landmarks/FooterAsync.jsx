import {asyncComponent} from 'react-async-component';

export default asyncComponent({
    name: 'FooterAsync',
    serverMode: 'defer',
    resolve: () => import(/* webpackChunkName: "Footer" */ './Footer'),
});
