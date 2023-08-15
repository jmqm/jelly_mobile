import { useState } from 'react';
import { ScrollView } from 'react-native';
import type TMediaNavigation from 'src/types/navigation/TMediaNavigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import BackButton from 'src/components/media/BackButton';
import Background from 'src/components/styled/Background';
import FABPlayButton from 'src/components/media/FABPlayButton';
import HeaderAndTagline from 'src/components/media/HeaderAndTagline';
import Description from 'src/components/media/Description';
import StatusButtons from 'src/components/media/StatusButtons';

type TProps = {

} & NativeStackScreenProps<TMediaNavigation, 'Episode'>;

const EpisodeScreen = (props: TProps) => {
    const { route } = props;
    const { episode } = route.params!;

    const [fabHeight, setFabHeight] = useState<number>();


    return (
        <>
            <Background />
            <BackButton />

            <ScrollView contentContainerStyle={{ paddingBottom: fabHeight ? fabHeight * 1.5 : 20 }} showsVerticalScrollIndicator={false}>
                <HeaderAndTagline media={episode} imageType='Primary' />
                <Description media={episode} />
                <StatusButtons media={episode} />
            </ScrollView>

            <FABPlayButton refHeight={setFabHeight} media={episode} />
        </>
    );
};

export default EpisodeScreen;
