import 'fetch-everywhere';

import ServerManager from './server-side/ServerManager';
import AssetsController from './server-side/controllers/AssetsController';
import ReactController from './server-side/controllers/ReactController';

const manager = new ServerManager();
manager.registerController(new AssetsController());
manager.registerController(new ReactController());
manager.startServer();
