import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopographyPattern from 'src/components/patterns/TopographyPattern';
import Background from 'src/components/styled/Background';
import server$ from 'src/state/server/server$';
import user$ from 'src/state/user/user$';

const DeveloperScreen = () => {
    const { onDelete: serverOnDelete } = server$.use();
    const { onDelete: userOnDelete } = user$.use();

    return (
        <>
            <Background />
            <TopographyPattern />

            <View style={[{ paddingTop: useSafeAreaInsets().top }, styles.main]}>
                <Button onPress={() => { serverOnDelete(); userOnDelete(); }} mode='contained-tonal'>Delete user and server</Button>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 16,
        marginTop: 16,
        marginHorizontal: 16
    }
});

export default DeveloperScreen;
