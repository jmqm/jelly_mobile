import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useServerInfo from 'src/providers/server/useServerInfo';
import { GetUserLibraries } from 'src/services/JellyfinAPI';
import TLibrary from 'src/types/JellyfinAPI/TLibrary';

const LibrariesScreen = () => {
    const { serverInfo } = useServerInfo();

    const [userLibraries, setUserLibraries] = useState<TLibrary[]>([]);

    useEffect(() => {
        const load = async () => {
            setUserLibraries(await GetUserLibraries(serverInfo));
        };

        load();
    }, []);

    return (
        <ScrollView
            style={{ marginTop: useSafeAreaInsets().top }}
            contentContainerStyle={styles.containerContent}
        >
            {userLibraries.map((library, index) => {
                return (
                    <View key={library.Id} style={index !== userLibraries.length - 1 ? styles.libraryPadding : null}>
                        <Image
                            style={styles.image}
                            source={{ uri: `${serverInfo.address}/Items/${library.Id}/Images/Primary` }}
                            resizeMode='cover'
                        />
                    </View>
                );
            })}
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
    image: {
        borderRadius: 12,
        overflow: 'hidden',
        aspectRatio: 16/9
    }
});

export default LibrariesScreen;
