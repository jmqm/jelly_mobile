import { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';

type TProps = {
    title: string;
};

const SectionContainerComponent = (props: PropsWithChildren<TProps>) => {
    const { title, children } = props;

    const insertSpaces = (string: string) => {
        return string.replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    };

    return (
        <View style={styles.section}>
            <Title style={styles.title}>{insertSpaces(title)}</Title>

            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        paddingBottom: 16
    },
    title: {
        paddingBottom: 8
    }
});

export default SectionContainerComponent;
