import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import AddServer from 'src/screens/server/AddServer';
import server$ from 'src/state/server/server$';
import user$ from 'src/state/user/user$';
import UserLogin from 'src/screens/users/UserLogin';
import LibrariesNavigation from 'src/navigation/LibrariesNavigation';
import Home from 'src/screens/home/Home';
import Downloads from 'src/screens/downloads/Downloads';
import Developer from 'src/screens/developer/Developer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FullscreenLoadingScreen from 'src/screens/shared/FullscreenLoading';
import type TMainNavigation from 'src/types/navigation/TMainNavigation';
import hiddenConfigurations$ from 'src/state/hiddenConfigurations/hiddenConfigurations$';

const Tab = createMaterialBottomTabNavigator<TMainNavigation>();

const MainNavigation = () => {
    const { server } = server$.use();
    const { user } = user$.use();
    const hiddenConfigurations = hiddenConfigurations$;

    const paddingBottom = useSafeAreaInsets().bottom;


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
            initialRouteName={__DEV__ ? undefined : 'Home'}
            compact={true}
            shifting={true}
            safeAreaInsets={{ bottom: paddingBottom }}
            keyboardHidesNavigationBar={true}
            barStyle={
                hiddenConfigurations.hideMainNavigation.get() ? { display: 'none' } : null
            }
        >
            {
                // TODO: Make icons rounded.
            }

            <Tab.Screen name='LibrariesStack' component={LibrariesNavigation} options={{ title: 'Libraries', tabBarIcon: 'library' }} />
            <Tab.Screen name='Home' component={Home} options={{ tabBarIcon: 'home' }} />
            <Tab.Screen name='Downloads' component={Downloads} options={{ tabBarIcon: 'download' }} />

            {__DEV__ && (
                <Tab.Screen name='Developer' component={Developer} options={{ tabBarIcon: 'wrench' }} />
            )}
        </Tab.Navigator>
    );
};

export default MainNavigation;
