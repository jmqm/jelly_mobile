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

    return json.map((item: any) => {
        return {
            Name: item.Name,
            Id: item.Id,
            Type: item.CollectionType ?? ELibraryType.Unknown
        } as TLibrary;
    });
};

export default TLibrary;
