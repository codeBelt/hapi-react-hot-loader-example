import 'fetch-everywhere';
import * as inert from 'inert';

import ServerManager from './server-side/ServerManager';
import AssetsController from './server-side/controllers/AssetsController';
import ReactController from './server-side/controllers/ReactController';
import HapiWebpackHotPlugin from "./server-side/plugin/HapiWebpackHotPlugin";

const manager = new ServerManager();
manager.registerPlugin(inert);

if (manager.isProduction === false) {
    new HapiWebpackHotPlugin(manager.server);
}

manager.registerController(new AssetsController());
manager.registerController(new ReactController());
manager.startServer();
