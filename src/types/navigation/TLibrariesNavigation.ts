import type TMediaNavigation from 'src/types/navigation/TMediaNavigation';

type TLibrariesNavigation = {
    Libraries: undefined;
    Library: { id: string, name: string };
} & TMediaNavigation;

export default TLibrariesNavigation;
