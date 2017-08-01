import Webpack from 'webpack';
import ServerManager from "../ServerManager";

class WebpackPlugin {

    constructor(server) {
        const WebpackPlugin = require('hapi-webpack-plugin');
        const compiler = new Webpack(require('../../../webpack.config.js'));

        compiler.plugin('done', (stats) => {

            setTimeout(() => {
                ServerManager.log();
            }, 0);

            const pkg = require('../../../package.json');
            const notifier = require('node-notifier');
            const time = ((stats.endTime - stats.startTime) / 1000).toFixed(2);

            notifier.notify({
                title: pkg.name,
                message: `WebPack is done!\n${stats.compilation.errors.length} errors in ${time}s`,
                timeout: 1, // Takes precedence over wait if both are defined.
            });
        });

        const assets = {
            // webpack-dev-middleware options
            // See https://github.com/webpack/webpack-dev-middleware
        };

        const hot = {
            // webpack-hot-middleware options
            // See https://github.com/glenjamin/webpack-hot-middleware
        };

        server.register({
            register: WebpackPlugin,
            options: {compiler, assets, hot}
        }, error => {
            if (error) {
                return console.error(error);
            }

        });
    }

}

export default WebpackPlugin;
