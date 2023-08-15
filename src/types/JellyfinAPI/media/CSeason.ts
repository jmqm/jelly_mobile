import { GetSeasonEpisodesJson } from 'src/services/JellyfinAPI';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';
import CEpisode from 'src/types/JellyfinAPI/media/CEpisode';
import CSeries from 'src/types/JellyfinAPI/media/CSeries';

class CSeason extends CMedia {
    //#region Fields

    number: number;

    episodes: CEpisode[];

    //#endregion

    //#region Properties

    // No properties to add or override.

    //#endregion

    //#region Constructors

    constructor(json: any) {
        super(json);

        this.number = json.IndexNumber;

        this.episodes = [] as CEpisode[];
    }

    //#endregion

    //#region Helpers

    public async getEpisodes(series: CSeries): Promise<boolean> {
        try {
            const response = await GetSeasonEpisodesJson(series, this);

            if (response.status) {
                this.episodes = response.json!.Items.map((item: any) => new CEpisode(item));
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
