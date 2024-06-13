import CMedia from 'src/classes/jellyfin/media/CMedia';

type TReportPlayback = {
    type: 'Started' | 'Progress' | 'Stopped',
    media: CMedia,
    sessionId: string,
    positionTicks: number,
    paused: boolean
};

export default TReportPlayback;
