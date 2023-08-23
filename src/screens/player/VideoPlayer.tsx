import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState, useCallback } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Background from 'src/components/styled/Background';
import { GenerateAuthorizationHeader } from 'src/services/JellyfinAPI';
import server$ from 'src/state/server/server$';
import user$ from 'src/state/user/user$';
import TMediaNavigation from 'src/types/navigation/TMediaNavigation';
import { VLCPlayer } from 'react-native-vlc-media-player';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { OrientationLock } from 'expo-screen-orientation';

type TProps = {

} & NativeStackScreenProps<TMediaNavigation, 'VideoPlayer'>;

const VideoPlayerScreen = (props: TProps) => {
    const { route } = props;
    const { media } = route.params!;

    const { server } = server$.get();
    const { user } = user$.get();


    const videoRef = useRef<VLCPlayer | null>(null);
    // const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const videoUrl = `${server.address}/Videos/${media.id}/stream.mkv?MediaSourceId=${media.id}`;
    // const videoUrl = `${server.address}/Videos/${media.id}/main.m3u8?startTimeTicks=0&segmentLength=10`;
    // const videoUrl = 'https://download.blender.org/peach/trailer/trailer_400p.ogg';
    // const videoUrl = '';
    console.log(videoUrl);


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

    useFocusEffect(
        useCallback(() => {
            const goLandscape = async () => {
                await ScreenOrientation.lockAsync(OrientationLock.LANDSCAPE);
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
                <VLCPlayer
                    source={{
                        uri: videoUrl,
                        headers: { ...GenerateAuthorizationHeader() }
                    }}

                    resizeMode='contain'
                    // controls={true}


                    style={styles.videoPlayer}
                    onError={(e) => console.log(e)}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        width: 250,
        height: 250
    },
    videoPlayer: {
        flex: 1
    }
});

export default VideoPlayerScreen;
