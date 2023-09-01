import type TMediaNavigation from 'src/types/navigation/TMediaNavigation';

type TLibrariesNavigation = TMediaNavigation & {
    Libraries: undefined;
    Library: { id: string, name: string };
};

export default TLibrariesNavigation;
