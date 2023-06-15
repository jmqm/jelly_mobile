import { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import ELibraryType from 'src/enums/ELibraryType';
import useServerInfo from 'src/providers/server/useServerInfo';
import SectionContainer from 'src/screens/home/SectionContainer';
import { GetUserLibraries } from 'src/services/JellyfinAPI';
import TLibrary from 'src/types/JellyfinAPI/TLibrary';

const LatestMediaComponent = () => {
    const { serverInfo } = useServerInfo();

    const [userLibraries, setUserLibraries] = useState<TLibrary[]>([]);

    const excludedTypes = [ELibraryType.MusicPlaylist, ELibraryType.LiveTv, ELibraryType.Collection, ELibraryType.Channels];

    useEffect(() => {
        const load = async () => {
            const unfilteredUserLibraries = await GetUserLibraries(serverInfo);
            const filteredUserLibraries = unfilteredUserLibraries.filter(i => excludedTypes.includes(i.Type) === false);

            setUserLibraries(filteredUserLibraries);
        };

        load();
    }, []);

    return (
        <>
            {userLibraries.length > 0 && userLibraries.map((library) => {
                const title = `Latest ${library.Name}`;

                return (
                    <SectionContainer title={title} key={title}>
                        <Text>ASD</Text>
                    </SectionContainer>
                );
            })}
        </>
    );
};

export default LatestMediaComponent;
