import { GetSeasonEpisodesJson } from 'src/services/JellyfinAPI';
import CMedia from 'src/classes/jellyfin/media/CMedia';
import CEpisode from 'src/classes/jellyfin/media/CEpisode';
import type TSeason from 'src/types/jellyfin/media/TSeason';
import type TSeries from 'src/types/jellyfin/media/TSeries';
import type TEpisode from 'src/types/jellyfin/media/TEpisode';

class CSeason extends CMedia implements TSeason {
    //#region Fields

    series: TSeries;

    number: number;

    episodes: TEpisode[];

    //#endregion

    //#region Properties

    // No properties to add or override.

    //#endregion

    //#region Constructors

    constructor(series: TSeries, json: any) {
        super(json);

        this.series = series;

        this.number = json.IndexNumber;

        this.episodes = [] as CEpisode[];
    }

    //#endregion

    //#region Helpers

    public async getEpisodes(): Promise<boolean> {
        try {
            const response = await GetSeasonEpisodesJson(this.series, this);

            if (response.status) {
                this.episodes = response.json!.Items.map((item: any) => new CEpisode(this, item));
            }

            return response.status;
        } catch (error) {
            console.log(`${this.getEpisodes.name} exception: ${error}`);
        }

        return false;
    }

    //#endregion
};

export default CSeason;
