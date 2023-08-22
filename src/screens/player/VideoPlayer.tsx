import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Background from 'src/components/styled/Background';
import { GenerateAuthorizationHeader } from 'src/services/JellyfinAPI';
import server$ from 'src/state/server/server$';
import user$ from 'src/state/user/user$';
import TMediaNavigation from 'src/types/navigation/TMediaNavigation';
import Video, { isCodecSupported } from 'react-native-video';

type TProps = {

} & NativeStackScreenProps<TMediaNavigation, 'VideoPlayer'>;

const VideoPlayerScreen = (props: TProps) => {
    const { route } = props;
    const { media } = route.params!;

    const { server } = server$.get();
    const { user } = user$.get();


    const videoRef = useRef<Video | null>(null);
    // const [videoUrl, setVideoUrl] = useState<string | null>(null);
    // const videoUrl = `${server.address}/Videos/${media.id}/stream.mkv?MediaSourceId=${media.id}`;
    // const videoUrl = `${server.address}/Videos/${media.id}/main.m3u8?startTimeTicks=0&segmentLength=10`;
    const videoUrl = '';
    console.log(videoUrl);

    console.log(isCodecSupported('video/hevc'));


    // useEffect(() => {
    //     const load = async () => {
    //         console.log('gah');
    //         const playbackUrl = await GetPlaybackUrl(media.id);
    //         console.log(`playbackUrl: ${playbackUrl}`);

    //         if (playbackUrl.length > 0) {
    //             setVideoUrl(playbackUrl);
    //         }
    //     };

    //     load();
    // }, []);


    return (
        <>
            <Background />

            <View style={styles.root}>
                {/* Video URL not set */}
                {!videoUrl && (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Loading</Text>
                    </View>
                )}

                {/* Video URL set */}
                {videoUrl && (
                    <Video
                        ref={videoRef}
                        source={{
                            uri: videoUrl,
                            headers: { ...GenerateAuthorizationHeader() }
                        }}
                        resizeMode='contain'
                        controls={true}


                        style={styles.videoPlayer}

                        onError={(e) => console.log(e)}
                    />
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0
    },
    videoPlayer: {
        flex: 1
    }
});

export default VideoPlayerScreen;
