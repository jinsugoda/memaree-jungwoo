import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

// types
import { RootStackParamList } from 'types/Screens';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';
import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

// redux
import { useSelector } from 'react-redux';
import { selectUserId } from 'store/slices/userSlice';

export const REMOVE_FROM_GROUP = gql`
    mutation RemoveUserFromGroup($groupId: String!, $userId: String!) {
        removeFromArrayIDField(
            input: { collectionName: "Group", id: $groupId, field: "users", value: $userId }
        ) {
            status
        }
    }
`;
export const REMOVE_FROM_USER = gql`
    mutation RemoveGroupFromUser($groupId: String!, $userId: String!) {
        removeFromArrayIDField(
            input: { collectionName: "User", id: $userId, field: "groups", value: $groupId }
        ) {
            status
        }
    }
`;

export const LeaveButton = ({ groupId }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { colors }: CustomTheme = useTheme();
    const [removeUserFromGroup] = useMutation(REMOVE_FROM_GROUP);
    const [removeGroupFromUser] = useMutation(REMOVE_FROM_USER);
    const userID = useSelector(selectUserId);

    const leaving = async () => {
        console.log('group id', groupId);
        let group;
        try {
            group = await removeUserFromGroup({
                variables: {
                    groupId: groupId,
                    userId: userID,
                },
            });
        } catch (error) {
            console.log;
        }
        const User = await removeGroupFromUser({
            variables: {
                groupId: groupId,
                userId: userID,
            },
        });

        if (User && group) navigation.goBack();
    };
    return (
        <TouchableOpacity onPress={() => leaving()}>
            <MemareeText style={{ color: colors.text, paddingRight: 15 }}>Leave Group</MemareeText>
        </TouchableOpacity>
    );
};
