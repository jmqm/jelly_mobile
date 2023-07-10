import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AddServer from 'src/screens/server/AddServer';
import useServerInfo from 'src/providers/server/useServerInfo';
import UserLogin from 'src/screens/users/UserLogin';
import Home from 'src/screens/home/Home';
import Downloads from 'src/screens/downloads/Downloads';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FullscreenLoadingScreen from 'src/screens/shared/FullscreenLoading';
import LibrariesNavigation from 'src/navigation/LibrariesNavigation';
import type TMainNavigation from 'src/types/navigation/TMainNavigation';

const Tab = createMaterialBottomTabNavigator<TMainNavigation>();

const MainNavigation = () => {
    const { loaded, serverInfo } = useServerInfo();

    // TODO: Create a 'loaded' property in serverInfo or TServerInfoContext, show FullscreenLoading component conditionally

    const paddingBottom = useSafeAreaInsets().bottom;

    if (loaded === false) {
        return (
            <FullscreenLoadingScreen />
        );
    };

    if (!(serverInfo.address && serverInfo.serverId && serverInfo.serverName)) {
        return (
            <AddServer />
        );
    };

    if (!(serverInfo.userName && serverInfo.userAccessToken)) {
        return (
            <UserLogin />
        );
    };

    return (
        <Tab.Navigator
            initialRouteName='Home'
            compact={true}
            shifting={true}
            screenListeners={{
                blur: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            }}
            safeAreaInsets={{
                bottom: paddingBottom
            }}
        >
            {
                // TODO: Make icons rounded.
            }

            <Tab.Screen name='LibrariesStack' component={LibrariesNavigation} options={{ title: 'Libraries', tabBarIcon: 'library' }} />
            <Tab.Screen name='Home' component={Home} options={{ title: 'Home', tabBarIcon: 'home' }} />
            <Tab.Screen name='Downloads' component={Downloads} options={{ title: 'Downloads', tabBarIcon: 'download' }} />
        </Tab.Navigator>
    );
};

export default MainNavigation;
