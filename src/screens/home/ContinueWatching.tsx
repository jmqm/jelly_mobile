import { memo, useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import MediaCard from 'src/components/MediaCard';
import useServerInfo from 'src/providers/server/useServerInfo';
import SectionContainer from 'src/screens/home/SectionContainer';
import { GetContinueWatching } from 'src/services/JellyfinAPI';
import TMedia from 'src/types/JellyfinAPI/TMedia';

const ContinueWatchingComponent = () => {
    const { serverInfo } = useServerInfo();

    const [continueWatching, setContinueWatching] = useState<TMedia[]>([]);

    useEffect(() => {
        const load = async () => {
            setContinueWatching(await GetContinueWatching(serverInfo));
        };

        load();
    }, []);

    return (
        <SectionContainer title='Continue Watching'>
            <FlatList
                horizontal={true}
                bounces={false}
                data={continueWatching}
                style={styles.flatList}
                renderItem={({ item }) => <MediaCard serverInfo={serverInfo} media={item} />}
                ItemSeparatorComponent={() => <View style={{ marginLeft: 16 }} />}
            />
        </SectionContainer>
    );
};

const styles = StyleSheet.create({
    flatList: {
        paddingBottom: 8
    }
});

export default memo(ContinueWatchingComponent);
