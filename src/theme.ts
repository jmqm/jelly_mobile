import { DefaultTheme } from 'react-native-paper';

const theme: ReactNativePaper.Theme = {
    // ...DarkTheme,
    // dark: true,
    ...DefaultTheme,

    roundness: 14,
    spacing: 12,

    colors: {
        // ...DarkTheme.colors,
        ...DefaultTheme.colors,

        primary: '#a487db'
        // background: '#566168'
    }
};

export default theme;



// import { MD3DarkTheme as DarkTheme } from 'react-native-paper';

// const theme = {
//     ...DarkTheme,
//     dark: true,

//     roundness: 14,
//     spacing: 12,

//     colors: {
//         ...DarkTheme.colors,

//         primary: '#a487db',
//         background: '#566168'
//     }
// };

// export default theme;
