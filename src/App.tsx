import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { enableReactUse } from '@legendapp/state/config/enableReactUse';
// import { enableReactNativeComponents } from '@legendapp/state/config/enableReactNativeComponents';
import MainNavigation from 'src/navigation/MainNavigation';
import Providers from 'src/providers/Providers';

enableReactUse();
// enableReactNativeComponents();

const App = () => (
    <Providers>
        <StatusBar style='light'  />

        <NavigationContainer>
            <MainNavigation />
        </NavigationContainer>

        {/* TODO: Change navigation hint background */}
    </Providers>
);

registerRootComponent(App);
