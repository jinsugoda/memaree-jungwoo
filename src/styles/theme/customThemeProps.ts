import { MD3Theme } from 'react-native-paper';

// export interface CustomTheme extends MD3Theme {
//   colors: {
//     text: string;
//   } & MD3Theme['colors'];
// }
export interface CustomTheme extends MD3Theme {
    colors: {
        primary: string;
        secondary: string;
        tertiary: string;
        background: string;
        text: string;
        outline: string;
        shadow: string;
        notification: string;
        card: string;
        border: string;
        tab: string;
        defaultButtonBackground: string;
    } & MD3Theme['colors'];
    roundness: number;
}
