import { ComponentProps } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MediaCard from 'src/components/MediaCard';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';

type TProps = {
    data: CMedia[];
    imageType: ComponentProps<typeof MediaCard>['type'];
    onPress?: (item: CMedia) => void;
};

const SectionFlatListComponent = (props: TProps) => {
    const { data, imageType, onPress } = props;

    const renderItem = ({ item }: { item: CMedia }) => (
        <MediaCard media={item} type={imageType} onPress={onPress ? () => onPress(item) : undefined} />
    );

    const ItemSeparatorComponent = () => (
        <View style={styles.separator} />
    );

    return (
        <FlatList
            data={data}
            style={styles.flatList}
            renderItem={renderItem}

            horizontal={true}
            bounces={false}

            ListHeaderComponent={ItemSeparatorComponent}
            ListFooterComponent={ItemSeparatorComponent}
            ItemSeparatorComponent={ItemSeparatorComponent}
        />
    );
};

const styles = StyleSheet.create({
    flatList: {
        paddingBottom: 8
    },
    separator: {
        marginLeft: 16
    }
});

export default SectionFlatListComponent;
