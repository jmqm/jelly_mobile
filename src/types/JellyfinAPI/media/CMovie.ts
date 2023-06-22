import CMedia from 'src/types/JellyfinAPI/media/CMedia';

class CMovie extends CMedia {
    //#region Fields

    // No additional fields required.

    //#endregion

    //#region Properties

    public override get title(): string { return this.name.toString(); }
    public override get subtitle(): string { return this.year.toString(); }

    //#endregion

    //#region Constructors

    constructor(json: any) {
        super(json);
    }

    //#endregion
};

export default CMovie;
