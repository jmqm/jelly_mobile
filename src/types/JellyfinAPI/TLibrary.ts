import ELibraryType from 'src/enums/ELibraryType';

type TLibrary = {
    Name: string;
    Id: string;
    Type: ELibraryType;
};

export const ConvertToTLibrary = (json?: any): TLibrary[] => {
    const success = json !== undefined && json !== null;

    if (success === false) {
        return [];
    }

    return json.Items.map((item: any) => {
        return {
            Name: item.Name ?? 'Name Unknown',
            Id: item.Id ?? 'Id Unknown',
            Type: item.CollectionType ?? 'Type Unknown'
        } as TLibrary;
    });
};

export default TLibrary;
