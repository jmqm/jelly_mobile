import { registerRootComponent } from 'expo';
import MainNavigator from 'src/navigators/MainNavigator';
import Providers from 'src/providers/Providers';

const App = () => (
    <Providers>
        <MainNavigator />
    </Providers>
);

registerRootComponent(App);
