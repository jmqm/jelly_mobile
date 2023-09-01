import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { enableReactUse } from '@legendapp/state/config/enableReactUse';
// import { enableReactNativeComponents } from '@legendapp/state/config/enableReactNativeComponents';
import MainNavigation from 'src/navigation/MainNavigation';
import Providers from 'src/providers/Providers';
import * as NavigationBar from 'expo-navigation-bar';
import * as ScreenOrientation from 'expo-screen-orientation';

enableReactUse();
// enableReactNativeComponents();

const App = () => {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
        '`new NativeEventEmitter()` was called'
    ]);

    useEffect(() => {
        const setDefaults = async () => {
            // Navigation bar
            await NavigationBar.setBackgroundColorAsync('transparent');
            await NavigationBar.setPositionAsync('absolute');

            // Orientation
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        };

        setDefaults();
    }, []);

    return (
        <Providers>
            <StatusBar style='light'  />

            <NavigationContainer>
                <MainNavigation />
            </NavigationContainer>

            {/* TODO: Change navigation hint background */}
        </Providers>
    );
};

registerRootComponent(App);
