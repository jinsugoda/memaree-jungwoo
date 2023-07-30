import React from 'react';
import { Text, View } from 'react-native';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

interface OtherUserEmptyVisionProps {
    feedType: string;
}

export default function OtherUserEmptyVision({ feedType }: OtherUserEmptyVisionProps) {
    const { colors }: CustomTheme = useTheme();

    let feedLabel;

    switch (feedType) {
        case 'vision':
            feedLabel = 'Vision';
            break;
        case 'circle':
            feedLabel = 'Circle';
            break;
        default:
            break;
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 200,
            }}
        >
            <MemareeText style={{ color: colors.tertiary, fontSize: 24 }}>Nothing Here</MemareeText>
            <MemareeText>{``}</MemareeText>
            <View style={{ marginHorizontal: '15%' }}>
                <MemareeText style={{ color: colors.text, fontSize: 16, textAlign: 'center' }}>
                    Sorry, this user does not have any {feedLabel} posts to share.
                </MemareeText>
            </View>
        </View>
    );
}
