/* eslint-disable no-unused-vars */

import TServerInfo from 'src/types/server/TServerInfo';

type TServerInfoContext = {
    loaded: boolean;
    serverInfo: TServerInfo;

    onSet(serverInfo: TServerInfo): void;
    onDelete(): void;
};

export default TServerInfoContext;
