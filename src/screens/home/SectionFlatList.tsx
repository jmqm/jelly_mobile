import { ComponentProps } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MediaCard from 'src/components/MediaCard';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';

type TProps = {
    data: CMedia[];
    imageType: ComponentProps<typeof MediaCard>['type']
}

const SectionFlatListComponent = (props: TProps) => {
    const { data, imageType } = props;

    const renderItem = ({ item }: { item: CMedia }) => (
        <MediaCard media={item} type={imageType} />
    );

    const ItemSeparatorComponent = () => (
        <View style={styles.separator} />
    );

    return (
        <FlatList
            horizontal={true}
            bounces={false}
            data={data}
            style={styles.flatList}
            renderItem={renderItem}
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
