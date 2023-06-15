import { PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import ServerInfoProvider from './server/ServerInfoProvider';

// TODO: Add theme.

const ProvidersComponent = (props: PropsWithChildren) => (
    <SafeAreaProvider>
        <PaperProvider>
            <ServerInfoProvider>
                {props.children}
            </ServerInfoProvider>
        </PaperProvider>
    </SafeAreaProvider>
);

export default ProvidersComponent;
