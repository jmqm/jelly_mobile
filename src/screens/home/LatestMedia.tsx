import { ReactElement, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import OpacityAnimationComponent from 'src/components/animations/OpacityAnimation';
import useServerInfo from 'src/providers/server/useServerInfo';
import SectionContainer from 'src/screens/home/SectionContainer';
import SectionFlatList from 'src/screens/home/SectionFlatList';
import { GetUserLibraries, GetUserLibraryLatest } from 'src/services/JellyfinAPI';

const LatestMediaComponent = () => {
    const { serverInfo } = useServerInfo();

    const [latestMediaComponents, setLatestMediaComponents] = useState<ReactElement[]>([]);

    const renderItem = ({ item }: { item: ReactElement }) => (item);

    useEffect(() => {
        const load = async () => {
            const userLibraries = await GetUserLibraries(serverInfo);

            setLatestMediaComponents(await Promise.all(userLibraries.map(async (library) => {
                const title = `Latest ${library.Name}`;
                const data = await GetUserLibraryLatest(serverInfo, library.Id);

                return (
                    <SectionContainer title={title} key={title}>
                        <SectionFlatList data={data} imageType='Poster' />
                    </SectionContainer>
                );
            })));
        };

        load();
    }, []);

    return (
        <>
            {latestMediaComponents.length > 0 && (
                <OpacityAnimationComponent>
                    <View style={styles.main}>
                        <FlatList
                            data={latestMediaComponents}
                            renderItem={renderItem}
                            scrollEnabled={false}
                        />
                    </View>
                </OpacityAnimationComponent>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
});

export default LatestMediaComponent;
