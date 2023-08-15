import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';

const BackButtonComponent = () => {
    const navigation = useNavigation();
    const statusBarHeight = useSafeAreaInsets().top;

    return (
        <Appbar.Header statusBarHeight={0} style={[{ marginTop: statusBarHeight }, styles.backButton]}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'transparent',
        zIndex: 1
    }
});

export default BackButtonComponent;
