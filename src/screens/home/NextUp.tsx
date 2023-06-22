import { memo, useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import MediaCard from 'src/components/MediaCard';
import useServerInfo from 'src/providers/server/useServerInfo';
import SectionContainer from 'src/screens/home/SectionContainer';
import { GetNextUp } from 'src/services/JellyfinAPI';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';

const NextUpComponent = () => {
    const { serverInfo } = useServerInfo();

    const [nextUp, setNextUp] = useState<CMedia[]>([]);

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
                horizontal={true}
                bounces={false}
                data={nextUp}
                style={styles.flatList}
                renderItem={({ item }) => <MediaCard serverInfo={serverInfo} media={item} type='Thumbnail' />}
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

export default memo(NextUpComponent);
