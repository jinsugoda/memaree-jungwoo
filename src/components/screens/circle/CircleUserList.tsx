import React from 'react';
import { View } from 'react-native';
import { userListContainerStyle } from './PeopleStyles';
import PeopleList from './PeopleList';
import { useQuery } from '@apollo/client';
import { GET_CIRCLE_USERS } from 'queries/circle/circle';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectUserId } from 'store/slices/userSlice';

export default function CircleUserList({ searchString }) {
    const userId = useSelector(selectUserId);

    const { data, loading, refetch } = useQuery(GET_CIRCLE_USERS, {
        variables: {
            query: {
                userId: {
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

    let friends = data.friendLinks
        .filter((link) => !!link?.friendId)
        .map(({ friendId }) => friendId);

    if (searchString) {
        friends = friends.filter(({ username }: { username: string }) =>
            username.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()),
        );
    }

    return <PeopleList data={friends} />;
}
