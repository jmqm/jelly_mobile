import EMediaType from 'src/enums/EMediaType';

type TMedia = {
    Type: EMediaType;

    // Universal
    Name: string;
    Id: string;
    Year: number;
    PlayedPercentage: number;

    // Episode
    Series: string;
    SeriesId: number;

    Season: number;
    SeasonId: number;

    Episode: number;
};

export const ConvertToTMedia = (json?: any): TMedia[] => {
    const success = json !== undefined && json !== null;

    if (success === false) {
        return [];
    }

    return json.Items.map((item: any) => {
        return {
            Type: item.Type ?? 'Type Unknown',

            Name: item.Name ?? 'Name Unknown',
            Id: item.Id ?? 'Id Unknown',
            Year: item.ProductionYear ?? 'ProductionYear Unknown',
            PlayedPercentage: item.UserData.PlayedPercentage ?? 'PlayedPercentage Unknown',

            // Episode
            Series: item.SeriesName ?? 'SeriesName Unknown',
            SeriesId: item.SeriesId ?? 'SeriesId Unknown',

            Season: item.ParentIndexNumber ?? 'ParentIndexNumber Unknown',
            SeasonId: item.SeasonId ?? 'SeasonId Unknown',

            Episode: item.IndexNumber ?? 'IndexNumber Unknown'
        } as TMedia;
    });
};

export default TMedia;
