// https://github.com/jarnedemeulemeester/findroid/blob/cef6bf3c0a84d233fef8e91ceed30f6b1a622697/data/src/main/java/dev/jdtech/jellyfin/repository/JellyfinRepositoryImpl.kt#L293C1-L293C55
import TSubtitleProfile, { createSubtitleProfile } from 'src/types/JellyfinAPI/device/TSubtitleProfile';
import TDirectPlayProfile, { createDirectPlayProfile } from './TDirectPlayProfile';

const asd = createDirectPlayProfile({ Type: 'Video' });

type TDeviceProfile = {
    Name: string,

    MaxStaticBitrate: number,
    MaxStreamingBitrate: number,

    CodecProfiles: [],
    ContainerProfiles: [],
    DirectPlayProfiles: TDirectPlayProfile[],
    TranscodingProfiles: [],
    ResponseProfiles: [],
    SubtitleProfiles: TSubtitleProfile[],

    XmlRootAttributes: [],
    SupportedMediaTypes: string,

    enableAlbumArtInDidl: boolean,
    enableMsMediaReceiverRegistrar: boolean,
    enableSingleAlbumArtLimit: boolean,
    enableSingleSubtitleLimit: boolean,
    ignoreTranscodeByteRangeRequests: boolean,

    maxAlbumArtHeight: number,
    maxAlbumArtWidth: number,

    RequiresPlainFolders: boolean,
    RequiresPlainVideoItems: boolean,
    TimelineOffsetSeconds: number
};

export const createDeviceProfile = (deviceProfile: TDeviceProfile) => {
    const defaults = {

    } as TDeviceProfile;

    return {
        ...defaults,
        ...deviceProfile
    };
};


//#region Presets

export const DirectPlayDeviceProfile: TDeviceProfile = {
    Name: 'DirectPlay',

    MaxStaticBitrate: 1_000_000_000,
    MaxStreamingBitrate: 1_000_000_000,

    CodecProfiles: [],
    ContainerProfiles: [],
    DirectPlayProfiles: [
        createDirectPlayProfile({ Type: 'Video' }),
        createDirectPlayProfile({ Type: 'Audio' })
    ],
    TranscodingProfiles: [],
    ResponseProfiles: [],
    SubtitleProfiles: [
        createSubtitleProfile({ Format: 'srt', Method: 'External' }),
        createSubtitleProfile({ Format: 'ass', Method: 'External' }),
        createSubtitleProfile({ Format: 'ssa', Method: 'External' })
    ],

    XmlRootAttributes: [],
    SupportedMediaTypes: '',

    enableAlbumArtInDidl: false,
    enableMsMediaReceiverRegistrar: false,
    enableSingleAlbumArtLimit: false,
    enableSingleSubtitleLimit: false,
    ignoreTranscodeByteRangeRequests: false,

    maxAlbumArtHeight: 1_000_000_000,
    maxAlbumArtWidth: 1_000_000_000,

    RequiresPlainFolders: false,
    RequiresPlainVideoItems: false,
    TimelineOffsetSeconds: 0
};

//#endregion


export default TDeviceProfile;
