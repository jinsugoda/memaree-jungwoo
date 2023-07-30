import React from 'react';
import { View, Text } from 'react-native';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

// svg icons
import RememberButtonSVG from 'assets/buttonIcons/interactions/RememberIcon.svg';

export default function AddToYourMemaree() {
    const { colors }: CustomTheme = useTheme();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 200,
            }}
        >
            <MemareeText style={{ color: colors.tertiary, fontSize: 24 }}>
                Add to Your Memaree
            </MemareeText>
            <MemareeText>{``}</MemareeText>
            <View style={{ marginHorizontal: '15%' }}>
                <MemareeText style={{ color: colors.text, fontSize: 16, textAlign: 'center', fontWeight: '500' }}>
                    Create a Post or{' '}
                    <RememberButtonSVG
                        width={16}
                        height={16}
                        fill="white"
                        stroke={'white'}
                        strokeWidth={0.1}
                        style={{ paddingHorizontal: 23 }}
                    />{'  '}
                    Remember a Post to see it on your Memaree Feed.
                </MemareeText>
            </View>
        </View>
    );
}
