import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import path from 'path';
import * as fse from 'fs-extra';
import * as React from 'react';
import ProviderWrapper from '../../views/ProviderWrapper';
import ProviderService from '../../services/ProviderService';
import rootSaga from '../../sagas/rootSaga';

class ReactController {

    mapRoutes(server) {
        server.route({
            method: 'GET',
            path: '/{route*}',
            handler: async (request, reply) => {
                const store = ProviderService.createProviderStore({}, true);
                const context = {};
                const app = (
                    <ProviderWrapper
                        store={store}
                        location={request.path}
                        context={context}
                        isServerSide={true}
                    />
                );

                store.runSaga(rootSaga).done.then(async () => {
                    const renderedHtml = renderToString(app);
                    const stateStringified = JSON.stringify(store.getState());

                    let html = await fse.readFile(path.resolve(__dirname, '../../public/index.html'), 'utf8');
                    html = html.replace('{title}', 'Test Title');
                    html = html.replace('{content}', renderedHtml);
                    html = html.replace('{state}',  stateStringified);

                    // context.url will contain the URL to redirect to if a <Redirect> was used
                    if (context.url) {
                        // TODO: figure out redirects
                        reply(context.url);
                    } else {
                        reply(html);
                    }
                });

                renderToString(app);

                store.endSaga();
            }
        });
    }

}

export default ReactController;
