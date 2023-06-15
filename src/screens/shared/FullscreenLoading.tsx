import { StyleSheet, View, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FullscreenLoadingScreen = () => {
    return (
        <View style={[{ paddingTop: useSafeAreaInsets().top }, styles.loading ]}>
            <ActivityIndicator animating={true} size='large' />
        </View>
    );
};

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,

        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default FullscreenLoadingScreen;
