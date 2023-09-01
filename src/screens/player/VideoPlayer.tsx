import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState, useCallback } from 'react';
import { View } from 'react-native';
import { Dimensions, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Background from 'src/components/styled/Background';
import { GenerateAuthorizationHeader, StartPlayback } from 'src/services/JellyfinAPI';
import TMediaNavigation from 'src/types/navigation/TMediaNavigation';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
// @ts-ignore: has no exported member named 'VideoDecoderProperties'
import VideoRNV, { VideoDecoderProperties } from 'react-native-video';
import { ResizeMode, Video as VideoEXPO } from 'expo-av';
import BackButton from 'src/components/media/BackButton';
import hiddenConfigurations$ from 'src/state/hiddenConfigurations/hiddenConfigurations$';
import { minutesToMilliseconds, secondsToMilliseconds } from 'src/utilities/time';

type TProps = {

} & NativeStackScreenProps<TMediaNavigation, 'VideoPlayer'>;

/**
 * This will produce misleading results on an emulator device, at least on Android.
*/
const VideoPlayerScreen = (props: TProps) => {
    const { route } = props;
    const { media } = route.params!;

    const hiddenConfigurations = hiddenConfigurations$;

    const [errorCounter, setErrorCounter] = useState<number>(0);
    const [playbackUrl, setPlaybackUrl] = useState<string | null>(null);
    const [playbackType, setPlaybackType] = useState<string | undefined>();

    const videoRef = useRef<VideoRNV | null>(null);


    // Get playback url
    useEffect(() => {
        const load = async () => {
            const response = await StartPlayback(media.id, errorCounter > 0);

            if (response.success) {
                setPlaybackUrl(response.playbackUrl);
                setPlaybackType(response.playbackType);
            }
        };

        load();
    }, [errorCounter]);


    // Lock screen orientation
    useFocusEffect(
        useCallback(() => {
            let initialOrientationLock: ScreenOrientation.OrientationLock;

            const goLandscape = async () => {
                initialOrientationLock = await ScreenOrientation.getOrientationLockAsync();
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
            };

            goLandscape();

            return async () => {
                await ScreenOrientation.unlockAsync();

                if (initialOrientationLock) {
                    await ScreenOrientation.lockAsync(initialOrientationLock);
                }
            };
        }, [])
    );

    // Set defaults
    useFocusEffect(
        useCallback(() => {
            const initialHideMainNavigation = hiddenConfigurations.hideMainNavigation.get();

            hiddenConfigurations.hideMainNavigation.set(true);

            return () => {
                hiddenConfigurations.hideMainNavigation.set(initialHideMainNavigation);
            };
        }, [])
    );


    return (
        <>
            <Background colour='black' />
            <BackButton />

            <View style={styles.root}>
                {playbackUrl && (
                    <VideoRNV
                        ref={videoRef}
                        source={{
                            uri: playbackUrl,
                            headers: {
                                ...GenerateAuthorizationHeader()
                            },
                            type: playbackType
                        }}
                        controls={true}
                        fullscreen={true}
                        fullscreenOrientation='landscape'
                        hideShutterView={false}

                        text
                        bufferConfig={{
                            bufferForPlaybackMs: secondsToMilliseconds(10),
                            bufferForPlaybackAfterRebufferMs: secondsToMilliseconds(10),
                            maxBufferMs: minutesToMilliseconds(5)
                        }}

                        resizeMode='contain'
                        style={styles.videoPlayer}
                        onLoad={(e) => {
                            console.log(`${VideoPlayerScreen.name} onLoad: ${JSON.stringify(e)}`);
                        }}
                        onError={(e) => {
                            setErrorCounter((prev) => ++prev);
                            console.log(`${VideoPlayerScreen.name} onError: ${JSON.stringify(e)}`);
                        }}
                    />
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    videoPlayer: {
        flex: 1
    }
});

export default VideoPlayerScreen;
