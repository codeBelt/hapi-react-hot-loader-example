import {asyncComponent} from 'react-async-component';

export default asyncComponent({
    name: 'NotFoundAsync',
    serverMode: 'resolve',
    resolve: () => import(/* webpackChunkName: "NotFound" */ './NotFound'),
});
