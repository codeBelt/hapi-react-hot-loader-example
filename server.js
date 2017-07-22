const Hapi = require('hapi');
const fs = require('fs');

const env = process.env.NODE_ENV;
const isProduction = (env === 'production');

const server = new Hapi.Server();
server.connection({ port: 3000 });

// if (isProduction === false) {
    const WebpackPlugin = require('hapi-webpack-plugin');

    server.register({
        register: WebpackPlugin,
        options: './webpack.config.js'
    }, error => {
        if (error) {
            return console.error(error);
        }

        server.start(() => console.log(`Server running at: ${server.info.uri}`));
    });
// }

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
