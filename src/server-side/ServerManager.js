import * as hapi from 'hapi';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const NODE_ENV = process.env.NODE_ENV;

class ServerManager {

    static log = () => console.log(`\n\nServer running in ${NODE_ENV} mode at: http://${HOST}:${PORT}\n`);

    _server = new hapi.Server({ debug: { request: ['error'] } });

    isProduction = (NODE_ENV === 'production');

    get server() {
        return this._server;
    };

    constructor() {
        this._server.connection({
            host: HOST,
            port: PORT,
        });
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
            this.isProduction && ServerManager.log();
        });
    }
}

export default ServerManager;
