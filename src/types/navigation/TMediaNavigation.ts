import CEpisode from 'src/types/JellyfinAPI/media/CEpisode';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';
import CMovie from 'src/types/JellyfinAPI/media/CMovie';
import CSeason from 'src/types/JellyfinAPI/media/CSeason';
import CSeries from 'src/types/JellyfinAPI/media/CSeries';

type TMediaNavigation = {
    Movie: { movie: CMovie };

    Series: { series: CSeries };
    Season: { series: CSeries, season: CSeason };
    Episode: { episode: CEpisode };

    VideoPlayer: { media: CMedia };
};

export default TMediaNavigation;
