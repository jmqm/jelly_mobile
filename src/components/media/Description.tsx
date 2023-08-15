import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';
import { removeHtmlTags } from 'src/utilities/General';

type TProps = {
    media: CMedia;
};

const DescriptionComponent = (props: TProps) => {
    const { media } = props;

    const hasDescription = media.description;

    return (
        <Text
            variant='bodyMedium'
            style={[
                hasDescription ? null : { fontStyle: 'italic' },
                styles.description,
                styles.marginHorizontal,
                styles.marginBottom
            ]}
        >
            {hasDescription && (removeHtmlTags(media.description).trim())}
            {!hasDescription && 'No description'}
        </Text>
    );
};

const styles = StyleSheet.create({
    description: {
        maxHeight: 1000
    },
    marginHorizontal: {
        marginHorizontal: 16
    },
    marginBottom: {
        marginBottom: 20
    }
});

export default DescriptionComponent;
