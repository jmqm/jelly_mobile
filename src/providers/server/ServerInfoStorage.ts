import AsyncStorage from '@react-native-async-storage/async-storage';
import TServerInfo, { createServerInfo } from 'src/types/server/TServerInfo';

const KEY = 'serverInfo';

export const loadServerInfo = async (): Promise<TServerInfo> => {
    const serverInfoJson = await AsyncStorage.getItem(KEY);
    const serverInfo: TServerInfo = serverInfoJson
        ? JSON.parse(serverInfoJson)
        : createServerInfo();

    return serverInfo;
};

export const saveServerInfo = async (serverInfo: TServerInfo) => {
    const serverInfoJson = JSON.stringify(serverInfo);

    await AsyncStorage.setItem(KEY, serverInfoJson);
};
