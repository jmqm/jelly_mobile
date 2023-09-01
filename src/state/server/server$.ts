/* eslint-disable indent */

import { observable } from '@legendapp/state';
import { persistObservable } from '@legendapp/state/persist';
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';
import type TServer from './TServer';
import { createServer } from './TServer';

const server$ = observable<{
    server: TServer,
    onSet: (server: TServer) => void,
    onDelete: () => void
}>({
    server: createServer(),
    onSet: (server: TServer) => {
        server$.server.assign(server);
    },
    onDelete: () => {
        server$.server.set(createServer());
    }
});

persistObservable(server$, {
    local: '3521a74d-ace7-4ba4-a99a-6c44de33669d', // https://www.uuidgenerator.net/version4
    persistLocal: ObservablePersistMMKV
});

export default server$;
