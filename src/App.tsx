import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import MainNavigation from 'src/navigation/MainNavigation';
import Providers from 'src/providers/Providers';

const App = () => (
    <Providers>
        <NavigationContainer>
            <MainNavigation />
        </NavigationContainer>
    </Providers>
);

registerRootComponent(App);
