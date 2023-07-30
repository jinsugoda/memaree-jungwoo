import React from 'react';
import { Text, View } from 'react-native';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

export default function AddToYourVision() {
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
                Add to Your Vision
            </MemareeText>
            <MemareeText>{``}</MemareeText>
            <View style={{ marginHorizontal: '15%' }}>
                <MemareeText style={{ color: colors.text, fontSize: 16, textAlign: 'center', fontWeight: '500' }}>
                    Create a post and share it to your Vision feed
                </MemareeText>
            </View>
        </View>
    );
}
