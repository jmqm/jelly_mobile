type TDirectPlayProfile = {
    Type: 'Video' | 'Audio',
    Container?: string,
    VideoCodec?: string,
    AudioCodec?: string
};

export const createDirectPlayProfile = (directPlayProfile: TDirectPlayProfile) => {
    const defaults = {
        Container: '',
        VideoCodec: '',
        AudioCodec: ''
    } as TDirectPlayProfile;

    return {
        ...defaults,
        ...directPlayProfile
    };
};

export default TDirectPlayProfile;
