import { View, StyleSheet } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';

type TProps = {
    media: CMedia;
};

const MediaInformationComponent = (props: TProps) => {
    const { media } = props;

    return (
        <View style={[styles.chips, styles.marginHorizontal, styles.marginBottom]}>
            {media.year && (
                <Chip mode='flat' icon='calendar'>{media.subtitle}</Chip>
            )}
            {media.runtimeInMinutes && (
                <Chip mode='flat' icon='clock-time-three-outline'>
                    {/* Hours */}
                    {Math.floor(media.runtimeInMinutes / 60) > 0 ? `${Math.floor(media.runtimeInMinutes / 60)}h` : ''}

                    {/* Minutes */}
                    {Math.floor(media.runtimeInMinutes / 60) > 0 ? ' ' : ''}
                    {Math.floor(media.runtimeInMinutes % 60) > 0 ? `${Math.floor(media.runtimeInMinutes % 60)}m` : ''}
                </Chip>
            )}
            {media.parentalRating && (<Chip mode='flat' icon='account-child-outline'>{media.parentalRating}</Chip>)}
            {media.communityRating && (<Chip mode='flat' icon='account-group-outline'>{media.communityRating.toFixed(2).replace(/\.?0+$/, '')}</Chip>)}
            {media.criticsRating && (<Chip mode='flat' icon={() => (<Text>🍅</Text>)}>{media.criticsRating}</Chip>)}
        </View>
    );
};

const styles = StyleSheet.create({
    chips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8
    },
    marginHorizontal: {
        marginHorizontal: 16
    },
    marginBottom: {
        marginBottom: 20
    }
});

export default MediaInformationComponent;
