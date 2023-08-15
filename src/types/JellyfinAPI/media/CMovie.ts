import CMedia from 'src/types/JellyfinAPI/media/CMedia';

class CMovie extends CMedia {
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
