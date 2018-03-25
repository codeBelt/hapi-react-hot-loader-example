import HapiWebpackPlugin from 'hapi-webpack-plugin';
import notifier from 'node-notifier';
import Webpack from 'webpack';
import ServerManager from '../ServerManager';

class HapiWebpackHotPlugin {

    get plugin() {
        const config = require('../../../webpack.config.js'); // eslint-disable-line global-require
        const compiler = Webpack(config);

        compiler.plugin('done', (stats) => this._onDone(stats));

        const assets = {
            // webpack-dev-middleware options - See https://github.com/webpack/webpack-dev-middleware
            index: '/public/index.html',
        };

        const hot = {
            // webpack-hot-middleware options - See https://github.com/glenjamin/webpack-hot-middleware
        };

        return {
            plugin: HapiWebpackPlugin,
            options: {compiler, assets, hot},
        };
    }

    _onDone(stats) {
        const pkg = require('../../../package.json'); // eslint-disable-line global-require
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

export default HapiWebpackHotPlugin;
