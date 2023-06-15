import { memo, useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import MediaCard from 'src/components/MediaCard';
import useServerInfo from 'src/providers/server/useServerInfo';
import SectionContainer from 'src/screens/home/SectionContainer';
import { GetNextUp } from 'src/services/JellyfinAPI';
import TMedia from 'src/types/JellyfinAPI/TMedia';

const NextUpComponent = () => {
    const { serverInfo } = useServerInfo();

    const [nextUp, setNextUp] = useState<TMedia[]>([]);
    const [, setFlatList] = useState<FlatList | null>(null);

    useEffect(() => {
        const load = async () => {
            let cutOffDate = new Date();
            cutOffDate = new Date(cutOffDate.setDate(cutOffDate.getDate() - 90));

            setNextUp(await GetNextUp(serverInfo, cutOffDate));
        };

        load();
    }, []);

    return (
        <SectionContainer title='Next Up'>
            <FlatList
                ref={(ref) => setFlatList(ref)}
                horizontal={true}
                bounces={false}
                data={nextUp}
                style={styles.flatList}
                renderItem={({ item }) => <MediaCard serverInfo={serverInfo} media={item} />}
                ItemSeparatorComponent={() => <View style={{ marginLeft: 15 }} />}
            />
        </SectionContainer>
    );
};

const styles = StyleSheet.create({
    flatList: {
        paddingBottom: 8
    }
});

export default memo(NextUpComponent);
