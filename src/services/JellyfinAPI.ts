import { ConvertToTLogIn } from '../types/JellyfinAPI/TLogIn';
import TGetPublicInfo, { ConvertToTGetPublicInfo } from 'src/types/JellyfinAPI/TGetPublicInfo';
import TLogIn from 'src/types/JellyfinAPI/TLogIn';
import TServerInfo from 'src/types/server/TServerInfo';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import EHomeSection from 'src/enums/EHomeSection';
import TLibrary, { ConvertToTLibrary } from 'src/types/JellyfinAPI/TLibrary';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';
import ELibraryType from 'src/enums/ELibraryType';

// https://api.jellyfin.org/
// https://demo.jellyfin.org/stable/api-docs/swagger/index.html (better)

//#region System

export const GetPublicInfo = async (url: string): Promise<TGetPublicInfo> => {
    try {
        const response = await fetch(`${url}/System/Info/Public`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await response.text();
        const dataJson = JSON.parse(data);

        return ConvertToTGetPublicInfo(dataJson);
    } catch {
        // Exception
    }

    return ConvertToTGetPublicInfo();
};

//#endregion

//#region Users

export const LogIn = async (serverInfo: TServerInfo, username: string, password: string): Promise<TLogIn> => {
    try {
        const response = await fetch(`${serverInfo.address}/Users/AuthenticateByName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Without this, will get a 'Network request failed' error.
                'Accept': 'application/json',
                ...GenerateAuthorizationHeader(serverInfo)
            },
            body: JSON.stringify({
                'Username': username,
                'Pw': password
            })
        });

        const data = await response.text();
        const dataJson = JSON.parse(data);

        return ConvertToTLogIn(dataJson);
    } catch {
        // Exception
    }

    return ConvertToTLogIn();
};

// TODO: Cache this and HomeLibraryOrder using a provider.
export const GetHomeSectionOrder = async (serverInfo: TServerInfo): Promise<EHomeSection[]> => {
    try {
        const response = await fetch(`${serverInfo.address}/DisplayPreferences/usersettings?userId=${serverInfo.userId}&client=emby`, {
            headers: {
                ...GenerateAuthorizationHeader(serverInfo)
            }
        });

        const data = await response.text();
        const dataJson = JSON.parse(data);

        const preferences = dataJson.CustomPrefs;

        const homeSectionValues = Object.values(EHomeSection);

        const displayOrder = Object.entries(preferences as { [key: string]: string })
            .sort()
            .filter(([k]) => k.startsWith('homesection'))
            .filter(([, v]) => homeSectionValues.find(homeSection => homeSection.toLowerCase() === v.toLowerCase()))
            .map(([, v]) => v as EHomeSection);

        return displayOrder;
    } catch (error) {
        console.log(`${GetHomeSectionOrder.name} exception: ${error}`);
    }

    return [];
};

export const GetUserLibraries = async (serverInfo: TServerInfo): Promise<TLibrary[]> => {
    try {
        const excludedTypes = [ELibraryType.MusicPlaylist, ELibraryType.LiveTv, ELibraryType.Collection, ELibraryType.Channels, ELibraryType.Music];

        const response = await fetch(`${serverInfo.address}/Users/${serverInfo.userId}/Views`, {
            headers: {
                ...GenerateAuthorizationHeader(serverInfo)
            }
        });

        const data = await response.text();
        const dataJson = JSON.parse(data);

        const unfilteredUserLibraries = ConvertToTLibrary(dataJson.Items);

        return unfilteredUserLibraries.filter((library) => excludedTypes.includes(library.Type) === false);
    } catch (error) {
        console.log(`${GetUserLibraries.name} exception: ${error}`);
    }

    return ConvertToTLibrary();
};

export const GetUserLibraryLatest = async (serverInfo: TServerInfo, libraryId: string): Promise<CMedia[]> => {
    try {
        const response = await fetch(`${serverInfo.address}/Users/${serverInfo.userId}/Items/Latest` +
                                     `?Limit=16&ParentId=${libraryId}`, {
            headers: {
                ...GenerateAuthorizationHeader(serverInfo)
            }
        });

        const data = await response.text();
        const dataJson = JSON.parse(data);

        return dataJson.map((item: any) => CMedia.createInstance(item));
    } catch (error) {
        console.log(`${GetUserLibraryLatest.name} exception: ${error}`);
    }

    return [];
};

export const GetUserLibraryItems = async (serverInfo: TServerInfo, libraryId: string): Promise<CMedia[]> => {
    try {
        const response = await fetch(`${serverInfo.address}/Users/${serverInfo.userId}/Items` +
                                     `?ParentId=${libraryId}`, {
            headers: {
                ...GenerateAuthorizationHeader(serverInfo)
            }
        });

        const data = await response.text();
        const dataJson = JSON.parse(data);

        return dataJson.Items.map((item: any) => CMedia.createInstance(item));
    } catch (error) {
        console.log(`${GetUserLibraryItems.name} exception: ${error}`);
    }

    return [];
};

//#endregion

//#region Home sections

export const GetContinueWatching = async (serverInfo: TServerInfo): Promise<CMedia[]> => {
    try {
        const response = await fetch(`${serverInfo.address}/Users/${serverInfo.userId}/Items/Resume` +
                                     '?Limit=12&Recursive=true&includeItemTypes=Episode,Movie', {
            headers: {
                ...GenerateAuthorizationHeader(serverInfo)
            }
        });

        const data = await response.text();
        const dataJson = JSON.parse(data);

        return dataJson.Items.map((item: any) => CMedia.createInstance(item));
    } catch (error) {
        console.log(`${GetContinueWatching.name} exception: ${error}`);
    }

    return [];
};

export const GetNextUp = async (serverInfo: TServerInfo, cutOffDateTime: Date): Promise<CMedia[]> => {
    try {
        const response = await fetch(`${serverInfo.address}/Shows/NextUp` +
                                     '?UserId=b310988995c24ba3bc58fb3b2f4510b2' +
                                     `&nextUpDateCutoff=${cutOffDateTime.toISOString()}`, {
            headers: {
                ...GenerateAuthorizationHeader(serverInfo)
            }
        });

        const data = await response.text();
        const dataJson = JSON.parse(data);

        return dataJson.Items.map((item: any) => CMedia.createInstance(item));
    } catch (error) {
        console.log(`${GetNextUp.name} exception: ${error}`);
    }

    return [];
};

//#endregion

//#region Miscellaneos

const GenerateAuthorizationHeader = (serverInfo: TServerInfo): object => {
    const value = 'MediaBrowser' +
        ` Client="${Constants.manifest?.name ?? 'Mobile'}"` +
        `, Device="${Device.deviceName ?? 'Unknown'}"` +
        `, DeviceId="${serverInfo.deviceId}"` +
        `, Version="${Constants.manifest?.version ?? 'Unknown'}"` +
        (serverInfo.userAccessToken ? `, Token="${serverInfo.userAccessToken}"` : '')
    ;

    return {
        'X-Emby-Authorization': value
    };
};

//#endregion
