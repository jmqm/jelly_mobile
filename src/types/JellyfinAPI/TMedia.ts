import EMediaType from 'src/enums/EMediaType';
import ESeriesStatus from 'src/enums/ESeriesStatus';

type TMedia = {
    Type: EMediaType;

    // Universal
    Name: string;
    Id: string;
    Year: number;
    PlayedPercentage: number;

    // Series
    Series: string;
    SeriesId: number;
    SeriesStatus: ESeriesStatus;

    Season: number;
    SeasonId: number;

    SeriesEpisode: number;

    // Audio
    AudioArtists: string[];
};

export const ConvertToTMedia = (json?: any): TMedia[] => {
    const success = json !== undefined && json !== null;

    if (success === false) {
        return [];
    }

    const mapping =
        json.Items !== undefined ? json.Items :
        json !== undefined ? json :
        null;

    if (mapping === null) {
        return [];
    }

    return mapping.map((item: any) => {
        return {
            Type: item.Type ?? 'Type Unknown',

            Name: item.Name ?? 'Name Unknown',
            Id: item.Id ?? 'Id Unknown',
            Year: item.ProductionYear ?? 'ProductionYear Unknown',
            PlayedPercentage: item.UserData.PlayedPercentage ?? 'PlayedPercentage Unknown',

            // Series
            Series: item.SeriesName ?? 'SeriesName Unknown',
            SeriesId: item.SeriesId ?? 'SeriesId Unknown',
            SeriesStatus: item.Status ?? 'SeriesStatus Unknown',

            Season: item.ParentIndexNumber ?? 'ParentIndexNumber Unknown',
            SeasonId: item.SeasonId ?? 'SeasonId Unknown',

            SeriesEpisode: item.IndexNumber ?? 'IndexNumber Unknown',

            // Audio
            AudioArtists: item.Artists ? item.Artists.map((artist: string) => artist) : 'Artists Unknown'
        } as TMedia;
    });
};

export default TMedia;
