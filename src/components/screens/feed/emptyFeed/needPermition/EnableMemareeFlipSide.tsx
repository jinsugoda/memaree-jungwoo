import React from 'react';
import { View} from 'react-native';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

export default function EnableMemareeFlipSide() {
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
            <MemareeText style={{ color: colors.text, fontSize: 16, fontWeight: '500', width: "90%" }}>
            {[
                `To optimize your app experience, please enable your location settings.
                `,
                `"Memaree uses your location to match you with relevant content in your area.
                `,
                `Navigate to Settings > Location Services`
            ].join('\n')}
            </MemareeText>
        </View>
    );
}
