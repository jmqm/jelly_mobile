import { useState, useEffect } from 'react';
import { RefreshControl, ScrollView, ToastAndroid } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type TMediaNavigation from 'src/types/navigation/TMediaNavigation';
import Background from 'src/components/styled/Background';
import BackButton from 'src/components/media/BackButton';
import HeaderAndTagline from 'src/components/media/HeaderAndTagline';
import Description from 'src/components/media/Description';
import MediaInformation from 'src/components/media/MediaInformation';
import Seasons from 'src/components/media/Seasons';
import StatusButtons from 'src/components/media/StatusButtons';
import type TSeason from 'src/types/jellyfin/media/TSeason';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type TMedia from 'src/types/jellyfin/media/TMedia';

type TProps = {

} & NativeStackScreenProps<TMediaNavigation, 'Series'>;

const SeriesScreen = (props: TProps) => {
    const { route, navigation } = props;
    const series = route.params!.series;

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [_, forceReload] = useState<number>(0);


    const paddingTop = useSafeAreaInsets().top;


    const handleOnRefresh = () => {
        setRefreshing(true);
    };

    const handleOnPress = (season: TMedia) => {
        navigation.navigate('Season', { season: season as TSeason });
    };


    useEffect(() => {
        const load = async () => {
            const response = await series.getSeasons();

            if (response === false) {
                ToastAndroid.show('Unable to get series seasons', ToastAndroid.SHORT);
                return;
            }

            setRefreshing(false);
            forceReload((prev) => ++prev);
        };

        if (series.seasons.length <= 0 || refreshing) {
            load();
        }
    }, [refreshing]);


    return (
        <>
            <Background />
            <BackButton />

            <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl onRefresh={handleOnRefresh} refreshing={refreshing} progressViewOffset={paddingTop} />
                }
            >
                <HeaderAndTagline media={series} imageType='Backdrop' />
                <Description media={series} />
                <MediaInformation media={series} />
                <Seasons series={series} seasonOnPress={handleOnPress} />
                <StatusButtons media={series} />
            </ScrollView>
        </>
    );
};

export default SeriesScreen;
