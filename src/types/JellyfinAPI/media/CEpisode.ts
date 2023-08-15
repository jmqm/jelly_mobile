import CMedia from 'src/types/JellyfinAPI/media/CMedia';

class CEpisode extends CMedia {
    //#region Fields

    seriesName: string;
    seriesId: string;

    seasonNumber: number;
    episodeNumber: number;

    //#endregion

    //#region Properties

    public override get title(): string { return this.seriesName.toString(); }
    public override get subtitle(): string { return this.formattedString(true, true, true); }

    //#endregion

    //#region Constructors

    constructor(json: any) {
        super(json);

        this.seriesName = json.SeriesName;
        this.seriesId = json.SeriesId;

        this.seasonNumber = json.ParentIndexNumber;
        this.episodeNumber = json.IndexNumber;
    }

    //#endregion

    //#region Helper functions

    public formattedString(season: boolean = true, episode: boolean = true, name: boolean = true, separator: string = ' - '): string {
        let formattedString = name ? this.name : '';

        if (episode && isFinite(this.episodeNumber)) {
            formattedString = `E${this.episodeNumber}${name ? separator : ''}${formattedString}`;
        }

        if (season && isFinite(this.seasonNumber)) {
            formattedString = `S${this.seasonNumber}:${formattedString}`;
        }

        return formattedString;
    }

    //#endregion
};

export default CEpisode;
