import { StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import useServerInfo from 'src/providers/server/useServerInfo';
import { Fragment, useEffect, useState } from 'react';
import { GetHomeSectionOrder } from 'src/services/JellyfinAPI';
import EHomeSection from 'src/enums/EHomeSection';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ContinueWatching from 'src/screens/home/ContinueWatching';
import NextUp from 'src/screens/home/NextUp';
import LatestMedia from 'src/screens/home/LatestMedia';

const HomeScreen = () => {
    const { serverInfo, onDelete } = useServerInfo();

    const [displayOrder, setDisplayOrder] = useState<EHomeSection[]>();

    useEffect(() => {
        const load = async () => {
            setDisplayOrder(await GetHomeSectionOrder(serverInfo));
        };

        load();
    }, []);

    return (
        <ScrollView style={{ marginTop: useSafeAreaInsets().top }} contentContainerStyle={styles.container}>
            {/* <Button onPress={onDelete}>Clear server info</Button> */}

            {/* TODO: Look at Jellyfin Vue, copy the top banner, maybe copy that to all sections */}

            {displayOrder && displayOrder.map((section) => (
                <Fragment key={section}>
                    {section === EHomeSection.ContinueWatching && <ContinueWatching />}
                    {section === EHomeSection.NextUp && <NextUp />}
                    {section === EHomeSection.LatestMedia && <LatestMedia />}
                </Fragment>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingHorizontal: 16
    }
});

export default HomeScreen;
