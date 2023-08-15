/* eslint-disable indent */

import { observable } from '@legendapp/state';
import { persistObservable } from '@legendapp/state/persist';
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';
import TUser, { createUser } from './TUser';

const user$ = observable<{
    user: TUser,
    onSet: (user: TUser) => void,
    onDelete: () => void
}>({
    user: createUser(),
    onSet: (user: TUser) => {
        user$.user.assign(user);
    },
    onDelete: () => {
        user$.user.set(createUser());
    }
});

persistObservable(user$, {
    local: 'abbb92ab-a349-40c2-a882-43b52db71cda', // https://www.uuidgenerator.net/version4
    persistLocal: ObservablePersistMMKV
});

export default user$;
