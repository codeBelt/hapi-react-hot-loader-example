import {asyncComponent} from 'react-async-component';

const ExampleFormModalAsync = asyncComponent({
    name: 'ExampleFormModalAsync',
    serverMode: 'defer',
    resolve: () => {
        return import(/* webpackChunkName: "ExampleFormModal" */ './ExampleFormModal');
    },
});

export default ExampleFormModalAsync;
