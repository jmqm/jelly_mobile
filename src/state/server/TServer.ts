type TServer = {
    address: string;
    id: string;
    name: string;
};

export const createServer = (server?: TServer) => {
    return {
        ...server,
        ...{ }
    } as TServer;
};

export default TServer;
