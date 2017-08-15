import {renderToString} from 'react-dom/server';
import path from 'path';
import * as fse from 'fs-extra';
import * as React from 'react';
import RouterWrapper from '../../RouterWrapper';
import ProviderService from '../../services/ProviderService';
import rootSaga from '../../store/rootSaga';

class ReactController {

    _html = null;

    mapRoutes(server) {
        server.route({
            method: 'GET',
            path: '/{route*}',
            handler: async (request, reply) => {
                const store = ProviderService.createProviderStore({}, true);
                const context = {};
                const app = (
                    <RouterWrapper
                        store={store}
                        location={request.path}
                        context={context}
                        isServerSide={true}
                    />
                );

                store.runSaga(rootSaga).done.then(async () => {
                    const renderedHtml = renderToString(app);
                    const state = store.getState();
                    const initialState = {
                        ...state,
                        renderReducer: {
                            isServerSide: true,
                        },
                    };


                    let html = (this._html) ? this._html.slice(0) : await this._loadHtmlFile();

                    html = html.replace('{title}', state.metaReducer.title);
                    html = html.replace('{description}', state.metaReducer.description);
                    html = html.replace('{content}', renderedHtml);
                    html = html.replace('{state}', JSON.stringify(initialState));

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
            },
        });
    }

    async _loadHtmlFile() {
        const htmlPath = path.resolve(__dirname, '../../public/index.html');

        return fse.readFile(htmlPath, 'utf8');
    }

}

export default ReactController;
