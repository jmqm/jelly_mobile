import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';

const BackButtonComponent = () => {
    const navigation = useNavigation();
    const statusBarHeight = useSafeAreaInsets().top;

    return (
        <Appbar.Header statusBarHeight={0} style={[{ marginTop: statusBarHeight }, styles.header]}>
            <Appbar.BackAction onPress={() => navigation.goBack()} style={styles.backButton} />
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'transparent',
        zIndex: 1
    },
    backButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.20)'
    }
});

export default BackButtonComponent;
