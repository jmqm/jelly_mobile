import ESeriesStatus from 'src/enums/ESeriesStatus';
import type TMedia from 'src/types/jellyfin/media/TMedia';
import type TSeason from 'src/types/jellyfin/media/TSeason';

type TSeries = TMedia & {
    // Fields
    status: ESeriesStatus;
    seasons: TSeason[];

    // Functions
    getSeasons: () => Promise<boolean>;
};

export default TSeries;
