import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ToastAndroid, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { List, Modal, Portal, SegmentedButtons, Text } from 'react-native-paper';
import Background from 'src/components/styled/Background';
import { StartPlayback } from 'src/services/JellyfinAPI';
import type TMediaNavigation from 'src/types/navigation/TMediaNavigation';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import BackButton from 'src/components/media/BackButton';
import hiddenConfigurations$ from 'src/state/hiddenConfigurations/hiddenConfigurations$';
import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { VLCPlayer } from '@jmqm/react-native-vlc-media-player';
import { StatusBar } from 'expo-status-bar';
import { clamp } from 'src/utilities/General';
import { secondsToMilliseconds, ticksToMilliseconds } from 'src/utilities/time';
import { MaterialIcons } from '@expo/vector-icons';

type TProps = {

} & NativeStackScreenProps<TMediaNavigation, 'VideoPlayer'>;

/**
 * This will produce misleading results on an emulator device, at least on Android.
*/
const VideoPlayerScreen = (props: TProps) => {
    const { route, navigation } = props;
    const { media } = route.params!;

    const hiddenConfigurations = hiddenConfigurations$;

    const [errorCounter, setErrorCounter] = useState<number>(0);
    const [playbackInfo, setPlaybackInfo] = useState<{ sessionId: string, url: string, type?: string } | null>(null);

    const [hideControls, setHideControls] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(-1);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [paused, setPaused] = useState<boolean>(false);

    const [audioTrack, setAudioTrack] = useState<number>(-1);
    const [audioTracks, setAudioTracks] = useState<VideoInfo['audioTracks']>([]);
    const [subtitleTrack, setSubtitleTrack] = useState<number>(-1);
    const [subtitleTracks, setSubtitleTracks] = useState<VideoInfo['textTracks']>([]);

    const [audioDelay, setAudioDelay] = useState<number>(0);
    const [subtitleDelay, setSubtitleDelay] = useState<number>(0);

    const [audioModalVisible, setAudioModalVisible] = useState<boolean>(false);
    const [subtitleModalVisible, setSubtitleModalVisible] = useState<boolean>(false);

    const videoRef = useRef<VLCPlayer | null>(null);


    //#region Callbacks

    const handleOnLoad = (data: any) => {
        setDuration(data.duration / 1000);

        setAudioTracks(data.audioTracks);
        setSubtitleTracks(data.textTracks);

        setAudioTrack(data.audioTrackId);
        setSubtitleTrack(data.textTrackId);
    };

    const handleOnError = (event: SimpleCallbackEventProps) => {
        setErrorCounter((prev) => ++prev);
        console.log(`${VideoPlayerScreen.name} onError: ${JSON.stringify(event)}`);
    };

    const [checkedPlaybackPosition, setCheckedPlaybackPosition] = useState<boolean>(false);
    const handleOnProgress = (event: OnProgressEventProps) => {
        // Seek on initial load.
        if (!checkedPlaybackPosition && !media.userData.watched && media.userData.playbackPositionTicks) {
            handleSeek(ticksToMilliseconds(media.userData.playbackPositionTicks) / 1000 - 2);
        }

        setCheckedPlaybackPosition(true);

        setCurrentTime(event.currentTime / 1000);
    };

    const handleOnEnd = () => {
        console.log('end');
        setPaused(true);
    };

    //#endregion


    //#region Controls

    const hideControlsTimeoutRef = useRef<NodeJS.Timeout>();
    const handleRootOnTouchStart = () => {
        clearTimeout(hideControlsTimeoutRef.current);
        setHideControls((prev) => !prev);

        const timeoutId = setTimeout(() => setHideControls(true), 3000);
        hideControlsTimeoutRef.current = timeoutId;
    };

    useEffect(() => {
        handleRootOnTouchStart();
        handleRootOnTouchStart();
    }, []);

    const handleSeek = (time: number) => {
        const newTime = clamp(0, time, duration);
        videoRef.current?.seek(secondsToMilliseconds(newTime));
    };

    const handleRewind = () => {
        handleSeek(currentTime - 5);
    };

    const handlePlayPause = () => {
        setPaused((prev) => !prev);
    };

    const handleFastForward = () => {
        handleSeek(currentTime + 10);
    };

    const handleChangeSubtitle = () => {
        let indexToSet = subtitleTrack + 1;

        if (indexToSet > subtitleTracks.length - 1) {
            indexToSet = -1;
        }

        setSubtitleTrack(indexToSet);
    };

    const handleChangeAudioTrack = () => {
        let indexToSet = audioTrack + 1;

        if (indexToSet > audioTracks.length - 1) {
            indexToSet = -1;
        }

        setAudioTrack(indexToSet);
    };

    //#endregion


    // Get playback info
    useEffect(() => {
        const load = async () => {
            // Playback info
            const playbackInfoResponse = await StartPlayback(media.id, errorCounter > 0);

            // TODO: Understand if returned static or transcoded; if so, get audio tracks and subtitles.

            if (!playbackInfoResponse.success || errorCounter >= 3) {
                const message = ['Unable to play video'];

                if (!playbackInfoResponse.success && playbackInfoResponse.errorMessage) {
                    message.push(`Error: ${playbackInfoResponse.errorMessage}`);
                }

                ToastAndroid.show(message.join('\r\n'), ToastAndroid.SHORT);
                return;
            }

            // Set states.
            setPlaybackInfo({
                sessionId: playbackInfoResponse.playSessionId,
                url: playbackInfoResponse.playbackUrl,
                type: playbackInfoResponse.playbackType
            });
        };

        load();
    }, [errorCounter]);


    // Lock screen orientation
    useFocusEffect(
        useCallback(() => {
            let initialOrientationLock: ScreenOrientation.OrientationLock;

            const goLandscape = async () => {
                initialOrientationLock = await ScreenOrientation.getOrientationLockAsync();
                await ScreenOrientation.lockAsync(__DEV__ ? ScreenOrientation.OrientationLock.LANDSCAPE_LEFT : ScreenOrientation.OrientationLock.LANDSCAPE);
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


    useEffect(() => {
        clearTimeout(hideControlsTimeoutRef.current);
        setHideControls((prev) => !prev);

        const timeoutId = setTimeout(() => setHideControls(true), 3000);
        hideControlsTimeoutRef.current = timeoutId;
    }, []);



    return (
        <>
            <StatusBar hidden={true} />
            <Background colour='black' />
            {!hideControls && (<BackButton />)}

            <Portal>
                {/* Audio changes */}
                <Modal visible={audioModalVisible} onDismiss={() => setAudioModalVisible(false)} contentContainerStyle={styles.modal}>
                    <View>
                        {audioTracks.map((audioTrack) => (
                            <List.Item
                                key={audioTrack.id}
                                title={audioTrack.name}
                                onPress={() => setAudioTrack(audioTrack.id)}
                                style={{ borderRadius: 8 }}
                            />
                        ))}
                    </View>

                    <SegmentedButtons
                        value={''}
                        onValueChange={() => { }}
                        buttons={[
                            {
                                value: 'decrease',
                                label: 'Decrease',
                                onPress: () => setAudioDelay((prev) => prev - 50)
                            },
                            {
                                value: 'currentValue',
                                label: `${audioDelay}`,
                                onPress: () => setAudioDelay(0)
                            },
                            {
                                value: 'increase',
                                label: 'Increase',
                                onPress: () => setAudioDelay((prev) => prev + 50)
                            }
                        ]}
                    />
                </Modal>

                {/* Subtitle changes */}
                <Modal visible={subtitleModalVisible} onDismiss={() => setSubtitleModalVisible(false)} contentContainerStyle={styles.modal}>
                    <View>
                        {subtitleTracks.map((subtitleTrack) => (
                            <List.Item
                                key={subtitleTrack.id}
                                title={subtitleTrack.name}
                                onPress={() => setSubtitleTrack(subtitleTrack.id)}
                            />
                        ))}
                    </View>

                    <SegmentedButtons
                        value={''}
                        onValueChange={() => { }}
                        buttons={[
                            {
                                value: 'decrease',
                                label: 'Decrease',
                                onPress: () => setSubtitleDelay((prev) => prev - 50)
                            },
                            {
                                value: 'currentValue',
                                label: `${subtitleDelay}`,
                                disabled: true
                            },
                            {
                                value: 'increase',
                                label: 'Increase',
                                onPress: () => setSubtitleDelay((prev) => prev + 50)
                            }
                        ]}
                    />
                </Modal>
            </Portal>

            <View style={styles.root} onTouchEnd={handleRootOnTouchStart}>
                {/* Video player */}
                {playbackInfo?.url && (
                    <VLCPlayer
                        ref={videoRef}
                        source={{
                            uri: playbackInfo?.url
                        }}
                        // Create settings of audio resampler and audio output
                        // maybe some additional initOptions
                        initOptions={[
                            '--play-and-pause',
                            '--no-color',
                            '--verbose=0',
                            '--audio-resampler=soxr', // Android bad audio fix
                            '--aout=any' // Android bad audio fix
                        ]}

                        resizeMode='contain'
                        style={styles.videoPlayer}

                        paused={paused}
                        audioTrack={audioTrack}
                        textTrack={subtitleTrack}

                        audioDelay={audioDelay}
                        textDelay={subtitleDelay}

                        // Events
                        onLoad={handleOnLoad}
                        onError={handleOnError}
                        onProgress={handleOnProgress}
                        onEnd={handleOnEnd}
                    />
                )}

                {/* Controls */}
                {!hideControls && (
                    <View style={[styles.controls, styles.topControls]} onTouchEnd={(e) => e.stopPropagation()}>
                        <TouchableOpacity onPress={() => setAudioModalVisible(true)} disabled={audioTracks.length <= 0}>
                            <MaterialIcons name='multitrack-audio' size={24} color={audioTracks.length <= 0 ? 'gray' : 'white'} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setSubtitleModalVisible(true)} disabled={subtitleTracks.length <= 0}>
                            <MaterialIcons name='subtitles' size={24} color={subtitleTracks.length <= 0 ? 'gray' : 'white'} />
                        </TouchableOpacity>
                    </View>
                )}

                {!hideControls && (
                    <View style={[styles.controls, styles.bottomControls]} onTouchEnd={(e) => e.stopPropagation()}>
                        <View style={styles.scrubber}>
                            <Text style={styles.time}>
                                {Math.floor(currentTime / 60).toString().padStart(2, '0')}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}
                            </Text>

                            <Slider
                                style={styles.slider}
                                value={currentTime}
                                maximumValue={duration}
                                minimumTrackTintColor='#333333'
                                maximumTrackTintColor='#ffffff'
                                thumbTintColor='#ffffff'
                                onSlidingComplete={handleSeek}
                            />

                            {duration > 0 && (
                                <Text style={styles.time}>
                                    {Math.floor(duration / 60).toString().padStart(2, '0')}:{Math.floor(duration % 60).toString().padStart(2, '0')}
                                </Text>
                            )}
                        </View>

                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={handleRewind}>
                                <MaterialCommunityIcons name='rewind-5' color='white' size={24} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handlePlayPause}>
                                <MaterialCommunityIcons name={paused ? 'play' : 'pause'} color='white' size={32} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleFastForward}>
                                <MaterialCommunityIcons name='fast-forward-10' color='white' size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
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
        flex: 1,
        objectFit: 'cover'
    },
    controls: {
        position: 'absolute',
        width: '100%',
        padding: 12,
        backgroundColor: '#0000007c'
    },
    topControls: {
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 32
    },
    bottomControls: {
        position: 'absolute',
        bottom: 0
    },
    scrubber: {
        display: 'flex',
        flexDirection: 'row'
    },
    time: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    slider: {
        flex: 1,
        marginHorizontal: 12
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 8,
        gap: 32
    },
    modal: {
        display: 'flex',
        gap: 16,
        padding: 16,
        alignSelf: 'center',
        justifyContent: 'center',
        width: 350
    }
});

export default VideoPlayerScreen;
