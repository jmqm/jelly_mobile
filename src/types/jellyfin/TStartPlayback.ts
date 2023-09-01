type TStartPlayback = {
    success: false
} | {
    success: true,

    playbackUrl: string,
    playbackType: string | undefined,
    playSessionId: string
};

export default TStartPlayback;
