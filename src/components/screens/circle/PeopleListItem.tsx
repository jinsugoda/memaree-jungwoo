import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '@rneui/base';
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';
import MemareeText from 'components/common/textAndInputs/MemareeText';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectUserId } from 'store/slices/userSlice';
import { CustomTheme } from 'styles/theme/customThemeProps';
import { RootStackParamList } from 'types/Screens';
import { ShorttenText } from 'utils/customFormatters';

export default function PeopleListItem({ user }) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const userId = useSelector(selectUserId);

    const { colors }: CustomTheme = useTheme();

    const { _id, username, profilePicUrl } = user;

    const handlePressAvatar = () => {
        if (userId === _id) {
            navigation.navigate('SelfProfileScreen');
        } else {
            navigation.navigate('OtherProfileScreen', {
                id: _id,
            });
        }
    };

    const handlePressMessage = () => {
        // TODO redirect to message
        console.log('Redirect to message');
    };

    return (
        <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={handlePressAvatar}
            >
                <GradientAvatar
                    size={60}
                    source={profilePicUrl ?? 'DEFAULT'}
                    style={{ marginRight: 12 }}
                />
                <MemareeText style={[{ color: colors.text }]}>
                    {username ? ShorttenText(username, 20) : 'placeholder_username'}
                </MemareeText>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePressMessage}>
                <Icon
                    color={colors.tertiary}
                    type="material"
                    name="chat-bubble-outline"
                    size={24}
                />
            </TouchableOpacity>
        </View>
    );
}
