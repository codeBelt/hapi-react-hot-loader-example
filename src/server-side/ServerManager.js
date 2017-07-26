import * as hapi from 'hapi';
import * as inert from 'inert';

class ServerManager {

    _server = new hapi.Server();

    constructor(host = 'localhost', port = 8080) {
        this._server.connection({
            host,
            port,
        });

        this.registerPlugin(inert);
    }

    async registerPlugin(pluginConfig) {
        await this._server.register(pluginConfig);
    }

    registerController(controller) {
        controller.mapRoutes(this._server);
    }

    startServer() {
        this._server.start((error) => {
            if (error) {
                throw error;
            }

            console.log('Server running at: %s', this._server.info.uri); // tslint:disable-line:no-console
        });
    }
}

export default ServerManager;
