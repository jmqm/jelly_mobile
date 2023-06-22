import CMedia from 'src/types/JellyfinAPI/media/CMedia';

class CEpisode extends CMedia {
    //#region Fields

    seriesName: string;
    seriesId: string;

    season: number;
    number: number; // Episode number

    //#endregion

    //#region Properties

    public override get title(): string { return this.seriesName.toString(); }
    public override get subtitle(): string { return `S${this.season}:E${this.number} - ${this.name}`; }

    //#endregion

    //#region Constructors

    constructor(json: any) {
        super(json);

        this.seriesName = json.SeriesName;
        this.seriesId = json.SeriesId;

        this.season = json.ParentIndexNumber;
        this.number = json.IndexNumber;
    }

    //#endregion
};

export default CEpisode;
