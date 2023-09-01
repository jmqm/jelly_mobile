import type TMedia from 'src/types/jellyfin/media/TMedia';

type TMovie = TMedia & {
    // Fields
    tagline: string;
};

export default TMovie;
