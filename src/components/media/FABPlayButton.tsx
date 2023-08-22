import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, LayoutChangeEvent } from 'react-native';
import { FAB } from 'react-native-paper';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';
import TMediaNavigation from 'src/types/navigation/TMediaNavigation';

type TProps = {
    refHeight: (height: number) => void;
    media: CMedia;
};

const FABPlayButtonComponent = (props: TProps) => {
    const { refHeight, media } = props;

    const navigation: NavigationProp<TMediaNavigation> = useNavigation();

    const handleOnLayout = (event: LayoutChangeEvent) => {
        refHeight(event.nativeEvent.layout.height);
    };

    const handleOnPress = () => {
        navigation.navigate('VideoPlayer', { media: media });
    };

    return (
        <FAB
            onLayout={handleOnLayout}
            icon='play'
            variant='tertiary'
            style={styles.play}
            onPress={handleOnPress}
        />
    );
};

const styles = StyleSheet.create({
    play: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        margin: 16
    }
});

export default FABPlayButtonComponent;
