import { StyleSheet, View } from 'react-native';
import { Fragment, ReactElement, useEffect, useState } from 'react';
import { GetHomeSectionOrder } from 'src/services/JellyfinAPI';
import EHomeSection from 'src/enums/EHomeSection';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ContinueWatching from 'src/screens/home/ContinueWatching';
import NextUp from 'src/screens/home/NextUp';
import LatestMedia from 'src/screens/home/LatestMedia';
import { FlashList } from '@shopify/flash-list';
import TopographyPattern from 'src/components/patterns/TopographyPattern';

const HomeScreen = () => {
    const [sectionComponents, setSectionComponents] = useState<ReactElement[] | null>(null);


    const ItemSeparatorComponent = () => (
        <View style={styles.separator} />
    );

    const renderItem = ({ item }: { item: ReactElement }) => (item);


    useEffect(() => {
        const load = async () => {
            const displayOrder = await GetHomeSectionOrder();

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
        <>
            <TopographyPattern opacity={0.05} />

            <View style={[{ paddingTop: useSafeAreaInsets().top }, styles.container]}>
                {/* <Button onPress={onDelete}>Clear server info</Button> */}

                {/* TODO: Look at Jellyfin Vue, copy the top banner, maybe copy that to all sections */}

                <FlashList
                    data={sectionComponents}
                    renderItem={renderItem}
                    estimatedItemSize={213}

                    showsVerticalScrollIndicator={false}
                    initialScrollIndex={0}

                    ListHeaderComponent={ItemSeparatorComponent}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 2
    },
    separator: {
        paddingBottom: 16
    }
});

export default HomeScreen;
