import { Dimensions, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Background from 'src/components/styled/Background';

const FullscreenLoadingScreen = () => {
    const { width, height } = Dimensions.get('window');

    return (
        <>
            <Background />

            <View style={[{ paddingTop: useSafeAreaInsets().top }, { width: width, height: height }, styles.loading ]}>
                <ActivityIndicator animating={true} size='large' />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default FullscreenLoadingScreen;
