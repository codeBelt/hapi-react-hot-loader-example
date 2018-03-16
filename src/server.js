import 'fetch-everywhere';
import * as inert from 'inert';
import AssetsController from './server/controllers/AssetsController';
import HapiWebpackHotPlugin from './server/plugin/HapiWebpackHotPlugin';
import ReactController from './server/controllers/ReactController';
import ServerManager from './server/ServerManager';

(async () => {

    const manager = new ServerManager();

    await manager.registerPlugin(inert);

    if (manager.isDevelopment) {
        const hapiWebpackHotPlugin = new HapiWebpackHotPlugin();

        await manager.registerPlugin(hapiWebpackHotPlugin.plugin);
    }

    manager.registerController(new AssetsController());
    manager.registerController(new ReactController());

    await manager.startServer();

})();
