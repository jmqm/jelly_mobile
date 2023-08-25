import { useEffect, useState } from 'react';
import { Alert, Image, Keyboard, StyleSheet, View } from 'react-native';
import { Button, Caption, TextInput, Title } from 'react-native-paper';
import { GetPublicInfo } from 'src/services/JellyfinAPI';
import server$ from 'src/state/server/server$';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Background from 'src/components/styled/Background';

const AddServerScreen = () => {
    const { onSet } = server$.get();

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [address, setAddress] = useState<string>(__DEV__ ? 'http://10.0.0.237:8096' : '');
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        setIsKeyboardVisible(Keyboard.isVisible());

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardVisible(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);


    const handleChangeText = (text: string) => {
        setAddress(text);
    };

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

        onSet({
            address: addressModified,
            id: response.id,
            name: response.name
        });
    };


    return (
        <>
            <Background />

            <View style={[{ marginTop: useSafeAreaInsets().top, marginBottom: useSafeAreaInsets().bottom }, styles.root]}>
                {!isKeyboardVisible && (
                    <View style={styles.branding}>
                        {/* TODO: Need to change image */}
                        <Image source={require('src/assets/images/jellyfin_logo.png')} style={styles.image} />
                        <Title>Jelly Mobile</Title>
                    </View>
                )}

                <TextInput
                    label='Server Address'
                    value={address}
                    onChangeText={handleChangeText}

                    style={styles.addressInput}
                    autoComplete='off'
                    mode='outlined'
                    onSubmitEditing={handleCheckServer}
                />
                <Caption>Include protocol (http://, https://)</Caption>

                <Button
                    mode='contained-tonal'
                    style={styles.submitButton}
                    onPress={handleCheckServer}
                    disabled={loading}
                >
                    {loading ? 'Checking' : 'Check Server'}
                </Button>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '40%'
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
        borderWidth: 0
    },
    submitButton: {
        marginTop: 20
    }
});

export default AddServerScreen;
