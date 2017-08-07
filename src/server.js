import 'fetch-everywhere';
import * as inert from 'inert';

import ServerManager from './server-side/ServerManager';
import AssetsController from './server-side/controllers/AssetsController';
import ReactController from './server-side/controllers/ReactController';
import WebpackPlugin from "./server-side/plugin/WebpackPlugin";

const manager = new ServerManager();
manager.registerPlugin(inert);

if (manager.isProduction === false) {
    new WebpackPlugin(manager.server);
}

manager.registerController(new AssetsController());
manager.registerController(new ReactController());
manager.startServer();
