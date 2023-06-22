import { useRef, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, LayoutChangeEvent } from 'react-native';
import { Text, ProgressBar, useTheme } from 'react-native-paper';
import EMediaType from 'src/enums/EMediaType';
import CEpisode from 'src/types/JellyfinAPI/media/CEpisode';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';
import TServerInfo from 'src/types/server/TServerInfo';

type TProps = {
    serverInfo: TServerInfo;
    media: CMedia;
    type: 'Poster' | 'Thumbnail';
};

const MediaCard = (props: TProps) => {
    const { serverInfo, media, type } = props;

    const containerRef = useRef<View | null>(null);
    const [imageFailed, setImageFailed] = useState<boolean>(false);

    const theme = useTheme();


    const calculatingWidth = Math.min(Dimensions.get('screen').width, Dimensions.get('screen').height / 2, 450);
    const shortestSide = calculatingWidth * 0.4;


    // TODO: This functionality should not be here, MediaCard should not know anything of what image to load.
    const imageUrl =
        media.type === EMediaType.Episode && type === 'Poster' ? `${serverInfo.address}/Items/${(media as CEpisode).seriesId}/Images/Primary` :
        `${serverInfo.address}/Items/${media.id}/Images/Primary`;


    const handleOnError = () => {
        setImageFailed(true);
    };

    const handleLayout = (event: LayoutChangeEvent) => {
        containerRef.current?.setNativeProps({ style: { width: event.nativeEvent.layout.width } });
    };


    return (
        <View key={`${media.id}${media.name}`} style={styles.container} ref={containerRef}>
            <View
                style={[
                    { aspectRatio: type === 'Poster' ? 0.67/1 : 16/9 },
                    type === 'Poster' ? { width: shortestSide * 1.1 } : { height: shortestSide }, // Make posters slightly larger
                    styles.imageContainer
                ]}
                onLayout={handleLayout}
            >
                {/* TODO: Add multiple source uris */}
                {imageFailed === false && (
                    <Image
                        style={styles.image}
                        source={{ uri: imageUrl }}
                        resizeMode='cover'
                        onError={handleOnError}
                    />
                )}

                {imageFailed && (
                    <View style={[ { backgroundColor: theme.colors.primaryContainer }, styles.image, styles.fallbackContainer ]}>
                        <Text numberOfLines={3} style={styles.fallbackText}>{media.title.toUpperCase()}</Text>
                    </View>
                )}

                {(isFinite(media.playedPercentage) && media.playedPercentage > 0) && (
                    <ProgressBar style={styles.progressBar} progress={media.playedPercentage / 100} />
                )}
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>{media.title}</Text>
                <Text style={styles.subtitle} numberOfLines={1}>{media.subtitle}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'contain',
        backgroundColor: 'transparent'
    },
    imageContainer: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        resizeMode: 'contain'
    },
    fallbackContainer: {
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fallbackText: {
        fontSize: 18,
        fontWeight: 'bold',
        opacity: 0.8
    },
    progressBar: {
        position: 'absolute',
        bottom: 0,
        height: 5,
        opacity: 0.8
    },
    textContainer: {
        paddingTop: 4
    },
    title: {
        fontSize: 14
    },
    subtitle: {
        fontSize: 13,
        opacity: 0.8
    }
});

export default MediaCard;
