import { DefaultTheme } from 'react-native-paper';
import { CustomTheme } from './customThemeProps';

export const customDefaultTheme: CustomTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#6CF3F6',
        secondary: '#FC9DED',
        tertiary: '#BEF43E',
        background: '#fff',
        text: '#1C1B1F',
        outline: '#D0E6E6',
        shadow: 'transparent',
        notification: '#fff',
        card: '#fff',
        border: '#fff',
        tab: '#49E2F7',
        defaultButtonBackground: '#cfdfe8',
    },
    roundness: 12,
};

export default customDefaultTheme;
