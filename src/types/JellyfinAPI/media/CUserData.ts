class CUserData {
    favourite?: boolean;
    watched?: boolean;
    watchedPercentage?: number;
    playbackPositionTicks?: number;

    constructor(json: any) {
        this.favourite = json.UserData.IsFavorite;
        this.watched = json.UserData.Played;
        this.watchedPercentage = json.UserData.PlayedPercentage;
        this.playbackPositionTicks = json.UserData.PlaybackPositionTicks;
    }
};

export default CUserData;
