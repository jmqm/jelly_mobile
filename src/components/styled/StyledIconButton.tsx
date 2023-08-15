import { ViewStyle } from 'react-native';
import { IconButton, IconButtonProps } from 'react-native-paper';

type TProps = {

} & IconButtonProps

const StyledIconButton = (props: TProps) => {
    const { style, ...otherProps } = props;

    const customStyle: ViewStyle = {
        margin: 0
    };

    return (
        <IconButton style={[customStyle, style]} {...otherProps} />
    );
};

export default StyledIconButton;
