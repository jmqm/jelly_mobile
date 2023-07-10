import { StyleSheet, View } from 'react-native';
import useServerInfo from 'src/providers/server/useServerInfo';
import { Fragment, ReactElement, useEffect, useState } from 'react';
import { GetHomeSectionOrder } from 'src/services/JellyfinAPI';
import EHomeSection from 'src/enums/EHomeSection';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ContinueWatching from 'src/screens/home/ContinueWatching';
import NextUp from 'src/screens/home/NextUp';
import LatestMedia from 'src/screens/home/LatestMedia';
import { FlashList } from '@shopify/flash-list';

const HomeScreen = () => {
    const { serverInfo } = useServerInfo();

    const [sectionComponents, setSectionComponents] = useState<ReactElement[] | null>(null);

    const renderItem = ({ item }: { item: ReactElement }) => (item);

    useEffect(() => {
        const load = async () => {
            const displayOrder = await GetHomeSectionOrder(serverInfo);

            setSectionComponents(displayOrder && displayOrder.map((section) => (
                <Fragment key={section}>
                    {section === EHomeSection.ContinueWatching && <ContinueWatching />}
                    {section === EHomeSection.NextUp && <NextUp />}
                    {section === EHomeSection.LatestMedia && <LatestMedia />}
                </Fragment>
            )));
        };

        load();
    }, []);

    return (
        <View style={[{ marginTop: useSafeAreaInsets().top }, styles.container]}>
            {/* <Button onPress={onDelete}>Clear server info</Button> */}

            {/* TODO: Look at Jellyfin Vue, copy the top banner, maybe copy that to all sections */}

            <FlashList
                data={sectionComponents}
                renderItem={renderItem}
                estimatedItemSize={213}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 2,
        paddingTop: 16,
        paddingHorizontal: 16
    }
});

export default HomeScreen;
