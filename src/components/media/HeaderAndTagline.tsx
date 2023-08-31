import MaskedView from '@react-native-masked-view/masked-view';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OpacityAnimation from 'src/components/animations/OpacityAnimation';
import MediaConstants from 'src/constants/Media';
import server$ from 'src/state/server/server$';
import CMedia from 'src/types/JellyfinAPI/media/CMedia';
import CMovie from 'src/types/JellyfinAPI/media/CMovie';

type TProps = {
    media: CMedia;
    imageType: 'Primary' | 'Backdrop'
};

const HeaderAndTaglineComponent = (props: TProps) => {
    const { media, imageType } = props;
    const { server } = server$.get();

    const [headerAnimate, setHeaderAnimate] = useState<boolean>(false);


    const statusBarHeight = useSafeAreaInsets().top;
    const hasTagline = media instanceof CMovie && media.tagline;

    const heroHeight = Math.min(
        Dimensions.get('window').width / (MediaConstants.backdrop.aspectRatio) + 25,
        Math.min(
            Dimensions.get('window').height * 0.3,
            300
        ));


    return (
        <>
            <View style={hasTagline ? styles.marginBottomHalf : styles.marginBottom}>
                <MaskedView maskElement={
                    <LinearGradient colors={['white', 'white', 'transparent']} style={styles.flex} />
                }>
                    <OpacityAnimation duration={250} animate={headerAnimate}>
                        <Image
                            source={`${server.address}/Items/${media.id}/Images/${imageType}?quality=60`}
                            style={{ height: heroHeight + statusBarHeight }}
                            contentFit='cover'
                            transition={100}
                            // onError={handleImageOnError}
                            onLoad={() => setHeaderAnimate(true)}
                            cachePolicy='memory-disk'
                        />
                    </OpacityAnimation>
                </MaskedView>

                <View style={[styles.headerTextContainer, styles.marginHorizontal]}>
                    <Text variant='headlineMedium' numberOfLines={2}>{media.name}</Text>

                    {media.originalName && media.originalName.toLowerCase().trim() !== media.name.toLowerCase().trim() && (
                        <Text variant='titleSmall' numberOfLines={2}>{media.originalName}</Text>
                    )}
                </View>
            </View>

            {hasTagline && (
                <Text variant='titleSmall' numberOfLines={3} style={[styles.tagline, styles.marginHorizontal, styles.marginBottom]}>
                    {media.tagline}
                </Text>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    headerTextContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    tagline: {
        opacity: 0.9
    },

    // Helpers
    flex: {
        flex: 1
    },
    marginHorizontal: {
        marginHorizontal: 16
    },
    marginBottom: {
        marginBottom: 20
    },
    marginBottomHalf: {
        marginBottom: 10
    }
});

export default HeaderAndTaglineComponent;
