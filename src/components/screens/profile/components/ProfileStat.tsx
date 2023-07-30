import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { ProfileStyles } from 'styles';

interface ProfileStatInterface {
    title: string;
    num: number;
    onClick: Function;
}

const ProfileStat = (props: ProfileStatInterface) => {
    const { colors }: CustomTheme = useTheme();
    return (
        <TouchableOpacity
            style={ProfileStyles.profileStatTouchableOpacity}
            onPress={() => props?.onClick}
        >
            <MemareeText style={[ProfileStyles.profileStatText, { color: colors.text }]}>
                {props?.num}
            </MemareeText>
            <MemareeText style={[ProfileStyles.subStatsTitle, { color: colors.text }]}>
                {props?.title}
            </MemareeText>
        </TouchableOpacity>
    );
};
export default ProfileStat;
