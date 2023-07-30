import { DefaultTheme } from 'react-native-paper';
import { CustomTheme } from './customThemeProps';

const green = '#6CF3F6';
const blue = '#BEF43E';
const pink = '#FC9DED';

export const darkTheme: CustomTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
        ...DefaultTheme.colors,
        primary: blue,
        secondary: pink,
        tertiary: green,
        background: '#070808',
        shadow: 'transparent',
        text: '#ffff',
        outline: '#23292A',
        card: '#151818',
        border: '#fff',
        notification: '#fff',
        tab: '#49E2F7',
        defaultButtonBackground: '#cfdfe8',
    },
    roundness: 12,
};

export default darkTheme;
