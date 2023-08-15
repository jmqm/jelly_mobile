import { StyleSheet, LayoutChangeEvent } from 'react-native';
import { FAB } from 'react-native-paper';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';

type TProps = {
    refHeight: (height: number) => void;
    media: CMedia;
};

const FABPlayButtonComponent = (props: TProps) => {
    const { refHeight, media } = props;

    const handleOnLayout = (event: LayoutChangeEvent) => {
        refHeight(event.nativeEvent.layout.height);
    };

    const handleOnPress = () => {
        // TODO: Add playback functionality.
        console.log(`play ${media.name}`);
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
