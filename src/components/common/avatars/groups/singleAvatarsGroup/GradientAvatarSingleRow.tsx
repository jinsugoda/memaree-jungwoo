import React from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';

// 3rd party hooks
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

// redux
import { selectUserId } from 'store/slices/userSlice';

// custom components
import GradientAvatar from '../../single/GradientAvatar';
import MemareeText from 'components/common/textAndInputs/MemareeText';

type avatarUser = {
    _id: string;
    profilePicUrl: string;
    username: string;
};
type AvatarsData = {
    users: avatarUser[];
    size: number;
    borderWidth: number;
    marginLeft: number;
    handleFetchMore?: () => void;
};

const TRESHOLD = 0.5;

export const GradientAvatarSingleRow = ({ users, size, handleFetchMore }: AvatarsData) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const userId = useSelector(selectUserId);
    const { colors }: CustomTheme = useTheme();

    return (
        <>
            <FlatList
                data={users}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            key={item?._id}
                            style={{
                                flex: 0,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 10,
                                marginHorizontal: 10,
                            }}
                            onPress={() => {
                                if (userId === item?._id) {
                                    navigation.navigate('SelfProfileScreen');
                                } else {
                                    navigation.navigate('OtherProfileScreen', { id: item?._id });
                                }
                            }}
                        >
                            <GradientAvatar
                                key={item?._id}
                                source={item?.profilePicUrl}
                                size={size}
                            />
                            <MemareeText style={{ color: colors.text, fontSize: 11, marginTop: 3 }}>
                                {item?.username.length > 12
                                    ? item?.username?.substring(0, 9) + '...'
                                    : item?.username}
                            </MemareeText>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item?._id}
                scrollEventThrottle={16}
                onEndReached={handleFetchMore}
                onEndReachedThreshold={TRESHOLD}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </>
    );
};
