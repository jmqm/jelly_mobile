import CMedia from 'src/classes/jellyfin/media/CMedia';
import type TSeries from 'src/types/jellyfin/media/TSeries';
import type TSeason from 'src/types/jellyfin/media/TSeason';
import CSeason from 'src/classes/jellyfin/media/CSeason';
import ESeriesStatus from 'src/enums/ESeriesStatus';
import { GetSeriesSeasonsJson } from 'src/services/JellyfinAPI';

class CSeries extends CMedia implements TSeries {
    //#region Fields

    status: ESeriesStatus;
    seasons: TSeason[];

    //#endregion

    //#region Properties

    public override get title(): string { return this.name.toString(); }
    public override get subtitle(): string { return `${this.year}${this.status === ESeriesStatus.Continuing ? ' - Continuing' : ''}`; }

    //#endregion

    //#region Constructors

    constructor(json: any) {
        super(json);

        this.status = json.Status;
        this.seasons = [] as TSeason[];
    }

    //#endregion

    //#region Helpers

    public async getSeasons(): Promise<boolean> {
        try {
            const response = await GetSeriesSeasonsJson(this.id);

            if (response.status) {
                this.seasons = response.json!.Items.map((item: any) => new CSeason(this, item));
            }

            return response.status;
        } catch (error) {
            console.log(`${this.getSeasons.name} exception: ${error}`);
        }

        return false;
    }

    //#endregion
};

export default CSeries;
