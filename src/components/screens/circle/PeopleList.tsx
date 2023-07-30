import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import PeopleListItem from './PeopleListItem';
import { Divider } from 'react-native-paper';
import { userListContainerStyle } from './PeopleStyles';
import { View } from 'react-native';

export default function PeopleList({ data }) {
    return (
        <FlatList
            style={userListContainerStyle}
            data={data}
            renderItem={({ item }) => <PeopleListItem user={item} />}
            ItemSeparatorComponent={() => <View style={{ marginVertical: 12 }} />}
        />
    );
}
