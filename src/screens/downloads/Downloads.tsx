import { useState } from 'react';
import { StyleSheet, Switch as SwitchRN, View } from 'react-native';
import { Switch as SwitchRNP, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Background from 'src/components/styled/Background';

const DownloadsScreen = () => {
    const [on, setOn] = useState<boolean>(false);

    const paddingTop = useSafeAreaInsets().top;

    return (
        <>
            <Background />

            <View style={[{ paddingTop: paddingTop }, styles.root]}>
                <Text>Downloads</Text>
                <SwitchRN value={on} onChange={() => setOn((prev) => !prev)} />
                <SwitchRNP value={on} onChange={() => setOn((prev) => !prev)} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        marginTop: 16,
        marginHorizontal: 16,
        flexDirection: 'column',
        gap: 8
    }
});

export default DownloadsScreen;
