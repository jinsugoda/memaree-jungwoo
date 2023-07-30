import { fonts } from '@rneui/base';
import { DefaultTheme } from 'react-native-paper';
// const lightThemeColors {

// }

// const darkThemeColors {

// }

const theme = {
    // ...DefaultTheme,
    colors: {
        primary: '#273737',
        secondary: '#D0E6E6',
        tertiary: '#ffffff',
        accent: '',
        disabled: '#8E8E8E',
    },
    //Setting the svg icon color
    icons: {
        color: DefaultTheme.colors.primary,
    },
    //All the titles
    heading: {
        title: {
            color: {
                primary: DefaultTheme.colors.primary,
                secondary: DefaultTheme.colors.secondary,
                tertiary: DefaultTheme.colors.tertiary,
            },
            size: {
                h1: DefaultTheme.fonts.headlineLarge,
                h2: DefaultTheme.fonts.headlineMedium,
                h3: DefaultTheme.fonts.headlineSmall,
            },
        },
    },
    //Posts cards
    posts: {
        cards: {
            small: {
                roundness: 6,
                separator: {
                    color: '',
                    borderWith: 0,
                },
            },
            medium: {
                caption: DefaultTheme.fonts.labelSmall,
                fontSize: 11,
                roundness: 12,
                separator: {
                    color: 'F4F4F4',
                    borderWith: 2,
                },
            },
            large: {
                caption: DefaultTheme.fonts.titleMedium,
                fontSize: 14,
                roundness: 16,
                separator: {
                    color: 'F4F4F4',
                    borderWith: 2,
                },
            },
        },
    },
    //Filters
    filter: {
        roundness: 12,
        fontSize: 12,
        borderColor: '',
        border: 0,
        primary: {
            background: DefaultTheme.colors.primary,
            color: DefaultTheme.colors.tertiary,
        },
        secondary: {
            background: DefaultTheme.colors.secondary,
            color: DefaultTheme.colors.primary,
        },
    },
    //Buttons
    button: {
        roundness: 12,
        fontSize: 12,
        primary: {
            background: DefaultTheme.colors.primary,
            color: DefaultTheme.colors.tertiary,
            borderColor: '',
            border: 0,
        },
        secondary: {
            background: DefaultTheme.colors.secondary,
            color: DefaultTheme.colors.primary,
            borderColor: '',
            border: 0,
        },
        tertiary: {
            background: DefaultTheme.colors.tertiary,
            color: DefaultTheme.colors.primary,
            borderColor: DefaultTheme.colors.primary,
            border: 2,
        },
    },
    //Shadow effect
    shadow: {
        shadowOffset: {
            width: -4,
            height: 4,
        },
        shadowRadius: 8,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
    },
    // fonts: {
    //   // ios: {
    //   //   fontFamily: 'SF Pro',
    //   //   regular: {
    //   //     fontWeight: '600',
    //   //   },
    //   //   medium: {
    //   //     fontWeight: '700',
    //   //   },
    //   //   bold: {
    //   //     fontWeight: '800',
    //   //   },
    //   //   extrabold: {
    //   //     fontWeight: '900',
    //   //   },
    //   // },
    //  // android: {
    //     fontFamily: 'Ubuntu',
    //     regular: {
    //       fontWeight: '600',
    //     },
    //     medium: {
    //       fontWeight: '700',
    //     },
    //     bold: {
    //       fontWeight: '800',
    //     },
    //     extrabold: {
    //       fontWeight: '900',
    //     },
    //  // },
    // }
};

export default theme;
