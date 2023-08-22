import { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import AddServer from 'src/screens/server/AddServer';
import server$ from 'src/state/server/server$';
import user$ from 'src/state/user/user$';
import UserLogin from 'src/screens/users/UserLogin';
import Home from 'src/screens/home/Home';
import Downloads from 'src/screens/downloads/Downloads';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FullscreenLoadingScreen from 'src/screens/shared/FullscreenLoading';
import LibrariesNavigation from 'src/navigation/LibrariesNavigation';
import type TMainNavigation from 'src/types/navigation/TMainNavigation';
import DeveloperScreen from 'src/screens/developer/Developer';
import * as NavigationBar from 'expo-navigation-bar';

const Tab = createMaterialBottomTabNavigator<TMainNavigation>();

const MainNavigation = () => {
    const { server } = server$.use();
    const { user } = user$.use();

    const paddingBottom = useSafeAreaInsets().bottom;


    useEffect(() => {
        const run = async () => {
            await NavigationBar.setBackgroundColorAsync('transparent');
            await NavigationBar.setPositionAsync('absolute');
        };

        run();
    }, []);


    if (server === undefined) {
        return (
            <FullscreenLoadingScreen />
        );
    };

    if (!(server.address && server.id && server.name)) {
        return (
            <AddServer />
        );
    };

    if (!(user.loginName && user.accessToken)) {
        return (
            <UserLogin />
        );
    };

    return (
        <Tab.Navigator
            initialRouteName='Home'
            compact={true}
            shifting={true}
            safeAreaInsets={{ bottom: paddingBottom }}
            keyboardHidesNavigationBar={true}
        >
            {
                // TODO: Make icons rounded.
            }

            <Tab.Screen name='LibrariesStack' component={LibrariesNavigation} options={{ title: 'Libraries', tabBarIcon: 'library' }} />
            {/* <Tab.Screen name='Home' component={Home} options={{ title: 'Home', tabBarIcon: 'home' }} /> */}
            <Tab.Screen name='Downloads' component={Downloads} options={{ title: 'Downloads', tabBarIcon: 'download' }} />

            {__DEV__ && (
                <Tab.Screen name='Developer' component={DeveloperScreen} options={{ tabBarIcon: 'wrench' }} />
            )}
        </Tab.Navigator>
    );
};

export default MainNavigation;
