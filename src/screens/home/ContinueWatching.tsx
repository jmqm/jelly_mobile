import { useEffect, useState } from 'react';
import OpacityAnimationComponent from 'src/components/animations/OpacityAnimation';
import useServerInfo from 'src/providers/server/useServerInfo';
import SectionContainer from 'src/screens/home/SectionContainer';
import SectionFlatList from 'src/screens/home/SectionFlatList';
import { GetContinueWatching } from 'src/services/JellyfinAPI';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';

const ContinueWatchingComponent = () => {
    const { serverInfo } = useServerInfo();

    const [continueWatching, setContinueWatching] = useState<CMedia[]>([]);

    useEffect(() => {
        const load = async () => {
            setContinueWatching(await GetContinueWatching(serverInfo));
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
