import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Background from 'src/components/styled/Background';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
    return (
        <>
            <Background />

            <View style={[{ paddingTop: useSafeAreaInsets().top }, styles.root]}>
                <View style={styles.chips}>
                    <Chip mode='flat' icon='cog'>Settings</Chip>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        margin: 16
    },
    chips: {
        flex: 1,
        alignItems: 'flex-end'
    }
});

export default HomeScreen;
