class ServerService {

    static createLocationObject(request) {
        const protocol = request.headers['x-forwarded-proto'] || request.connection.info.protocol;

        return {
            ...request.url,
            host: request.info.host,
            hostname: request.info.host.split(':')[0],
            href: `${protocol}://${request.info.host}${request.url.path}`,
            origin: `${protocol}://${request.info.host}`,
            pathname: request.url.path.split('?')[0],
            protocol: `${protocol}:`,
        };
    }

}

export default ServerService;
