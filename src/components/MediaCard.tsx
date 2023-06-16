import { useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Text, ProgressBar, useTheme } from 'react-native-paper';
import EMediaType from 'src/enums/EMediaType';
import ESeriesStatus from 'src/enums/ESeriesStatus';
import TMedia from 'src/types/JellyfinAPI/TMedia';
import TServerInfo from 'src/types/server/TServerInfo';

type TProps = {
    serverInfo: TServerInfo;
    media: TMedia;
};

const MediaCard = (props: TProps) => {
    const { serverInfo, media } = props;

    const [imageFailed, setImageFailed] = useState<boolean>(false);

    const theme = useTheme();

    const title = media.Type === EMediaType.Movie ? media.Name
                : media.Type === EMediaType.Series ? media.Name
                : media.Type === EMediaType.Episode ? media.Series
                : media.Type === EMediaType.Audio ? media.Name
                : 'Unsupported Media Type';

    const subtitle = media.Type === EMediaType.Movie ? media.Year
                   : media.Type === EMediaType.Series ? `${media.Year}${media.SeriesStatus === ESeriesStatus.Continuing ? ' - Continuing' : ''}`
                   : media.Type === EMediaType.Episode ? `S${media.Season}:E${media.SeriesEpisode} - ${media.Name}`
                   : media.Type === EMediaType.Audio ? media.AudioArtists.join(', ')
                   : 'Unsupported Media Type';

    const handleOnError = () => {
        setImageFailed(true);
    };

    return (
        <View style={styles.card} key={`${media.Id}${media.Name}`}>
            <View style={styles.header}>
                {/* TODO: Add multiple source uris */}
                <Image
                    style={[imageFailed ? { display: 'none' } : null, styles.cover]}
                    source={{ uri: `${serverInfo.address}/Items/${media.Id}/Images/Primary` }}
                    resizeMode='cover'
                    onError={handleOnError}
                />

                <View style={[imageFailed ? null : { display: 'none' }, { backgroundColor: theme.colors.primaryContainer }, styles.cover, styles.fallback]}>
                    <Text numberOfLines={3} style={styles.fallbackText}>{title.toUpperCase()}</Text>
                </View>

                {isFinite(media.PlayedPercentage) && (
                    <ProgressBar style={styles.progressBar} progress={media.PlayedPercentage / 100} />
                )}
            </View>

            <View style={styles.text}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
            </View>
        </View>
    );
};

const screenWidth = Math.min(Dimensions.get('screen').width, Dimensions.get('screen').height / 2, 450);

const styles = StyleSheet.create({
    card: {
        width: screenWidth * 0.72,
        backgroundColor: 'transparent'
    },
    header: {
        height: screenWidth * 0.405,
        borderRadius: 12,
        overflow: 'hidden'
    },
    cover: {
        flex: 1
    },
    fallback: {
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
    text: {
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
