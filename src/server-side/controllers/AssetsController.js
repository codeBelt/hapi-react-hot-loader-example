import path from 'path';

class AssetsController {

    mapRoutes(server) {
        server.route({
            method: 'GET',
            path: '/assets/{file*}',
            handler: (request, reply) => {
                reply.file(path.resolve(__dirname, `../../public${request.path}`));
            },
        });
    }

}

export default AssetsController;
