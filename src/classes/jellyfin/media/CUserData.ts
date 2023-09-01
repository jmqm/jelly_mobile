import type TUserData from 'src/types/jellyfin/media/TUserData';

class CUserData implements TUserData {
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
