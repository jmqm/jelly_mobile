import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableHighlight, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopographyPattern from 'src/components/patterns/TopographyPattern';
import Background from 'src/components/styled/Background';
import server$ from 'src/state/server/server$';
import { GetUserLibraries } from 'src/services/JellyfinAPI';
import type TLibrary from 'src/types/jellyfin/TLibrary';
import type TLibrariesNavigation from 'src/types/navigation/TLibrariesNavigation';

type TProps = {

} & NativeStackScreenProps<TLibrariesNavigation, 'Libraries'>;

const LibrariesScreen = (props: TProps) => {
    const { navigation } = props;
    const { server } = server$.get();

    const [libraryComponents, setLibraryComponents] = useState<ReactElement[] | null>(null);

    const theme = useTheme();


    const handleOnPress = (library: TLibrary) => {
        navigation.navigate('Library', { id: library.Id, name: library.Name });
    };


    useEffect(() => {
        const load = async () => {
            const userLibraries = await GetUserLibraries();

            setLibraryComponents(userLibraries.map((library, index) => {
                return (
                    <View
                        key={library.Id}
                        style={index !== userLibraries.length - 1 ? styles.libraryPadding : null}
                    >
                        <TouchableHighlight onPress={() => handleOnPress(library)} style={[{ borderRadius: theme.roundness }, styles.imageContainer]}>
                            <Image
                                style={styles.image}
                                source={{ uri: `${server.address}/Items/${library.Id}/Images/Primary?quality=60` }}
                                resizeMode='cover'
                            />
                        </TouchableHighlight>
                    </View>
                );
            }));
        };

        load();
    }, []);


    return (
        <>
            <Background />
            <TopographyPattern />

            <View style={[{ paddingTop: useSafeAreaInsets().top }, styles.main]}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    {libraryComponents && libraryComponents.map((library) => library)}
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    scrollView: {
        padding: 16
    },
    libraryPadding: {
        paddingBottom: 16
    },
    imageContainer: {
        overflow: 'hidden'
    },
    image: {
        aspectRatio: 16/9
    }
});

export default LibrariesScreen;
