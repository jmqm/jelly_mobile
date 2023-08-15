import ESeriesStatus from 'src/enums/ESeriesStatus';
import { GetSeriesSeasonsJson } from 'src/services/JellyfinAPI';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';
import CSeason from 'src/types/JellyfinAPI/media/CSeason';

class CSeries extends CMedia {
    //#region Fields

    status: ESeriesStatus;
    seasons: CSeason[];

    //#endregion

    //#region Properties

    public override get title(): string { return this.name.toString(); }
    public override get subtitle(): string { return `${this.year}${this.status === ESeriesStatus.Continuing ? ' - Continuing' : ''}`; }

    //#endregion

    //#region Constructors

    constructor(json: any) {
        super(json);

        this.status = json.Status;
        this.seasons = [] as CSeason[];
    }

    //#endregion

    //#region Helpers

    public async getSeasons(): Promise<boolean> {
        try {
            const response = await GetSeriesSeasonsJson(this.id);

            if (response.status) {
                this.seasons = response.json!.Items.map((item: any) => new CSeason(item));
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
