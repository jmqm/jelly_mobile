import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AddServer from 'src/screens/server/AddServer';
import useServerInfo from 'src/providers/server/useServerInfo';
import UserLogin from 'src/screens/users/UserLogin';
import Home from 'src/screens/home/Home';
import Downloads from 'src/screens/downloads/Downloads';
import Libraries from 'src/screens/libraries/Libraries';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FullscreenLoadingScreen from 'src/screens/shared/FullscreenLoading';

const Tab = createMaterialBottomTabNavigator();

const MainNavigator = () => {
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
        <NavigationContainer>
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
                    // TODO: Add back history for each screen.
                    // TODO: Make icons rounded.
                }

                <Tab.Screen name='Libraries' component={Libraries} options={{ tabBarIcon: 'library' }} />
                <Tab.Screen name='Home' component={Home} options={{ tabBarIcon: 'home' }} />
                <Tab.Screen name='Downloads' component={Downloads} options={{ tabBarIcon: 'download' }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;
