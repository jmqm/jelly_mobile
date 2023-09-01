import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Alert, ScrollView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopographyPattern from 'src/components/patterns/TopographyPattern';
import Background from 'src/components/styled/Background';
import { GenerateAuthorizationHeader, StartPlayback } from 'src/services/JellyfinAPI';
import server$ from 'src/state/server/server$';
import user$ from 'src/state/user/user$';
import type TMainNavigation from 'src/types/navigation/TMainNavigation';
import type TMediaNavigation from 'src/types/navigation/TMediaNavigation';

const DeveloperScreen = () => {
    const { server, onDelete: serverOnDelete } = server$.get();
    const { user, onDelete: userOnDelete } = user$.get();

    const mainNavigation: NavigationProp<TMainNavigation> = useNavigation();
    const mediaNavigation: NavigationProp<TMediaNavigation> = useNavigation();

    const showServerData = () => {
        console.log(JSON.stringify(server));
    };

    const showUserData = () => {
        console.log(JSON.stringify(user));
    };

    const logAuthorization = () => {
        const authorization = JSON.stringify(GenerateAuthorizationHeader())
            .replaceAll('\\"', '"');

        console.log(authorization);
    };

    const goToFences = () => {
        mainNavigation.navigate('LibrariesStack', undefined!);
    };

    const goToMHA = () => {

    };

    const goToVideoPlayer = () => {
        mainNavigation.navigate('LibrariesStack', undefined!);
        mediaNavigation.navigate('VideoPlayer', undefined!);
    };


    return (
        <>
            <Background />
            <TopographyPattern />

            <ScrollView style={[{ paddingTop: useSafeAreaInsets().top }, { flex: 1 }]} contentContainerStyle={styles.main}>
                <Button onPress={() => { serverOnDelete(); userOnDelete(); }} mode='contained-tonal'>Delete user and server</Button>
                <Button onPress={showServerData} mode='contained-tonal'>Show server</Button>
                <Button onPress={showUserData} mode='contained-tonal'>Show user</Button>
                <Button onPress={logAuthorization} mode='contained-tonal'>logAuthorization</Button>
                <Button onPress={() => StartPlayback('ef65e90cdde6ab3b0fe4be51f6c6baa0')} mode='contained-tonal'>Get playbackUrl for Fences</Button>
                <Button onPress={() => StartPlayback('b3f1526ba0b2b2198bddaaf2af17cb0f')} mode='contained-tonal'>Get playbackUrl for Weak Hero S01E01</Button>
                <Button onPress={goToFences} mode='contained-tonal'>Go to Fences</Button>
                <Button onPress={goToMHA} mode='contained-tonal'>Go to MHA S06E23</Button>
                <Button onPress={goToVideoPlayer} mode='contained-tonal'>Go to Video Player</Button>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 16,
        marginTop: 16,
        marginHorizontal: 16
    }
});

export default DeveloperScreen;
