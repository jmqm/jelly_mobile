import { useState } from 'react';
import { TouchableHighlight } from 'react-native';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { Text, ProgressBar, useTheme } from 'react-native-paper';
import { Image } from 'react-native-expo-image-cache';
import EMediaType from 'src/enums/EMediaType';
import useServerInfo from 'src/providers/server/useServerInfo';
import CEpisode from 'src/types/JellyfinAPI/media/CEpisode';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';
import { getRecommendedPosterWidthSize, getRecommendedThumbnailWidthSize } from 'src/utilities/Media';
import MediaConstants from 'src/constants/Media';

type TProps = {
    media: CMedia;
    type: 'Poster' | 'Thumbnail';
    hideText?: boolean;

    onPress?(): void;
    onLayout?(event: LayoutChangeEvent): void;
};

const MediaCard = (props: TProps) => {
    const { serverInfo } = useServerInfo();
    const { media, type, hideText, onPress, onLayout } = props;

    const [imageFailed, setImageFailed] = useState<boolean>(false);

    const theme = useTheme();


    const imageSideSize = type === 'Poster' ? getRecommendedPosterWidthSize()
        : getRecommendedThumbnailWidthSize();


    // TODO: This functionality should not be here, MediaCard should not know anything of what image to load.
    const imageUrl =
        media.type === EMediaType.Episode && type === 'Poster' ? `${serverInfo.address}/Items/${(media as CEpisode).seriesId}/Images/Primary?quality=60` :
        `${serverInfo.address}/Items/${media.id}/Images/Primary?quality=60`;


    const handleOnError = () => {
        setImageFailed(true);
    };


    return (
        <View style={[{ width: imageSideSize }, styles.container]} onLayout={onLayout}>
            <TouchableHighlight onPress={onPress} style={styles.imageContainer}>
                <View
                    style={[
                        { aspectRatio: type === 'Poster' ? MediaConstants.poster.ratio : MediaConstants.thumbnail.ratio },
                        { width: imageSideSize },
                        styles.imageContainer
                    ]}
                >
                    {/* TODO: Add multiple source uris */}
                    {imageFailed === false && (
                        <Image
                            uri={imageUrl}
                            style={styles.image}
                            transitionDuration={100}
                            onError={handleOnError}
                        />
                    )}

                    {imageFailed && (
                        <View style={[ { backgroundColor: theme.colors.primaryContainer }, styles.image, styles.fallbackContainer ]}>
                            <Text numberOfLines={3} style={styles.fallbackText}>{media.title.toUpperCase()}</Text>
                        </View>
                    )}

                    {isFinite(media.playedPercentage) && media.playedPercentage > 0 && (
                        <ProgressBar style={styles.progressBar} progress={media.playedPercentage / 100} />
                    )}
                </View>
            </TouchableHighlight>

            {!hideText && (
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={1}>{media.title}</Text>
                    <Text style={styles.subtitle} numberOfLines={1}>{media.subtitle}</Text>
                </View>
            )}
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
        resizeMode: 'cover'
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
