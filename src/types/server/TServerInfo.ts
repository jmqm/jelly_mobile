import * as Crypto from 'expo-crypto';

type TServerInfo = {
    address: string;
    serverId: string;
    serverName: string;

    userName: string;
    userId: string;
    userAccessToken: string;

    deviceId: string;
};

export const createServerInfo = (serverInfo?: TServerInfo) => {
    const { address, serverId, serverName, userName, userId, userAccessToken } = serverInfo ?? { };

    return {
        address: address,
        serverId: serverId,
        serverName: serverName,

        userName: userName,
        userId: userId,
        userAccessToken: userAccessToken,

        deviceId: Crypto.randomUUID()
    } as TServerInfo;
};

export default TServerInfo;
