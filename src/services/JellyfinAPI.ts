import { ConvertToTLogIn } from '../types/jellyfin/TLogIn';
import type TGetPublicInfo from 'src/types/jellyfin/TGetPublicInfo';
import { ConvertToTGetPublicInfo } from 'src/types/jellyfin/TGetPublicInfo';
import type TLogIn from 'src/types/jellyfin/TLogIn';
import server$ from 'src/state/server/server$';
import user$ from 'src/state/user/user$';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import EHomeSection from 'src/enums/EHomeSection';
import type TLibrary from 'src/types/jellyfin/TLibrary';
import { ConvertToTLibrary } from 'src/types/jellyfin/TLibrary';
import type TMedia from 'src/types/jellyfin/media/TMedia';
import ELibraryType from 'src/enums/ELibraryType';
import type TStartPlayback from 'src/types/jellyfin/TStartPlayback';
import CMedia from 'src/classes/jellyfin/media/CMedia';
import type TSeries from 'src/types/jellyfin/media/TSeries';
import type TSeason from 'src/types/jellyfin/media/TSeason';
import TReportPlayback from 'src/types/jellyfin/TReportPlayback';

// https://api.jellyfin.org/
// https://demo.jellyfin.org/stable/api-docs/swagger/index.html (better)

const { server } = server$.get();
const { user } = user$.get();

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

export const LogIn = async (username: string, password: string): Promise<TLogIn> => {
    try {
        const response = await fetch(`${server.address}/Users/AuthenticateByName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Without this, will get a 'Network request failed' error.
                'Accept': 'application/json',
                ...GenerateAuthorizationHeader()
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
export const GetHomeSectionOrder = async (): Promise<EHomeSection[]> => {
    try {
        const response = await fetch(`${server.address}/DisplayPreferences/usersettings?userId=${user.id}&client=emby`, {
            headers: {
                ...GenerateAuthorizationHeader()
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

export const GetUserLibraries = async (): Promise<TLibrary[]> => {
    try {
        const excludedTypes = [ELibraryType.MusicPlaylist, ELibraryType.LiveTv, ELibraryType.Collection, ELibraryType.Channels, ELibraryType.Music];

        const response = await fetch(`${server.address}/Users/${user.id}/Views`, {
            headers: {
                ...GenerateAuthorizationHeader()
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

export const GetUserLibraryLatest = async (libraryId: string): Promise<TMedia[]> => {
    try {
        const response = await fetch(`${server.address}/Users/${user.id}/Items/Latest` +
                                     `?Limit=16&ParentId=${libraryId}`, {
            headers: {
                ...GenerateAuthorizationHeader()
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

export const GetUserLibraryItems = async (libraryId: string, searchTerm?: string): Promise<TMedia[]> => {
    try {
        const fields = ['OriginalTitle', 'Taglines', 'Overview',
            'ProductionYear', 'RunTimeTicks', 'OfficialRating',
            'CommunityRating', 'CriticRating', 'BasicSyncInfo'
        ];

        const response = await fetch(`${server.address}/Users/${user.id}/Items` +
                                     `?ParentId=${libraryId}` +
                                     `&Recursive=${searchTerm ? true : false}` +
                                     (searchTerm ? `&searchTerm=${searchTerm}` : '') +
                                     `&Fields=${fields.join(',')}`, {
            headers: {
                ...GenerateAuthorizationHeader()
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

export const GetMediaDetails = async (mediaId: string): Promise<TMedia | null> => {
    try {
        // TODO: Include AspectRatio field to remove constant of aspect ratio.
        const response = await fetch(`${server.address}/Users/${user.id}/Items/${mediaId}`, {
            headers: {
                ...GenerateAuthorizationHeader()
            }
        });

        const data = await response.text();
        const dataJson = JSON.parse(data);

        return CMedia.createInstance(dataJson);
    } catch (error) {
        console.log(`${GetMediaDetails.name} exception: ${error}`);
    }

    return null;
};

export const GetSeriesSeasonsJson = async (seriesId: string): Promise<{status: boolean, json?: any}> => {
    try {
        const fields = ['BasicSyncInfo'];

        const response = await fetch(`${server.address}/Shows/${seriesId}/Seasons` +
                                     `?userId=${user.id}` +
                                     `&Fields=${fields.join(',')}`, {
            headers: {
                ...GenerateAuthorizationHeader()
            }
        });

        const data = await response.text();
        const dataJson = JSON.parse(data);

        return { status: true, json: dataJson };
    } catch (error) {
        console.log(`${GetSeriesSeasonsJson.name} exception: ${error}`);
    }

    return { status: true };
};

export const GetSeasonEpisodesJson = async (series: TSeries, season: TSeason): Promise<{status: boolean, json?: any}> => {
    try {
        const fields = ['Overview', 'BasicSyncInfo'];

        const response = await fetch(`${server.address}/Shows/${series.id}/Episodes` +
                                     `?seasonId=${season.id}` +
                                     `&userId=${user.id}` +
                                     `&Fields=${fields.join(',')}`, {
            headers: {
                ...GenerateAuthorizationHeader()
            }
        });

        const data = await response.text();
        const dataJson = JSON.parse(data);

        return { status: true, json: dataJson };
    } catch (error) {
        console.log(`${GetSeasonEpisodesJson.name} exception: ${error}`);
    }

    return { status: true };
};

export const SetMediaWatched = async (mediaId: string, watched: boolean): Promise<boolean> => {
    try {
        const response = await fetch(`${server.address}/Users/${user.id}/PlayedItems/${mediaId}`, {
            method: watched ? 'POST' : 'DELETE',
            headers: {
                ...GenerateAuthorizationHeader()
            }
        });

        return response.ok;
    } catch (error) {
        console.log(`${SetMediaWatched.name} exception: ${error}`);
    }

    return false;
};

export const SetMediaFavourite = async (mediaId: string, favourite: boolean): Promise<boolean> => {
    try {
        const response = await fetch(`${server.address}/Users/${user.id}/FavoriteItems/${mediaId}`, {
            method: favourite ? 'POST' : 'DELETE',
            headers: {
                ...GenerateAuthorizationHeader()
            }
        });

        return response.ok;
    } catch (error) {
        console.log(`${SetMediaFavourite.name} exception: ${error}`);
    }

    return false;
};

//#endregion

//#region Playback

export const StartPlayback = async (mediaId: string, fallbackToH264: boolean = false): Promise<TStartPlayback> => {
    let errorMessage = undefined;

    try {
        // TODO: Support AV1 for getPlaybackUrlStream

        let playbackType: string | undefined = undefined;

        // Gets static/non-encoded/no-files-created stream
        const getPlaybackUrlStatic = () => {
            const options = [
                'static=true',
                `MediaSourceId=${mediaId}`,
                'subtitleMethod=Hls'
            ];

            playbackType = undefined;
            return `${server.address}/Videos/${mediaId}/stream?${options.join('&')}`;
        };

        // Gets remuxed/encoded stream
        const getPlaybackUrlStream = () => {
            const options = [
                `MediaSourceId=${mediaId}`,
                'startTimeTicks=0',
                'segmentLength=60',
                'minSegments=5',
                'segmentContainer=mp4',
                'videoCodec=h264',
                'subtitleMethod=Hls'
            ];

            playbackType = 'm3u8';
            return `${server.address}/Videos/${mediaId}/main.m3u8?${options.join('&')}`;
        };

        // Gets play session id for reporting playback progress
        const getPlaySessionId = async () => {
            const options = [
                `MediaSourceId=${mediaId}`,
                `UserId=${user.id}`
            ];

            const playbackInfoResponse = await fetch(`${server.address}/Items/${mediaId}/PlaybackInfo?${options.join('&')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Without this, will get a 'Unsupported Media Type' response.
                    'Accept': 'application/json',
                    ...GenerateAuthorizationHeader()
                }
            });

            const playbackInfoData = await playbackInfoResponse.text();
            const playbackInfoDataJson = JSON.parse(playbackInfoData);

            return playbackInfoDataJson.PlaySessionId;
        };

        const playbackUrl = fallbackToH264 ? getPlaybackUrlStream() : getPlaybackUrlStatic();
        const playSessionId = await getPlaySessionId();

        if (playbackUrl && playSessionId) {
            return {
                success: true,

                playSessionId: playSessionId,
                playbackUrl: playbackUrl,
                playbackType: playbackType
            };
        }
    } catch (error) {
        console.log(`${StartPlayback.name} exception: ${error}`);
        errorMessage = `${error}`;
    }

    return {
        success: false,
        errorMessage: errorMessage
    };
};

