import { ReactElement, memo, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MediaCard from 'src/components/MediaCard';
import ELibraryType from 'src/enums/ELibraryType';
import useServerInfo from 'src/providers/server/useServerInfo';
import SectionContainer from 'src/screens/home/SectionContainer';
import { GetUserLibraries, GetUserLibraryLatest } from 'src/services/JellyfinAPI';
import TLibrary from 'src/types/JellyfinAPI/TLibrary';

const LatestMediaComponent = () => {
    const { serverInfo } = useServerInfo();

    const [userLibraries, setUserLibraries] = useState<TLibrary[]>([]);
    const [latestMediaComponents, setLatestMediaComponents] = useState<ReactElement[]>([]);

    const excludedTypes = [ELibraryType.MusicPlaylist, ELibraryType.LiveTv, ELibraryType.Collection, ELibraryType.Channels, ELibraryType.Music];

    // Get user libraries
    useEffect(() => {
        const load = async () => {
            const unfilteredUserLibraries = await GetUserLibraries(serverInfo);
            const filteredUserLibraries = unfilteredUserLibraries.filter(i => excludedTypes.includes(i.Type) === false);

            setUserLibraries(filteredUserLibraries);
        };

        load();
    }, []);

    // Load latests
    useEffect(() => {
        if (userLibraries.length <= 0) {
            return;
        }

        const load = async () => {
            const components = await Promise.all(userLibraries.map(async (library) => {
                const title = `Latest ${library.Name}`;
                const data = await GetUserLibraryLatest(serverInfo, library.Id);

                return (
                    <SectionContainer title={title} key={title}>
                        <FlatList
                            horizontal={true}
                            bounces={false}
                            data={data}
                            style={styles.flatList}
                            renderItem={({ item }) => <MediaCard serverInfo={serverInfo} media={item} />}
                            ItemSeparatorComponent={() => <View style={{ marginLeft: 16 }} />}
                        />
                    </SectionContainer>
                );
            }));

            setLatestMediaComponents(components);
        };

        load();
    }, [userLibraries]);

    return (
        <>
            {latestMediaComponents.length > 0 && latestMediaComponents.map((LatestMediaComponent) => LatestMediaComponent)}
        </>
    );
};

const styles = StyleSheet.create({
    flatList: {
        paddingBottom: 8
    }
});

export default memo(LatestMediaComponent);
