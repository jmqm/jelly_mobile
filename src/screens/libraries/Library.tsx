import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type TLibrariesNavigation from 'src/types/navigation/TLibrariesNavigation';
import { StyleSheet, View } from 'react-native';
import { memo, useEffect, useState } from 'react';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';
import { GetUserLibraryItems } from 'src/services/JellyfinAPI';
import MediaCard from 'src/components/MediaCard';
import { FlashList } from '@shopify/flash-list';
import EMediaType from 'src/enums/EMediaType';
import { Appbar } from 'react-native-paper';
import RotationAnimation from 'src/components/animations/RotationAnimation';
import TopographyPattern from 'src/components/patterns/TopographyPattern';
import Background from 'src/components/styled/Background';
import CMovie from 'src/types/JellyfinAPI/media/CMovie';
import CSeries from 'src/types/JellyfinAPI/media/CSeries';

type TProps = {

} & NativeStackScreenProps<TLibrariesNavigation, 'Library'>;

const LibraryScreen = (props: TProps) => {
    const { route, navigation } = props;
    const { id: libraryId, name: libraryName } = route.params;

    const [refreshAnimationValue, setRefreshAnimationValue] = useState(0);

    const [items, setItems] = useState<CMedia[] | null>(null);

    const [flashListNumColumns, setFlashListNumColumns] = useState<number>(1);
    const [flashListVisible, setFlashListVisible] = useState(false);

    const [containerWidthRef, setContainerWidthRef] = useState<number>();
    const [mediaCardWidthRef, setMediaCardWidthRef] = useState<number>();


    const handleOnBackPress = () => {
        navigation.goBack();
    };

    const handleRefreshOnPress = () => {
        setFlashListVisible(false);
        setItems(null);

        setRefreshAnimationValue((previousValue) => previousValue + 1);
    };

    const renderItem = ({ item, index }: { item: CMedia, index: number }) => {
        const handleOnPress = (item: CMedia) => {
            if (item.type === EMediaType.Movie) {
                navigation.navigate('Movie', { movie: item as CMovie });
            } else if (item.type === EMediaType.Series) {
                navigation.navigate('Series', { series: item as CSeries });
            }
        };

        return (
            <View key={item.id} style={styles.itemContainer}>
                <MediaCard
                    media={item}
                    type='Poster'
                    onPress={() => handleOnPress(item)}
                    hideText={true}
                    onLayout={index === 0 ? (event) => setMediaCardWidthRef(event.nativeEvent.layout.width) : undefined}
                />
            </View>
        );
    };

    const ItemSeparatorComponent = () => (
        <View style={styles.itemSeparatorComponent} />
    );


    // Get items.
    useEffect(() => {
        const load = async () => {
            setItems(await GetUserLibraryItems(libraryId));
        };

        if (!items) {
            load();
        }
    }, [items]);

    // Set FlashList number of columns and make it visible
    useEffect(() => {
        setFlashListVisible(false);

        if (items && containerWidthRef && mediaCardWidthRef) {
            const numColumns = Math.max(Math.floor(containerWidthRef / mediaCardWidthRef), 1);
            setFlashListNumColumns(numColumns);
            setFlashListVisible(true);
        }
    }, [items, containerWidthRef, mediaCardWidthRef]);


    return (
        <>
            <Background />
            <TopographyPattern opacity={0.05} />

            <Appbar.Header>
                <Appbar.BackAction onPress={handleOnBackPress} />
                <Appbar.Content title={libraryName} />

                <Appbar.Action icon='magnify'  onPress={() => {}} />
                <RotationAnimation animationReference={refreshAnimationValue}>
                    <Appbar.Action icon='refresh' onPress={handleRefreshOnPress} />
                </RotationAnimation>
            </Appbar.Header>

            <View style={styles.container}>
                <View
                    style={[
                        flashListVisible ? null : styles.invisible,
                        styles.container
                    ]}
                    onLayout={(event) => setContainerWidthRef(event.nativeEvent.layout.width)}
                >
                    {items && (
                        <FlashList
                            data={items}
                            renderItem={renderItem}
                            estimatedItemSize={173}

                            numColumns={flashListNumColumns ?? 1}
                            centerContent={true}
                            initialScrollIndex={0}
                            showsVerticalScrollIndicator={false}

                            ListHeaderComponent={ItemSeparatorComponent}
                            ListFooterComponent={ItemSeparatorComponent}
                            ItemSeparatorComponent={ItemSeparatorComponent}
                        />
                    )}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 2,
        paddingHorizontal: 8
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center'
    },
    itemSeparatorComponent: {
        marginTop: 20
    },
    invisible: {
        opacity: 0
    }
});

export default memo(LibraryScreen);
