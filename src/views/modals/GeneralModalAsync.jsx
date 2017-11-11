import {asyncComponent} from 'react-async-component';

const GeneralModalAsync = asyncComponent({
    name: 'GeneralModalAsync',
    serverMode: 'defer',
    resolve: () => {
        return import(/* webpackChunkName: "GeneralModal" */ './GeneralModal');
    },
});

export default GeneralModalAsync;
