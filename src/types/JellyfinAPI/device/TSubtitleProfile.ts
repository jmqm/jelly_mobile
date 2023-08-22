type TSubtitleProfile = {
    Format: string,
    Method: 'Embed' | 'External' | 'Hls'
};

export const createSubtitleProfile = (subtitleProfile: TSubtitleProfile) => {
    const defaults = {

    } as TSubtitleProfile;

    return {
        ...defaults,
        ...subtitleProfile
    };
};

export default TSubtitleProfile;
