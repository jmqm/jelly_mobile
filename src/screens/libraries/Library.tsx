import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type TLibrariesNavigation from 'src/types/navigation/TLibrariesNavigation';
import { FlatList, StyleSheet, View } from 'react-native';
import { memo, useEffect, useState } from 'react';
import type TMedia from 'src/types/jellyfin/media/TMedia';
import { GetUserLibraryItems } from 'src/services/JellyfinAPI';
import MediaCard from 'src/components/MediaCard';
import { FlashList } from '@shopify/flash-list';
import EMediaType from 'src/enums/EMediaType';
import { Appbar, Searchbar } from 'react-native-paper';
import RotationAnimation from 'src/components/animations/RotationAnimation';
import TopographyPattern from 'src/components/patterns/TopographyPattern';
import Background from 'src/components/styled/Background';
import type TMovie from 'src/types/jellyfin/media/TMovie';
import type TSeries from 'src/types/jellyfin/media/TSeries';
import CMovie from 'src/classes/jellyfin/media/CMovie';
import CSeries from 'src/classes/jellyfin/media/CSeries';

type TProps = {

} & NativeStackScreenProps<TLibrariesNavigation, 'Library'>;

const LibraryScreen = (props: TProps) => {
    const { route, navigation } = props;
    const { id: libraryId, name: libraryName } = route.params;

    const [searchString, setSearchString] = useState<string>('');
    const [searchbarVisible, setSearchbarVisible] = useState<boolean>(false);

    const [refreshAnimationValue, setRefreshAnimationValue] = useState(0);

    const [items, setItems] = useState<TMedia[] | null>(null);

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

        setRefreshAnimationValue((prev) => prev + 1);
    };

    const renderItem = ({ item, index }: { item: TMedia, index: number }) => {
        const handleOnPress = (item: TMedia) => {
            if (item instanceof CMovie) {
                navigation.navigate('Movie', { movie: item as TMovie });
            } else if (item instanceof CSeries) {
                navigation.navigate('Series', { series: item as TSeries });
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
            const searchTerm = searchString.length > 0 ? searchString : undefined;
            setItems(await GetUserLibraryItems(libraryId, searchTerm));
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
                <Appbar.BackAction onPress={() => searchbarVisible ? setSearchbarVisible(false) : handleOnBackPress()} />
                {!searchbarVisible && (
                    <Appbar.Content title={searchString.length > 0 ? searchString : libraryName}  />
                )}

                {/* TODO: Create a searchItems, so when the user clears search, items shows up */}
                {!searchbarVisible && searchString.length > 0 && (<Appbar.Action icon='format-clear' onPress={() => { setSearchString(''); setItems(null); }} />)}
                {!searchbarVisible && searchString.length <= 0 && (<Appbar.Action icon='magnify' onPress={() => setSearchbarVisible((prev) => !prev)} />)}
                {searchbarVisible && (
                    <Searchbar
                        autoFocus={true}
                        value={searchString}
                        onChangeText={setSearchString}
                        style={{ flex: 1, height: '80%' }}
                        inputStyle={{ padding: 18 }}
                        onBlur={() => {
                            if (searchString.length > 0) {
                                setItems(null);
                            }

                            setSearchbarVisible(false);
                        }}
                        autoComplete='off'
                        autoCorrect={false}
                    />
                )}

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

                    {items && (
                        <FlatList
                            data={items}
                            renderItem={renderItem}
                            onreach
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
