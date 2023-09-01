import CMedia from 'src/classes/jellyfin/media/CMedia';
import type TMovie from 'src/types/jellyfin/media/TMovie';

class CMovie extends CMedia implements TMovie {
    //#region Fields

    tagline: string;

    //#endregion

    //#region Properties

    public override get title(): string { return this.name.toString(); }
    public override get subtitle(): string { return this.year.toString(); }

    //#endregion

    //#region Constructors

    constructor(json: any) {
        super(json);

        this.tagline = json.Taglines ? json.Taglines[0] : undefined;
    }

    //#endregion
};

export default CMovie;
