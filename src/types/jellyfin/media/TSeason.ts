import type TEpisode from 'src/types/jellyfin/media/TEpisode';
import type TMedia from 'src/types/jellyfin/media/TMedia';
import type TSeries from 'src/types/jellyfin/media/TSeries';

type TSeason = TMedia & {
    // Fields
    series: TSeries;
    number: number;
    episodes: TEpisode[];

    // Functions
    getEpisodes: () => Promise<boolean>;
};

export default TSeason;
