import { PropsWithChildren } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Title } from 'react-native-paper';

type TProps = {
    title: string;
    style?: StyleProp<ViewStyle>
};

const SectionContainerComponent = (props: PropsWithChildren<TProps>) => {
    const { title, style: propStyle, children } = props;

    const insertSpaces = (string: string) => {
        return string.replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    };

    return (
        <View style={[propStyle, styles.section]}>
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
        paddingHorizontal: 16,
        paddingBottom: 8
    }
});

export default SectionContainerComponent;
