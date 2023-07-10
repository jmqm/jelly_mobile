import { Dimensions } from 'react-native';
import MediaConstants from 'src/constants/Media';

export const getRecommendedPosterWidthSize = () => {
    const windowWidth = Dimensions.get('window').width;
    const recommendedWidth = windowWidth * 0.364;

    return Math.min(recommendedWidth, MediaConstants.poster.maxWidth);
};

export const getRecommendedThumbnailWidthSize = () => {
    const recommendedWidth = getRecommendedPosterWidthSize() * 1.584;

    return Math.min(recommendedWidth, MediaConstants.thumbnail.maxWidth);
};
