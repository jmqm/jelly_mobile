import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type TLibrariesNavigation from 'src/types/navigation/TLibrariesNavigation';
import Libraries from 'src/screens/libraries/Libraries';
import Library from 'src/screens/libraries/Library';
import Movie from 'src/screens/media/Movie';
import Series from 'src/screens/media/Series';
import Season from 'src/screens/media/Season';
import Episode from 'src/screens/media/Episode';

const Stack = createNativeStackNavigator<TLibrariesNavigation>();

const LibrariesNavigation = () => (
    <Stack.Navigator
        initialRouteName='Libraries'
        screenOptions={{
            headerShown: false,
            animation: 'fade'
        }}
    >
        <Stack.Screen name='Libraries' component={Libraries} />
        <Stack.Screen name='Library' component={Library} />

        <Stack.Screen name='Movie' component={Movie} />
        <Stack.Screen name='Series' component={Series} />
        <Stack.Screen name='Season' component={Season} />
        <Stack.Screen name='Episode' component={Episode} />
    </Stack.Navigator>
);

export default LibrariesNavigation;
