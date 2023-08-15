import { Image } from 'expo-image';
import { Dimensions, StyleSheet } from 'react-native';
import OpacityAnimation from 'src/components/animations/OpacityAnimation';

type TProps = {
    opacity?: number;
};

const defaults: TProps = {
    opacity: 0.1
};

const TopographyPattern = (props: TProps) => {
    const { opacity } = {  ...defaults, ...props };

    const { width, height } = Dimensions.get('window');

    return (
        <OpacityAnimation duration={1000}>
            <Image
                source={require('src/assets/patterns/topography1.svg')}
                contentPosition='center'
                contentFit='cover'
                style={[{ width: width, height: height }, { opacity: opacity }, styles.pattern]}
            />
        </OpacityAnimation>
    );
};

const styles = StyleSheet.create({
    pattern: {
        position: 'absolute',
        top: 0,
        left: 0
    }
});

export default TopographyPattern;

// Source: https://buntinglabs.com/tools/download-topo-map-contour-lines
