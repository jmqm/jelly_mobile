import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TLibrariesNavigation from 'src/types/navigation/TLibrariesNavigation';
import { RouteProp } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { memo, useEffect, useState } from 'react';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';
import { GetUserLibraryItems } from 'src/services/JellyfinAPI';
import useServerInfo from 'src/providers/server/useServerInfo';
import MediaCard from 'src/components/MediaCard';
import { FlashList } from '@shopify/flash-list';

type TProps = {
    route: RouteProp<TLibrariesNavigation>
    navigation: NativeStackNavigationProp<TLibrariesNavigation>
}

const LibraryScreen = (props: TProps) => {
    const { route, navigation } = props;
    const { id: libraryId, name: libraryName } = route.params!;
    const { serverInfo } = useServerInfo();

    const [items, setItems] = useState<CMedia[] | null>(null);

    const [flashListNumColumns, setFlashListNumColumns] = useState<number>(1);
    const [flashListVisible, setFlashListVisible] = useState(false);

    const [containerWidthRef, setContainerWidthRef] = useState<number | null>(null);
    const [mediaCardWidthRef, setMediaCardWidthRef] = useState<number | null>(null);


    const renderItem = ({ item, index }: { item: CMedia, index: number }) => (
        <View key={item.id} style={styles.itemContainer}>
            <MediaCard
                media={item}
                type='Poster'
                onPress={() => handleOnPress(item)}
                hideText={true}
                onLayout={index === 1 ? (event) => setMediaCardWidthRef(event.nativeEvent.layout.width) : undefined}
            />
        </View>
    );

    const handleOnPress = (item: CMedia) => {
        console.log(`${item.name} - ${item.id}`);
    };


    // Set header title.
    useEffect(() => {
        navigation.setOptions({ title: libraryName });
    }, []);

    // Get items.
    useEffect(() => {
        const load = async () => {
            setItems(await GetUserLibraryItems(serverInfo, libraryId));
        };

        load();
    }, []);

    // Set FlashList number of columns and make it visible
    useEffect(() => {
        if (containerWidthRef && mediaCardWidthRef) {
            const numColumns = Math.max(Math.floor(containerWidthRef / mediaCardWidthRef), 1);
            setFlashListNumColumns(numColumns);
            setFlashListVisible(true);
        }
    }, [containerWidthRef, mediaCardWidthRef]);


    const ItemSeparatorComponent = () => (
        <View style={styles.itemSeparatorComponent} />
    );


    return (
        <View
            style={[
                flashListVisible ? null : styles.invisible,
                styles.container
            ]}
            onLayout={(event) => setContainerWidthRef(event.nativeEvent.layout.width)}
        >
            <FlashList
                data={items}
                renderItem={renderItem}
                estimatedItemSize={173}

                numColumns={flashListNumColumns ?? 1}
                centerContent={true}
                initialScrollIndex={0}

                ListHeaderComponent={ItemSeparatorComponent}
                ListFooterComponent={ItemSeparatorComponent}
                ItemSeparatorComponent={ItemSeparatorComponent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 2
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
