import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type TMediaNavigation from 'src/types/navigation/TMediaNavigation';
import { useState } from 'react';
import Background from 'src/components/styled/Background';
import BackButton from 'src/components/media/BackButton';
import { ScrollView } from 'react-native';
import HeaderAndTagline from 'src/components/media/HeaderAndTagline';
import Description from 'src/components/media/Description';
import MediaInformation from 'src/components/media/MediaInformation';
import StatusButtons from 'src/components/media/StatusButtons';
import FABPlayButton from 'src/components/media/FABPlayButton';

type TProps = {

} & NativeStackScreenProps<TMediaNavigation, 'Movie'>;

const MovieScreen = (props: TProps) => {
    const { route } = props;
    const movie = route.params!.movie;

    const [fabHeight, setFabHeight] = useState<number>();


    return (
        <>
            <Background />
            <BackButton />

            <ScrollView contentContainerStyle={{ paddingBottom: fabHeight ? fabHeight * 1.5 : 20 }} showsVerticalScrollIndicator={false}>
                <HeaderAndTagline media={movie} imageType='Backdrop' />
                <Description media={movie} />
                <MediaInformation media={movie} />
                <StatusButtons media={movie} />
            </ScrollView>

            <FABPlayButton refHeight={setFabHeight} media={movie} />
        </>
    );
};

export default MovieScreen;
