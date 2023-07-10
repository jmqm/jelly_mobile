import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Libraries from 'src/screens/libraries/Libraries';
import Library from 'src/screens/libraries/Library';
import TLibrariesNavigation from 'src/types/navigation/TLibrariesNavigation';

const Stack = createNativeStackNavigator<TLibrariesNavigation>();

const LibrariesNavigation = () => {

    return (
        <Stack.Navigator
            initialRouteName='Libraries'
        >
            <Stack.Screen name='Libraries' component={Libraries} options={{ headerShown: false }} />
            <Stack.Screen name='Library' component={Library} />
        </Stack.Navigator>
    );
};

export default LibrariesNavigation;
