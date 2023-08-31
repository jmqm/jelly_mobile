import { MD3DarkTheme, MD3Theme } from 'react-native-paper';

// https://callstack.github.io/react-native-paper/docs/guides/theming

const theme: MD3Theme = {
    ...MD3DarkTheme,

    version: 3,
    dark: true,
    mode: 'exact',

    roundness: 12,
    // spacing: 16,

    colors: {
        ...MD3DarkTheme.colors,

        primary: 'rgb(78, 218, 212)',
        onPrimary: 'rgb(0, 55, 53)',
        primaryContainer: 'rgb(0, 80, 77)',
        onPrimaryContainer: 'rgb(112, 247, 241)',

        secondary: 'rgb(176, 204, 201)',
        onSecondary: 'rgb(27, 53, 51)',
        secondaryContainer: 'rgb(50, 75, 74)',
        onSecondaryContainer: 'rgb(204, 232, 229)',

        tertiary: 'rgb(177, 201, 232)',
        onTertiary: 'rgb(26, 50, 75)',
        tertiaryContainer: 'rgb(49, 72, 98)',
        onTertiaryContainer: 'rgb(209, 228, 255)',

        background: 'rgb(25, 28, 28)',
        onBackground: 'rgb(224, 227, 226)',
        backdrop: 'rgba(41, 50, 49, 0.4)',

        surface: 'rgb(25, 28, 28)',
        onSurface: 'rgb(224, 227, 226)',
        surfaceVariant: 'rgb(63, 73, 72)',
        onSurfaceVariant: 'rgb(190, 201, 199)',
        surfaceDisabled: 'rgba(224, 227, 226, 0.12)',
        onSurfaceDisabled: 'rgba(224, 227, 226, 0.38)',

        inverseSurface: 'rgb(224, 227, 226)',
        inverseOnSurface: 'rgb(45, 49, 49)',
        inversePrimary: 'rgb(0, 106, 103)',

        outline: 'rgb(136, 147, 145)',
        outlineVariant: 'rgb(63, 73, 72)',

        shadow: 'rgb(0, 0, 0)',
        scrim: 'rgb(0, 0, 0)',

        error: 'rgb(255, 180, 171)',
        onError: 'rgb(105, 0, 5)',
        errorContainer: 'rgb(147, 0, 10)',
        onErrorContainer: 'rgb(255, 180, 171)',

        elevation: {
            level0: 'transparent',
            level1: 'rgb(28, 38, 37)',
            level2: 'rgb(29, 43, 43)',
            level3: 'rgb(31, 49, 48)',
            level4: 'rgb(31, 51, 50)',
            level5: 'rgb(32, 55, 54)'
        }
    }
};

export default theme;
