import EMediaType from 'src/enums/EMediaType';
import CUserData from 'src/classes/jellyfin/media/CUserData';
import { ticksToMinutes } from 'src/utilities/time';
import type TMedia from 'src/types/jellyfin/media/TMedia';
import type TUserData from 'src/types/jellyfin/media/TUserData';

class CMedia implements TMedia {
    //#region Fields
    name: string;
    originalName: string;
    description: string;
    id: string;
    year: number;
    runtimeInMinutes: number | null;

    parentalRating: string;
    communityRating: number;
    criticsRating: number;

    userData: TUserData;

    //#endregion

    //#region Properties

    public get title(): string { return this.name; };
    public get subtitle(): string { return this.year?.toString(); };

    //#endregion

    //#region Constructors

    constructor(json: any) {
        this.name = json.Name;
        this.originalName = json.OriginalTitle;
        this.description = json.Overview;
        this.id = json.Id;
        this.year = json.ProductionYear;

        this.runtimeInMinutes = json.RunTimeTicks && json.RunTimeTicks > 0
            ? Math.round(ticksToMinutes(json.RunTimeTicks))
            : null;

        this.parentalRating = json.OfficialRating;
        this.communityRating = json.CommunityRating;
        this.criticsRating = json.CriticRating;

        this.userData = new CUserData(json);
    }

    //#endregion

    //#region Helpers

    public static createInstance(json: any): TMedia {
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
