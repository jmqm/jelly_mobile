import { useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Divider } from 'react-native-paper';
import StyledIconButton from 'src/components/styled/StyledIconButton';
import { SetMediaFavourite, SetMediaWatched } from 'src/services/JellyfinAPI';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';

type TProps = {
    media: CMedia;
};

const StatusButtonsComponent = (props: TProps) => {
    const { media } = props;

    const [watched, setWatched] = useState<boolean | null>(media.userData.watched ?? false);
    const [favourite, setFavourite] = useState<boolean | null>(media.userData.favourite ?? false);
    const [downloaded, _] = useState<boolean | null>(false);

    const handleOnWatchedPress = async () => {
        if (watched !== null) {
            const statusToSet = !watched;

            setWatched(null);
            const response = await SetMediaWatched(media.id, statusToSet);

            setWatched(response === statusToSet);
            ToastAndroid.show(`${response ? 'Successfully' : 'Failed to'} set media watched status`, ToastAndroid.SHORT);
        }
    };

    const handleOnFavouritePress = async () => {
        if (favourite !== null) {
            const statusToSet = !favourite;

            setFavourite(null);
            const response = await SetMediaFavourite(media.id, statusToSet);

            setFavourite(response === statusToSet);
            ToastAndroid.show(`${response ? 'Successfully' : 'Failed to'} set media favourite status`, ToastAndroid.SHORT);
        }
    };

    const handleOnPress = () => {
        ToastAndroid.show('This feature is currently unsupported.', ToastAndroid.SHORT);
    };

    return (
        <>
            <Divider style={[styles.marginHorizontal, styles.marginBottom]} />
            <View style={[styles.buttons, styles.marginHorizontal]}>
                <StyledIconButton onPress={handleOnWatchedPress} selected={watched ?? false} icon={watched === null ? 'timer-sand' : watched ? 'check-bold' : 'check-outline'} mode='contained-tonal' />
                <StyledIconButton onPress={handleOnFavouritePress} selected={favourite ?? false} icon={favourite === null ? 'timer-sand' : favourite ? 'heart' : 'heart-outline'} mode='contained-tonal' />
                <StyledIconButton onPress={handleOnPress} selected={downloaded ?? false} icon={downloaded === null ? 'timer-sand' : downloaded ? 'download' : 'download-outline'} mode='contained-tonal' />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        flexWrap: 'wrap'
    },
    marginHorizontal: {
        marginHorizontal: 16
    },
    marginBottom: {
        marginBottom: 20
    }
});

export default StatusButtonsComponent;
