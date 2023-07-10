import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableHighlight } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useServerInfo from 'src/providers/server/useServerInfo';
import { GetUserLibraries } from 'src/services/JellyfinAPI';
import TLibrary from 'src/types/JellyfinAPI/TLibrary';
import type TLibrariesNavigation from 'src/types/navigation/TLibrariesNavigation';

type TProps = {
    navigation: NativeStackNavigationProp<TLibrariesNavigation>
}

const LibrariesScreen = (props: TProps) => {
    const { navigation } = props;
    const { serverInfo } = useServerInfo();

    const [libraryComponents, setLibraryComponents] = useState<ReactElement[] | null>(null);

    useEffect(() => {
        const load = async () => {
            const userLibraries = await GetUserLibraries(serverInfo);

            setLibraryComponents(userLibraries.map((library, index) => {
                return (
                    <View
                        key={library.Id}
                        style={index !== userLibraries.length - 1 ? styles.libraryPadding : null}
                    >
                        <TouchableHighlight onPress={() => handleOnPress(library)} style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={{ uri: `${serverInfo.address}/Items/${library.Id}/Images/Primary?quality=60` }}
                                resizeMode='cover'
                            />
                        </TouchableHighlight>
                    </View>
                );
            }));
        };

        load();
    }, []);

    const handleOnPress = (library: TLibrary) => {
        navigation.navigate('Library', { id: library.Id, name: library.Name });
    };

    return (
        <ScrollView style={[{ marginTop: useSafeAreaInsets().top }, styles.containerContent]}>
            {libraryComponents && libraryComponents.map((library) => library)}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerContent: {
        padding: 16
    },
    libraryPadding: {
        paddingBottom: 16
    },
    imageContainer: {
        borderRadius: 12,
        overflow: 'hidden'
    },
    image: {
        aspectRatio: 16/9
    }
});

export default LibrariesScreen;
