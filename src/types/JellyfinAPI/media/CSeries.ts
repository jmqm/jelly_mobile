import ESeriesStatus from 'src/enums/ESeriesStatus';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';

class CSeries extends CMedia {
    //#region Fields

    status: ESeriesStatus;

    //#endregion

    //#region Properties

    public override get title(): string { return this.name.toString(); }
    public override get subtitle(): string { return `${this.year}${this.status === ESeriesStatus.Continuing ? ' - Continuing' : ''}`; }

    //#endregion

    //#region Constructors

    constructor(json: any) {
        super(json);

        this.status = json.Status;
    }

    //#endregion
};

export default CSeries;
