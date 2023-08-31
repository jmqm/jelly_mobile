import { View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

type TProps = {
    children?: never;
    colour?: string;
} & ViewProps

const Background = (props: TProps) => {
    const { colour, style, ...otherProps } = props;

    const theme = useTheme();

    const customStyle: ViewStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: colour ?? theme.colors.background
    };

    return (
        <View style={[customStyle, style]} {...otherProps} />
    );
};

export default Background;
