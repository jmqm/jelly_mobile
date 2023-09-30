type TStartPlayback = {
    success: false,
    errorMessage?: string
} | {
    success: true,

    playSessionId: string,
    playbackUrl: string,
    playbackType: string | undefined
};

export default TStartPlayback;
