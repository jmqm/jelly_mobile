import type TLibrary from 'src/types/jellyfin/TLibrary';

type TUserViews = {
    success: false;
} | {
    success: true;

    libraries: TLibrary[];
};

export const ConvertToTUserViews = (json?: any): TUserViews => {
    const success = json !== undefined && json !== null;

    if (success === false) {
        return {
            success: false
        } as TUserViews;
    }

    return {
        success: true,

        libraries: json.Items.map((item: any) => {
            return {
                Name: item.Name,
                Id: item.Id
            } as TLibrary;
        })
    } as TUserViews;
};

export default TUserViews;
