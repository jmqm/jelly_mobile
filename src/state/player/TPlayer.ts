type TPlayer = {
    loginName: string;
    id: string;
    accessToken: string;

    deviceId: string;
};

export const createUser = (user?: TPlayer) => {
    return {
        ...user,
        ...{ deviceId: Crypto.randomUUID() }
    } as TPlayer;
};

export default TPlayer;
