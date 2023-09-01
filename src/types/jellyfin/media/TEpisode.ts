import type TMedia from 'src/types/jellyfin/media/TMedia';
import type TSeason from 'src/types/jellyfin/media/TSeason';

type TEpisode = TMedia & {
    // Fields
    season: TSeason;
    number: number;

    // Functions
    formattedString: (season: boolean, episode: boolean, name: boolean, separator?: string) => string;
};

export default TEpisode;
