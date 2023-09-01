import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type TMediaNavigation from 'src/types/navigation/TMediaNavigation';
import { ToastAndroid, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import Background from 'src/components/styled/Background';
import { useCallback, useEffect, useState } from 'react';
import server$ from 'src/state/server/server$';
import { FlashList } from '@shopify/flash-list';
import CEpisode from 'src/types/JellyfinAPI/media/CEpisode';
import theme from 'src/theme';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import OpacityAnimation from 'src/components/animations/OpacityAnimation';
import { clamp } from 'src/utilities/General';

type TProps = {

} & NativeStackScreenProps<TMediaNavigation, 'Season'>;

const SeasonScreen = (props: TProps) => {
    const { route, navigation } = props;
    const { series, season } = route.params!;
    const { server } = server$.get();

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [_, forceReload] = useState<number>(0);


    const height = Dimensions.get('window').height;
    const cardSize = clamp(100, height / 7.5, 135);


    const PreviewTextComponent = () => {
        if (season.episodes.length > 0) {
            return (
                <Text style={[styles.paddingHorizontal, styles.preview]} variant='bodyMedium'>
                    {season.episodes.filter((i) => i.userData.watched).length}{' watched, '}
                    {season.episodes.filter((i) => !i.userData.watched).length}{' remaining'}
                </Text>
            );
        }
    };

    const ItemSeparatorComponent = () => (
        <View style={styles.separator} />
    );

    const handleOnRefresh = () => {
        setRefreshing(true);
    };


    // Load data.
    useEffect(() => {
        const load = async () => {
            const response = await season.getEpisodes(series);

            if (response === false) {
                ToastAndroid.show('Unable to get season episodes', ToastAndroid.SHORT);
                return;
            }

            setRefreshing(false);
            forceReload((prev) => ++prev);
        };

        if (season.episodes.length <= 0 || refreshing) {
            console.log('called to get episodes');
            load();
        }
    }, [refreshing]);


    const renderItem = ({ item: episode }: { item: CEpisode }) => {
        const imageUrl = `${server.address}/Items/${episode.id}/Images/Primary?quality=60`;
        const special = season.number !== episode.seasonNumber;
        const watched = episode.userData.watched;
        const allEpisodesWatched = season.episodes.every((episode) => episode.userData.watched);


        const handleOnPress = () => {
            navigation.navigate('Episode', { episode: episode });
        };


        return (
            <OpacityAnimation>
                <TouchableOpacity onPress={handleOnPress} activeOpacity={0.5}>
                    <View style={[
                        watched && allEpisodesWatched === false ? styles.watched : null,
                        { height: cardSize },
                        styles.episode
                    ]}>
                        {/* React Native Image */}
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.image}
                            resizeMode='cover'
                        />

                        <MaskedView style={styles.flex} maskElement={
                            <LinearGradient colors={[...Array(5).fill('white'), 'transparent']} style={styles.flex} />
                        }>
                            <View style={styles.textContainer}>
                                <Text variant='titleSmall' numberOfLines={2}>
                                    {episode.formattedString(special ? true : false, true, true, special ? undefined : '. ')}
                                </Text>
                                <Text style={styles.description}>{episode.description}</Text>
                            </View>
                        </MaskedView>
                    </View>
                </TouchableOpacity>
            </OpacityAnimation>
        );
    };


    return (
        <>
            <Background />

            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={season.name} />
            </Appbar.Header>

            <View style={styles.root}>
                <FlashList
                    data={season.episodes}
                    renderItem={renderItem}
                    estimatedItemSize={cardSize}

                    onRefresh={handleOnRefresh}
                    refreshing={refreshing}

                    contentContainerStyle={styles.paddingHorizontal}
                    numColumns={1}
                    initialScrollIndex={0}

                    ListHeaderComponent={(
                        <>
                            <PreviewTextComponent />
                            <ItemSeparatorComponent />
                        </>
                    )}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    ListFooterComponent={ItemSeparatorComponent}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        minHeight: 2
    },
    paddingHorizontal: {
        paddingHorizontal: 16
    },

    preview: {
        opacity: 0.5,
        alignSelf: 'center'
    },

    episode: {
        flex: 1,
        flexDirection: 'row',
        gap: 8
    },
    watched: {
        opacity: 0.5
    },
    image: {
        backgroundColor: theme.colors.backdrop,
        borderRadius: theme.roundness,
        aspectRatio: 1/1
    },
    textContainer: {
        flex: 1,
        gap: 4,
        overflow: 'hidden'
    },
    description: {
        opacity: 0.85
    },
    separator: {
        marginBottom: 16
    },

    // Helpers
    flex: {
        flex: 1
    }
});

export default SeasonScreen;
