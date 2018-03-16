import {renderToString} from 'react-dom/server';
import {AsyncComponentProvider, createAsyncContext} from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import * as serialize from 'serialize-javascript';
import * as path from 'path';
import * as fse from 'fs-extra';
import * as React from 'react';
import RouterWrapper from '../../RouterWrapper';
import ProviderService from '../../services/ProviderService';
import rootSaga from '../../stores/rootSaga';

class ReactController {

    _html = null;

    mapRoutes(server) {
        server.route({
            method: 'GET',
            path: '/{route*}',
            handler: async (request, h) => {
                const store = ProviderService.createProviderStore({}, null, true);
                const asyncContext = createAsyncContext();
                const routeContext = {};
                const app = (
                    <AsyncComponentProvider asyncContext={asyncContext}>
                        <RouterWrapper
                            store={store}
                            location={request.path}
                            context={routeContext}
                            isServerSide={true}
                        />
                    </AsyncComponentProvider>
                );

                this._html = (this._html === null) ? await this._loadHtmlFile() : this._html;

                await asyncBootstrapper(app);

                const sagaDone = store.runSaga(rootSaga).done;

                renderToString(app);

                store.endSaga();

                await sagaDone;

                if (routeContext.url) {
                    return h.redirect(routeContext.url);
                }

                try {
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

                    return h.response(html);
                } catch (error) {
                    return error.toString();
                }
            },
        });
    }

    async _loadHtmlFile() {
        const htmlPath = path.resolve(__dirname, '../../public/index.html');

        return fse.readFile(htmlPath, 'utf8');
    }

}

export default ReactController;
