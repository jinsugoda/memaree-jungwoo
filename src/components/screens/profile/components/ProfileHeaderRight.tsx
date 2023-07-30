import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from '@rneui/base';

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// styles
import { ProfileStyles } from 'styles';
import { Ionicons } from '@expo/vector-icons';

interface ProfileHeaderRight {
    isCurrentUser: boolean;
    bottomSheetRef: any;
}

const ProfileHeaderRight = (props: ProfileHeaderRight) => {
    const { colors }: CustomTheme = useTheme();

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
                style={ProfileStyles.profileHeaderRightIcon}
                onPress={() => navigation.navigate('PeopleScreen')}
            >
                <Icon
                    color={colors.text}
                    type="material"
                    name="group"
                    size={ProfileStyles.ProfileScreenIconSize}
                    // style={{ style: 'outline' }}
                />
            </TouchableOpacity>
            {props?.isCurrentUser ? (
                <TouchableOpacity
                    style={ProfileStyles.profileHeaderRightIcon}
                    onPress={() => navigation.navigate('SettingsScreen')}
                >
                    <Icon
                        color={colors.text}
                        type="material"
                        name="menu"
                        size={ProfileStyles.ProfileScreenIconSize}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={ProfileStyles.profileHeaderRightIcon}
                    onPress={() => props?.bottomSheetRef.current?.expand()}
                >
                    <Icon
                        color={colors.text}
                        type="material"
                        name="menu"
                        size={ProfileStyles.ProfileScreenIconSize}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ProfileHeaderRight;
