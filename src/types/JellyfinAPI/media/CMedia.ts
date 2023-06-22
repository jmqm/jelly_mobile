import EMediaType from 'src/enums/EMediaType';

class CMedia {
    //#region Fields

    type: EMediaType;

    name: string;
    description: string;
    id: string;
    year: number;
    playedPercentage: number;

    //#endregion

    //#region Properties

    public get title(): string { return this.name; };
    public get subtitle(): string { return this.year.toString(); };

    //#endregion

    //#region Constructors

    constructor(json: any) {
        this.type = CMedia.getType(json);

        this.name = json.Name;
        this.description = json.Overview;
        this.id = json.Id;
        this.year = json.ProductionYear;
        this.playedPercentage = json.UserData.PlayedPercentage ?? 0;
    }

    //#endregion

    //#region Helpers

    public static createInstance(json: any): CMedia {
        const type = CMedia.getType(json);

        const CMovie = require('./CMovie').default;
        const CSeries = require('./CSeries').default;
        const CEpisode = require('./CEpisode').default;

        if (type === EMediaType.Movie) return new CMovie(json);
        if (type === EMediaType.Series) return new CSeries(json);
        if (type === EMediaType.Episode) return new CEpisode(json);

        return new CMedia(json);
    }

    private static getType(json: any) {
        return json.Type;
    }

    //#endregion
};

export default CMedia;
