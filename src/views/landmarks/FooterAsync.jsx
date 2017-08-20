import {asyncComponent} from 'react-async-component';

export default asyncComponent({
    name: 'FooterAsync',
    serverMode: 'defer',
    resolve: () => System.import(/* webpackChunkName: "Footer" */ './Footer'),
});
