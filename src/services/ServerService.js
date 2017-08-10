class ServerService {

    static createLocationObject(request) {
        const protocal = request.headers['x-forwarded-proto'] || request.connection.info.protocol;

        return {
            ...request.url,
            host: request.info.host,
            hostname: request.info.host.split(':')[0],
            href: `${protocal}://${request.info.host}${request.url.path}`,
            origin: `${protocal}://${request.info.host}`,
            pathname: request.url.path.split('?')[0],
            protocal: `${protocal}:`,
        };
    }

}

export default ServerService;
