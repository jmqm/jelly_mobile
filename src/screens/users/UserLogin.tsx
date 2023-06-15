import { useState } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import useServerInfo from 'src/providers/server/useServerInfo';
import { LogIn } from 'src/services/JellyfinAPI';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const UserLoginScreen = () => {
    const [username, setUsername] = useState<string>('jmqm');
    const [password, setPassword] = useState<string>('ol');
    const [loading, setLoading] = useState<boolean>(false);

    const { serverInfo, onSet, onDelete } = useServerInfo();

    const handleLogin = async () => {
        setLoading(true);

        const response = await LogIn(serverInfo, username, password);

        setLoading(false);

        if (response.success === false) {
            return Alert.alert(
                'Failed to connect to server',
                'Could not connect to server.\r\n' +
                    'Possible typo or server is down?'
            );
        }

        // Successful

        onSet({
            ...serverInfo,
            userName: response.userName,
            userId: response.userId,
            userAccessToken: response.userAccessToken
        });
    };

    const handleSwitchServer = () => {
        onDelete();
    };

    return (
        <View style={{ paddingTop: useSafeAreaInsets().top, ...styles.root }}>
            <View style={styles.branding}>
                <Image source={require('src/assets/images/jellyfin_logo.png')} style={styles.image} />
                <Title>Jelly Mobile</Title>
            </View>


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
                mode='outlined'
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? 'Logging in' : 'Log in'}
            </Button>

            <Button
                mode='outlined'
                style={styles.button}
                onPress={handleSwitchServer}
                disabled={loading}
            >
                Switch server
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
    input: {
        width: '75%',
        marginVertical: 4,
        borderWidth: 0,
        backgroundColor: 'white'
    },
    button: {
        marginTop: 20
    }
});

export default UserLoginScreen;
