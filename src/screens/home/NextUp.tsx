import { useEffect, useState } from 'react';
import OpacityAnimationComponent from 'src/components/animations/OpacityAnimation';
import SectionContainer from 'src/screens/home/SectionContainer';
import SectionFlatList from 'src/screens/home/SectionFlatList';
import { GetNextUp } from 'src/services/JellyfinAPI';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';

const NextUpComponent = () => {
    const [nextUp, setNextUp] = useState<CMedia[]>([]);

    useEffect(() => {
        const load = async () => {
            let cutOffDate = new Date();
            cutOffDate = new Date(cutOffDate.setDate(cutOffDate.getDate() - 90));

            setNextUp(await GetNextUp(cutOffDate));
        };

        load();
    }, []);

    return (
        <>
            {nextUp.length > 0 && (
                <OpacityAnimationComponent>
                    <SectionContainer title='Next Up'>
                        <SectionFlatList data={nextUp} imageType='Thumbnail' />
                    </SectionContainer>
                </OpacityAnimationComponent>
            )}
        </>
    );
};

export default NextUpComponent;
