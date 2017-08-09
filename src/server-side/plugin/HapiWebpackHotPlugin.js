import Webpack from 'webpack';
import ServerManager from '../ServerManager';
import HapiWebpackPlugin from 'hapi-webpack-plugin';
import notifier from 'node-notifier';

class WebpackPlugin {

    constructor(server) {
        const compiler = new Webpack(require('../../../webpack.config.js'));

        compiler.plugin('done', (stats) => this._onDone(stats));

        const options = {
            assets: {
                // webpack-dev-middleware options - https://github.com/webpack/webpack-dev-middleware
                index: '/public/index.html',
            },
            hot: {
                // webpack-hot-middleware options - https://github.com/glenjamin/webpack-hot-middleware
            },
            compiler
        };

        server.register({
            register: HapiWebpackPlugin,
            options
        }, error => {
            if (error) {
                return console.error(error);
            }

        });
    }

    _onDone(stats) {
        const pkg = require('../../../package.json');
        const time = ((stats.endTime - stats.startTime) / 1000).toFixed(2);

        setTimeout(() => {
            ServerManager.log();
        }, 0);

        notifier.notify({
            title: pkg.name,
            message: `WebPack is done!\n${stats.compilation.errors.length} errors in ${time}s`,
            timeout: 1,
        });
    }

}

export default WebpackPlugin;
