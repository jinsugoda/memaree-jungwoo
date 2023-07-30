import React from 'react';
import { View } from 'react-native';
import { userListContainerStyle } from './PeopleStyles';
import PeopleList from './PeopleList';
import { useQuery } from '@apollo/client';
import { GET_REMEMBERING_USERS } from 'queries/circle/circle';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectUserId } from 'store/slices/userSlice';

export default function RememberedByUserList({ searchString }) {
    const userId = useSelector(selectUserId);

    const { data, loading } = useQuery(GET_REMEMBERING_USERS, {
        variables: {
            query: {
                friendId: {
                    _id: userId,
                },
            },
        },
    });

    if (loading) {
        return (
            <View style={[userListContainerStyle, { justifyContent: 'center' }]}>
                <ActivityIndicator />
            </View>
        );
    }

    let rememberedByUsers = data.rememberedUsers
        .filter((link) => !!link?.userId)
        .map(({ userId }) => userId);

    if (searchString) {
        rememberedByUsers = rememberedByUsers.filter(({ username }: { username: string }) =>
            username.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()),
        );
    }

    return <PeopleList data={rememberedByUsers} />;
}