export const ReportPlayback = async (playbackReport: TReportPlayback): Promise<boolean> => {
    // TODO: Unfinished

    const { type, media, sessionId, positionTicks, paused } = playbackReport;

    try {
        const url = `${server.address}/Sessions/Playing` +
            type === 'Progress' ? '/Progress' :
            type === 'Stopped' ? '/Stopped' :
            '';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Without this, will get a 'Network request failed' error.
                ...GenerateAuthorizationHeader()
            },
            body: JSON.stringify({
                'PlaySessionId': sessionId,
                'MediaSourceId': media.id,
                'PositionTicks': positionTicks,
                'IsPaused': paused
            })
        });

        return response.ok;
    } catch (error) {
        console.log(`${ReportPlayback.name} exception: ${error}`);
    }

    return false;
};

//#endregion

//#region Home sections

export const GetContinueWatching = async (): Promise<TMedia[]> => {
    try {
        const response = await fetch(`${server.address}/Users/${user.id}/Items/Resume` +
                                     '?Limit=12&Recursive=true&includeItemTypes=Episode,Movie', {
            headers: {
                ...GenerateAuthorizationHeader()
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

export const GetNextUp = async (cutOffDateTime: Date): Promise<TMedia[]> => {
    try {
        const response = await fetch(`${server.address}/Shows/NextUp` +
                                     '?UserId=b310988995c24ba3bc58fb3b2f4510b2' +
                                     `&nextUpDateCutoff=${cutOffDateTime.toISOString()}`, {
            headers: {
                ...GenerateAuthorizationHeader()
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

export const GenerateAuthorizationHeader = (): object => {
    const { user } = user$.get();

    const value = 'MediaBrowser' +
        ` Client="${Constants.expoConfig?.name ?? 'Mobile'}"` +
        `, Device="${Device.deviceName ?? 'Unknown'}"` +
        `, DeviceId="${user.deviceId}"` +
        `, Version="${Constants.expoConfig?.version ?? 'Unknown'}"` +
        (user.accessToken ? `, Token="${user.accessToken}"` : '')
    ;

    return {
        'X-Emby-Authorization': value
    };
};

//#endregion
