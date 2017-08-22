import {renderToString} from 'react-dom/server';
import {AsyncComponentProvider, createAsyncContext} from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import serialize from 'serialize-javascript';
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
                const asyncContext = createAsyncContext();
                const context = {};
                const app = (
                    <AsyncComponentProvider asyncContext={asyncContext}>
                        <RouterWrapper
                            store={store}
                            location={request.path}
                            context={context}
                            isServerSide={true}
                        />
                    </AsyncComponentProvider>
                );

                this._html = (this._html === null) ? await this._loadHtmlFile() : this._html;

                await asyncBootstrapper(app);

                store.runSaga(rootSaga).done.then(() => {
                    if (context.url) {
                        return reply().redirect(context.url).permanent().rewritable();
                    }

                    const renderedHtml = renderToString(app);
                    const asyncComponentsState = asyncContext.getState();
                    const state = store.getState();

                    const initialState = {
                        ...state,
                        renderReducer: {
                            isServerSide: true,
                        },
                    };

                    const html = this._html
                        .slice(0)
                        .replace('{title}', initialState.metaReducer.title)
                        .replace('{description}', initialState.metaReducer.description)
                        .replace('{content}', renderedHtml)
                        .replace('{state}', JSON.stringify(initialState))
                        .replace('{asyncComponentsState}', serialize(asyncComponentsState));

                    return reply(html);
                }).catch((error) => {
                    reply(error.toString());
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
