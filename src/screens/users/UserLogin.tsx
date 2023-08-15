import { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Alert, Keyboard } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { LogIn } from 'src/services/JellyfinAPI';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Background from 'src/components/styled/Background';
import server$ from 'src/state/server/server$';
import user$ from 'src/state/user/user$';
import TUser from 'src/state/user/TUser';

const UserLoginScreen = () => {
    const { onDelete: serverOnDelete } = server$.use();
    const { onSet: userOnSet } = user$.use();

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [username, setUsername] = useState<string>(__DEV__ ? 'jmqm' : '');
    const [password, setPassword] = useState<string>(__DEV__ ? 'ol' : '');
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


    const handleLogin = async () => {
        setLoading(true);

        const response = await LogIn(username, password);

        setLoading(false);

        if (response.success === false) {
            return Alert.alert(
                'Failed to connect to server',
                'Could not connect to server.\r\n' +
                    'Possible typo or server is down?'
            );
        };

        // Successful

        userOnSet({
            loginName: response.userName,
            id: response.userId,
            accessToken: response.userAccessToken
        } as TUser);
    };

    const handleSwitchServer = () => {
        serverOnDelete();
    };


    return (
        <>
            <Background />

            <View style={[{ marginTop: useSafeAreaInsets().top, marginBottom: useSafeAreaInsets().bottom }, styles.root]}>
                {!isKeyboardVisible && (
                    <View style={styles.branding}>
                        <Image source={require('src/assets/images/jellyfin_logo.png')} style={styles.image} />
                        <Title>Jelly Mobile</Title>
                    </View>
                )}

                {/* TODO: Bitwarden accessibility is blocking components. */}
                {/* TODO: It also overstays, even when logged in it still shows until I press it (at least in Expo Go). */}
                <TextInput
                    label='Username'
                    value={username}
                    onChangeText={(text: string) => setUsername(text)}

                    style={styles.input}
                    autoComplete='off'
                    textAlign='center'
                    mode='outlined'
                />

                <TextInput
                    label='Password'
                    value={password}
                    onChangeText={(text: string) => setPassword(text)}

                    style={styles.input}
                    secureTextEntry={true}
                    autoComplete='off'
                    textAlign='center'
                    mode='outlined'
                />

                <Button
                    mode='contained-tonal'
                    style={styles.button}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? 'Logging in' : 'Log in'}
                </Button>

                <Button
                    mode='contained-tonal'
                    style={styles.button}
                    onPress={handleSwitchServer}
                    disabled={loading}
                >
                    Switch server
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
    input: {
        width: '75%',
        marginVertical: 4,
        borderWidth: 0
    },
    button: {
        marginTop: 20
    }
});

export default UserLoginScreen;
