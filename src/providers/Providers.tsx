import { PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import theme from 'src/theme';

// TODO: Add theme.

const ProvidersComponent = (props: PropsWithChildren) => (
    <SafeAreaProvider>
        <PaperProvider theme={theme}>
            {props.children}
        </PaperProvider>
    </SafeAreaProvider>
);

export default ProvidersComponent;
