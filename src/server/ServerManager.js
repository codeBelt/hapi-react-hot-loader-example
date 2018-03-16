import * as Hapi from 'hapi';

class ServerManager {

    static PORT = parseInt(process.env.PORT, 10) || 3000;
    static HOST = process.env.HOST || 'localhost';
    static NODE_ENV = process.env.NODE_ENV;

    isDevelopment = (ServerManager.NODE_ENV === 'development');

    _server = null;

    get server() {
        return this._server;
    }

    constructor() {
        const options = {
            host: ServerManager.HOST,
            port: ServerManager.PORT,
        };

        this._server = new Hapi.Server(options);
    }

    static log() {
        console.info(`\n\nServer running in ${ServerManager.NODE_ENV} mode at: http://${ServerManager.HOST}:${ServerManager.PORT}\n`);
    }

    async registerPlugin(pluginConfig) {
        await this._server.register(pluginConfig);
    }

    registerController(controller) {
        controller.mapRoutes(this._server);
    }

    async startServer() {
        try {
            await this._server.start();

            if (!this.isDevelopment) {
                ServerManager.log();
            }
        } catch (err) {
            console.error(err);
        }
    }

}

export default ServerManager;
