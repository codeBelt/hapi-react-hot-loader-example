const Hapi = require('hapi');
const fs = require('fs');
const Webpack = require('webpack');

const env = process.env.NODE_ENV;
const isProduction = (env === 'production');

const server = new Hapi.Server();
server.connection({ port: 3000 });

if (isProduction === false) {
    const WebpackPlugin = require('hapi-webpack-plugin');
    const compiler = new Webpack(require('./webpack.config.js'));

    compiler.plugin('done', (stats) => {
        setTimeout(() => {
            console.log(`\n\nServer running at: ${server.info.protocol}://localhost:${server.info.port}\n`)
        }, 0);

        const pkg = require('./package.json');
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

server.route({
    method: 'GET',
    path: '/{route*}',
    handler: function (request, reply) {
        console.log(`isProduction`, isProduction);
        fs.readFile(__dirname + '/src/index.html', 'utf8', (err, data) => {
            if (err) throw err;

            let html = data.replace('{title}', 'Test Title');
            html = html.replace('{content}', '<div>Test</div>');
            html = html.replace('{state}',  JSON.stringify({}));

            return reply(html);
        });
    }
});

server.start();
