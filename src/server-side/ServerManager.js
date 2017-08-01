import * as hapi from 'hapi';
import * as inert from 'inert';
import WebpackPlugin from "./plugin/WebpackPlugin";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const NODE_ENV = process.env.NODE_ENV;
const isProduction = (NODE_ENV === 'production');

class ServerManager {

    static log = () => console.log(`\n\nServer running in ${NODE_ENV} mode at: http://${HOST}:${PORT}\n`);

    _server = new hapi.Server();

    constructor() {
        this._server.connection({
            host: HOST,
            port: PORT,
        });

        this.registerPlugin(inert);

        if (isProduction === false) {
            new WebpackPlugin(this._server);
        }
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

            isProduction && ServerManager.log();
        });
    }
}

export default ServerManager;
