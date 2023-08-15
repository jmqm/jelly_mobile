import { View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

type TProps = {
    children?: never;
} & ViewProps

const Background = (props: TProps) => {
    const { style, ...otherProps } = props;

    const theme = useTheme();

    const customStyle: ViewStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.background
    };

    return (
        <View style={[customStyle, style]} {...otherProps} />
    );
};

export default Background;
