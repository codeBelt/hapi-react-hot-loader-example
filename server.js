const Hapi = require('hapi');
const fs = require('fs');
const WebpackPlugin = require('hapi-webpack-plugin');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register({
    register: WebpackPlugin,
    options: './webpack.config.js'
}, error => {
    if (error) {
        return console.error(error);
    }

    server.start(() => console.log(`Server running at: ${server.info.uri}`));
});

server.route({
    method: 'GET',
    path: '/{route*}',
    handler: function (request, reply) {
        console.log(`hey`);
        fs.readFile(__dirname + '/index.html', 'utf8', (err, data) => {
            if (err) throw err;

            let html = data.replace('{title}', 'Test Title');
            html = html.replace('{content}', 'renderedHtml');
            html = html.replace('{state}',  '"stateStringified"');

            return reply(html);
        });
    }
});