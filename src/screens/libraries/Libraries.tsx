import { useState } from 'react';
import { Text } from 'react-native';
import TUserViews from 'src/types/JellyfinAPI/TUserViews';

const LibrariesScreen = () => {
    const [libraryOrder, setLibraryOrder] = useState<TUserViews>();

    return (
        <>
            <Text>Libraries</Text>
        </>
    );
};

export default LibrariesScreen;
