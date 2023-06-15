import { useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { Button, Caption, TextInput, Title } from 'react-native-paper';
import { GetPublicInfo } from 'src/services/JellyfinAPI';
import useServerInfo from 'src/providers/server/useServerInfo';
import TServerInfo, { createServerInfo } from 'src/types/server/TServerInfo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AddServerScreen = () => {
    const { onSet } = useServerInfo();

    // ! Change to 'https://'
    const [address, setAddress] = useState<string>('http://10.0.0.237:8096');
    const [loading, setLoading] = useState<boolean>(false);

    const handleCheckServer = async () => {
        setLoading(true);

        const addressModified = address.slice(-1) !== '/' ? address : address.slice(0, -1);
        const response = await GetPublicInfo(addressModified);

        setLoading(false);

        if (response.success == false) {
            return Alert.alert(
                'Failed to connect to server',
                'Could not connect to server.\r\n' +
                    'Possible typo or server is down?'
            );
        } else if (response.startupWizardCompleted == false) {
            return Alert.alert(
                'Startup wizard incomplete',
                'This client has not implemented the startup wizard setup.' +
                    'Finish the startup wizard and try again.'
            );
        }

        const serverInfo = createServerInfo({
            address: addressModified,
            serverId: response.id,
            serverName: response.name
        } as TServerInfo);

        onSet(serverInfo); // 'await' omitted intentionally.
    };

    return (
        <View style={[{ paddingTop: useSafeAreaInsets().top }, styles.root ]}>
            <View style={styles.branding}>
                {/* ! Need to change image */}
                <Image source={require('src/assets/images/jellyfin_logo.png')} style={styles.image} />
                <Title>Jelly Mobile</Title>
            </View>

            <TextInput
                label='Server Address'
                value={address}
                onChangeText={(text: string) => setAddress(text)}

                style={styles.addressInput}
                autoComplete='off'
                textAlign='center'
                mode='outlined'
                onSubmitEditing={handleCheckServer}
            />
            <Caption>Include protocol (http://, https://)</Caption>

            <Button
                mode='outlined'
                style={styles.submitButton}
                onPress={handleCheckServer}
                disabled={loading}
            >
                {loading ? 'Checking' : 'Check Server'}
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        marginTop: '40%'
    },
    branding: {
        marginBottom: 40,
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 12
    },
    addressInput: {
        width: '75%',
        borderWidth: 0,
        backgroundColor: 'white'
    },
    submitButton: {
        marginTop: 20
    }
});

export default AddServerScreen;
