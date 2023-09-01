import type TMedia from 'src/types/jellyfin/media/TMedia';
import type TMovie from 'src/types/jellyfin/media/TMovie';
import type TSeries from 'src/types/jellyfin/media/TSeries';
import type TSeason from 'src/types/jellyfin/media/TSeason';
import type TEpisode from 'src/types/jellyfin/media/TEpisode';

type TMediaNavigation = {
    Movie: { movie: TMovie };

    Series: { series: TSeries };
    Season: { season: TSeason };
    Episode: { episode: TEpisode };

    VideoPlayer: { media: TMedia };
};

export default TMediaNavigation;
