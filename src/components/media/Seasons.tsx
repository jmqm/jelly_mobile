import { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import OpacityAnimation from 'src/components/animations/OpacityAnimation';
import SectionFlatList from 'src/screens/home/SectionFlatList';
import CSeries from 'src/types/JellyfinAPI/media/CSeries';

type TProps = {
    series: CSeries;
    seasonOnPress?: ComponentProps<typeof SectionFlatList>['onPress'];
};

const SeasonsComponent = (props: TProps) => {
    const { series, seasonOnPress } = props;

    if (series.seasons.length > 0) {
        return (
            <OpacityAnimation duration={100}>
                <Divider style={[styles.marginHorizontal, styles.marginBottom]} />

                {/* TODO: Reduce opacity on watched seasons */}
                <SectionFlatList imageType='Poster' data={series.seasons} onPress={seasonOnPress} />
            </OpacityAnimation>
        );
    }
};

const styles = StyleSheet.create({
    noSeasons: {
        fontStyle: 'italic'
    },
    marginHorizontal: {
        marginHorizontal: 16
    },
    marginBottom: {
        marginBottom: 20
    }
});

export default SeasonsComponent;
