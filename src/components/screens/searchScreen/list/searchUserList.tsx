import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem } from '@rneui/base';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// custom components
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';

// Icon
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectUserId } from 'store/slices/userSlice';
import MemareeText from 'components/common/textAndInputs/MemareeText';
import { useMutation } from '@apollo/client';

// utils error/ logging
import Logger, { ErrorType } from 'utils/logger';

import { REMEMBER_USER, UNREMEMBER_USER } from 'components/screens/profile/gpl/profileQueries';


const ProfileInteractionsButton={
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
    borderRadius: 10,
    paddingVertical: 8,
}

export const SearchUserList = ({ data, type, navigateToProfile }) => {
    const user = data.item;
    const { colors }: CustomTheme = useTheme();
    const userId = useSelector(selectUserId);
    const [remembered, setRemembered] = useState(data?.item?.isRemembered);
    
    const [rememberUserMutation, { error: rememberUserError }] = useMutation(REMEMBER_USER);
    const [unRememberUserMutation, { error: unRememberUserError }] = useMutation(UNREMEMBER_USER);

    // Handlers
    const rememberUser = async () => {
        try {
            const { data: dataRememberUser } = await rememberUserMutation({
                variables: { input: { userId: data?.item?._id } },
            });
            if (dataRememberUser?.rememberUser?.status === 'complete') {
                setRemembered(true);
            } else {
                console.error('ERROR', rememberUserError, dataRememberUser);
            }
        } catch (error) {
            console.error('ERROR', error);
            Logger(
                ErrorType.OTHER,
                'OtherProfileScreen',
                error,
                'src/components/screens/profile/screens/OtherProfileScreen.tsx',
                144,
                0,
                'Attempting to remember user.',
                { userId: data?.item?._id },
            );
        }
    };

    const unRememberUser = async () => {
        try {
            const { data: dataUnrememberUser } = await unRememberUserMutation({
                variables: { input: { userId: data?.item?._id } },
            });
            if (dataUnrememberUser?.unRememberUser?.status === 'complete') {
                setRemembered(false);
            } else {
                console.error('ERROR', unRememberUserError, dataUnrememberUser);
            }
        } catch (error) {
            console.error('ERROR', error);
            Logger(
                ErrorType.OTHER,
                'OtherProfileScreen',
                error,
                'src/components/screens/profile/screens/OtherProfileScreen.tsx',
                169,
                0,
                'Attempting to forget user.',
                { userId: data?.item?._id },
            );
        }
    };
    const UnRememberButton = () => {
        return (
            <TouchableOpacity
                style={[
                    ProfileInteractionsButton,
                    { backgroundColor: '#262A2A', marginRight: 0 },
                ]}
                onPress={() => unRememberUser()}
            >
                <MemareeText
                    style={{
                        fontSize: 12,
                        color: 'white',
                        width: 80,
                        textAlign: 'center',
                    }}
                >
                    Forget
                </MemareeText>
            </TouchableOpacity>
        );
    };

    const RememberButton = () => {
        return (
            <TouchableOpacity
                style={[
                    ProfileInteractionsButton,
                    { backgroundColor: colors.tertiary, marginRight: 0 },
                ]}
                onPress={() => rememberUser()}
            >
                {/* <ForgetButtonSVG fill="black" width={30} height={30}/> */}
                <MemareeText
                    style={{
                        fontSize: 12,
                        color: 'black',
                        width: 80,
                        textAlign: 'center',
                    }}
                >
                    Remember
                </MemareeText>
            </TouchableOpacity>
        );
    };
    
    return (
        <TouchableOpacity onPress={() => navigateToProfile(user)}>
            <ListItem
                containerStyle={{
                    paddingTop:
                        data.index === 0 && !(type === 'recent' || type === 'mayKnow') ? 25 : 6,
                    paddingBottom: 6,
                    backgroundColor: colors.background,
                }}
            >
                <GradientAvatar
                    source={user.profilePicUrl}
                    size={type === 'recent' || 'mayKnow' ? 50 : 50}
                />
                <ListItem.Content>
                    <ListItem.Title style={{ color: colors.text, fontFamily: 'Outfit-Bold' }}>
                        {user.username}
                    </ListItem.Title>
                </ListItem.Content>
                {   
                    data?.item?._id !== userId ? 
                        remembered ? <UnRememberButton /> : <RememberButton />
                        :
                        <List.Icon icon="greater-than" color={colors.text} />
                }
            </ListItem>
        </TouchableOpacity>
    );
};
