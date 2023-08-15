import * as Crypto from 'expo-crypto';

type TUser = {
    loginName: string;
    id: string;
    accessToken: string;

    deviceId: string;
};

export const createUser = (user?: TUser) => {
    return {
        ...user,
        ...{ deviceId: Crypto.randomUUID() }
    } as TUser;
};

export default TUser;
