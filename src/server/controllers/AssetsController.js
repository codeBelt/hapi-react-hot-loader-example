import path from 'path';

class AssetsController {

    mapRoutes(server) {
        server.route({
            method: 'GET',
            path: '/assets/{file*}',
            handler: (request, h) => {
                const file = path.resolve(__dirname, `../../public${request.path}`);

                return h.file(file);
            },
        });
    }

}

export default AssetsController;
