import server$ from 'src/state/server/server$';

type TStartPlayback = {
    success: false
} | {
    success: true,

    playbackUrl: string,
    playSessionId: string
};

export const ConvertToTStartPlayback = (json: any, playbackUrl?: string): TStartPlayback => {
    const server = server$.server.get();

    const success = json === undefined || json === null || JSON.stringify(json).length <= 0;

    if (success === false) {
        return {
            success: false
        };
    }

    return {
        success: true,

        playbackUrl: `${server.address}/${json.MediaSources[0].TranscodingUrl ?? playbackUrl?.replace(server.address, '')}`,
        playSessionId: json.PlaySessionId
    };
};

export default TStartPlayback;
