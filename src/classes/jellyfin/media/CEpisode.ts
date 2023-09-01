import CMedia from 'src/classes/jellyfin/media/CMedia';
import type TEpisode from 'src/types/jellyfin/media/TEpisode';
import type TSeason from 'src/types/jellyfin/media/TSeason';

class CEpisode extends CMedia implements TEpisode {
    //#region Fields

    season: TSeason;
    number: number;

    //#endregion

    //#region Properties

    public override get title(): string { return this.season.series.name.toString(); }
    public override get subtitle(): string { return this.formattedString(true, true, true); }

    //#endregion

    constructor(season: TSeason, json: any) {
        super(json);

        this.season = season;
        this.number = json.IndexNumber;
    }

    //#region Helper functions

    public formattedString(season: boolean = true, episode: boolean = true, name: boolean = true, separator: string = ' - '): string {
        let formattedString = name ? this.name : '';

        if (episode && isFinite(this.number)) {
            formattedString = `E${this.number}${name ? separator : ''}${formattedString}`;
        }

        if (season && isFinite(this.season.number)) {
            formattedString = `S${this.season.number}:${formattedString}`;
        }

        return formattedString;
    }

    //#endregion
};

export default CEpisode;
