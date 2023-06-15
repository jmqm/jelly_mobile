import { FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';
import { loadServerInfo, saveServerInfo } from './ServerInfoStorage';
import TServerInfo, { createServerInfo } from 'src/types/server/TServerInfo';
import ServerInfoContext from 'src/providers/server/ServerInfoContext';

const ServerInfoProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [serverInfo, setServerInfo] = useState<TServerInfo>({ } as TServerInfo);

    const handleSet = (serverInfo: TServerInfo) => {
        saveServerInfo(serverInfo);
        setServerInfo(serverInfo);
    };

    const handleDelete = () => {
        const defaultServerInfo = createServerInfo();

        handleSet(defaultServerInfo);
    };

    useEffect(() => {
        const load = async () => {
            setServerInfo(await loadServerInfo());
            setLoaded(true);
        };

        load();
    }, []);

    return (
        <ServerInfoContext.Provider
            value={{
                loaded: loaded,
                serverInfo: serverInfo,

                onSet: handleSet,
                onDelete: handleDelete
            }}
        >
            {props.children}
        </ServerInfoContext.Provider>
    );
};

export default ServerInfoProvider;
