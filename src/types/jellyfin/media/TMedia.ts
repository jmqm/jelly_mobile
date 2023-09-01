import EMediaType from 'src/enums/EMediaType';
import type TUserData from 'src/types/jellyfin/media/TUserData';

type TMedia = {
    // Fields
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

    // Properties
    title: string;
    subtitle: string;
};

export default TMedia;
