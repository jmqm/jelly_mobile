import { useEffect, useState } from 'react';
import OpacityAnimationComponent from 'src/components/animations/OpacityAnimation';
import SectionContainer from 'src/screens/home/SectionContainer';
import SectionFlatList from 'src/screens/home/SectionFlatList';
import { GetContinueWatching } from 'src/services/JellyfinAPI';
import type TMedia from 'src/types/jellyfin/media/TMedia';

const ContinueWatchingComponent = () => {
    const [continueWatching, setContinueWatching] = useState<TMedia[]>([]);

    useEffect(() => {
        const load = async () => {
            setContinueWatching(await GetContinueWatching());
        };

        load();
    }, []);

    return (
        <>
            {continueWatching.length > 0 && (
                <OpacityAnimationComponent>
                    <SectionContainer title='Continue Watching'>
                        <SectionFlatList data={continueWatching} imageType='Thumbnail' />
                    </SectionContainer>
                </OpacityAnimationComponent>
            )}
        </>
    );
};

export default ContinueWatchingComponent;
