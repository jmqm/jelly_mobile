import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState, useCallback } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Background from 'src/components/styled/Background';
import { GenerateAuthorizationHeader, StartPlayback } from 'src/services/JellyfinAPI';
import server$ from 'src/state/server/server$';
import user$ from 'src/state/user/user$';
import TMediaNavigation from 'src/types/navigation/TMediaNavigation';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import VideoRNV from 'react-native-video';
import { ResizeMode, Video as VideoEXPO } from 'expo-av';

type TProps = {

} & NativeStackScreenProps<TMediaNavigation, 'VideoPlayer'>;

const VideoPlayerScreen = (props: TProps) => {
    const { route } = props;
    // const { media } = route.params!;

    const { server } = server$.get();
    const { user } = user$.get();

    const media = {
        id: '59c059d89cf3efcd96056add9377ca7f'
    };

    const options = [
        `mediaSourceId=${media.id}`,
        // 'allowVideoStreamCopy=true',
        'startTimeTicks=0',
        'segmentLength=60'
    ];


    const videoRef = useRef<VideoRNV | null>(null);
    // const [videoUrl, setVideoUrl] = useState<string | null>(null);
    // const videoUrl = `${server.address}/Videos/${media.id}/stream.mp4?mediaSourceId=${media.id}`;
    // const videoUrl = `${server.address}/Videos/${media.id}/master.m3u8?${options.join('&')}`;
    const videoUrl = 'https://download.blender.org/peach/trailer/trailer_400p.ogg';
    // const videoUrl = '';
    console.log(videoUrl);


    useEffect(() => {
        const load = async () => {
            const playbackUrl = await StartPlayback(media.id);
        };

        // load();
    }, []);

    useFocusEffect(
        useCallback(() => {
            const goLandscape = async () => {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
            };

            goLandscape();

            return async () => {
                await ScreenOrientation.unlockAsync();
            };
        }, [])
    );

    return (
        <>
            <Background />

            <View style={styles.root}>
                <VideoRNV
                    ref={videoRef}
                    source={{
                        uri: videoUrl,
                        headers: {
                            ...GenerateAuthorizationHeader()
                        }
                    }}
                    controls={true}

                    resizeMode='cover'
                    style={styles.videoPlayer}
                    onError={(e) => console.log(e.error)}
                />

                {/* <VideoEXPO
                    source={{
                        uri: videoUrl,
                        headers: {
                            ...GenerateAuthorizationHeader()
                        }
                    }}
                    useNativeControls={true}
                    resizeMode={ResizeMode.CONTAIN}
                    style={styles.videoPlayer}
                    onError={(e) => console.log(e)}
                /> */}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 11
    },
    videoPlayer: {
        flex: 1
    }
});

export default VideoPlayerScreen;
