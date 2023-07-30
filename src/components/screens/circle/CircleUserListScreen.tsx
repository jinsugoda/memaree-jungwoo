import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { ListItem } from '@rneui/base';

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

// gpl queries
import {
    GET_CIRCLE_USERS,
    GET_REMEMBERED_USERS,
    GET_REMEMBERING_USERS,
} from 'queries/circle/circle';

// redux
import { useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { selectUserId } from 'store/slices/userSlice';

// custom compoentns
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';

// constants
const SIZE = 50;

const CircleUserListScreen = ({ route }) => {
    const { colors }: CustomTheme = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [userDataList, setUserDataList] = useState([]);
    const userId = useSelector(selectUserId);

    const [friendLinks, { refetch: refetchCircle }] = useLazyQuery(GET_CIRCLE_USERS);
    const [rememberedUsers, { refetch: refetchRemembering }] = useLazyQuery(GET_REMEMBERING_USERS);
    const [rememberingUsers, { refetch: refetchRemembered }] = useLazyQuery(GET_REMEMBERED_USERS);

    useEffect(() => {
        if (route?.params?.screenTitle === 'Circle') {
            friendLinks({
                variables: {
                    query: {
                        userId: {
                            _id: userId,
                        },
                    },
                },
                onCompleted: (newData) => {
                    newData?.friendLinks !== undefined && updateData(newData?.friendLinks);
                },
            });
            // if (userError) return <Text>Error...</Text>
            // else{}
        } else if (route?.params?.screenTitle === 'Remembered By') {
            rememberedUsers({
                variables: {
                    query: {
                        friendId: {
                            _id: userId,
                        },
                    },
                },
                onCompleted: (newData) => {
                    newData?.rememberedUsers !== undefined && updateData(newData?.rememberedUsers);
                },
            });
        } else if (route?.params?.screenTitle === 'Remembering') {
            rememberingUsers({
                variables: {
                    query: {
                        userId: {
                            _id: userId,
                        },
                    },
                },
                onCompleted: (newData) => {
                    newData?.rememberedUsers !== undefined && updateData(newData?.rememberedUsers);
                },
            });
        }
    }, []);

    const updateData = useCallback(
        (list) => {
            setUserDataList([...list]);
        },
        [setUserDataList],
    );

    const isFocused = useIsFocused();
    useFocusEffect(
        React.useCallback(() => {
            if (isFocused) {
                if (route?.params?.screenTitle === 'Circle') {
                    refetchCircle();
                } else if (route?.params?.screenTitle === 'Remembered By') {
                    refetchRemembering();
                } else if (route?.params?.screenTitle === 'Remembering') {
                    refetchRemembered();
                }
            }
        }, []),
    );

    const renderItem = (user) => {
        if (route?.params?.screenTitle === 'Circle') {
            if (!user?.item?.friendId?._id) {
                return null;
            }
            return (
                <ListItem
                    key={'l' + user?.item?.friendId?._id}
                    containerStyle={{
                        paddingVertical: 6,
                        backgroundColor: colors.background,
                    }}
                >
                    <TouchableOpacity
                        key={'t' + user?.item?.friendId?._id}
                        onPress={() => {
                            if (userId === user?.item?.friendId?._id) {
                                navigation.navigate('SelfProfileScreen');
                            } else {
                                navigation.navigate('OtherProfileScreen', {
                                    id: user?.item?.friendId?._id,
                                });
                            }
                        }}
                    >
                        <GradientAvatar
                            key={'gr' + user?.item?.friendId?._id}
                            source={user?.item?.friendId?.profilePicUrl}
                            size={SIZE}
                        />
                    </TouchableOpacity>
                    <ListItem.Content key={'li' + user?.item?.friendId?._id}>
                        <ListItem.Title style={{ color: colors.text, fontFamily: 'Outfit-Bold' }}>
                            {user?.item?.friendId?.username}
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            );
        } else if (route?.params?.screenTitle === 'Remembering') {
            if (!user?.item?.friendId?._id) {
                return null;
            }
            return (
                <ListItem
                    key={'l' + user?.item?.friendId?._id}
                    containerStyle={{
                        paddingVertical: 6,
                        backgroundColor: colors.background,
                    }}
                >
                    <TouchableOpacity
                        key={'t' + user?.item?.friendId?._id}
                        onPress={() => {
                            if (userId === user?.item?.friendId?._id) {
                                navigation.navigate('SelfProfileScreen');
                            } else {
                                navigation.navigate('OtherProfileScreen', {
                                    id: user?.item?.friendId?._id,
                                });
                            }
                        }}
                    >
                        <GradientAvatar
                            key={'gr' + user?.item?.friendId?._id}
                            source={user?.item?.friendId?.profilePicUrl}
                            size={SIZE}
                        />
                    </TouchableOpacity>
                    <ListItem.Content key={'li' + user?.item?.friendId?._id}>
                        <ListItem.Title style={{ color: colors.text, fontFamily: 'Outfit-Bold' }}>
                            {user?.item?.friendId?.username}
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            );
        } else if (route?.params?.screenTitle === 'Remembered By') {
            if (!user?.item?.userId?._id) {
                return null;
            }
            return (
                <ListItem
                    key={'l' + user?.item?.userId?._id}
                    containerStyle={{
                        paddingVertical: 6,
                        backgroundColor: colors.background,
                    }}
                >
                    <TouchableOpacity
                        key={'t' + user?.item?.userId?._id}
                        onPress={() => {
                            if (userId === user?.item?.userId?._id) {
                                navigation.navigate('SelfProfileScreen');
                            } else {
                                navigation.navigate('OtherProfileScreen', {
                                    id: user?.item?.userId?._id,
                                });
                            }
                        }}
                    >
                        <GradientAvatar
                            key={'gr' + user?.item?.userId?._id}
                            source={user?.item?.userId?.profilePicUrl}
                            size={SIZE}
                        />
                    </TouchableOpacity>
                    <ListItem.Content key={'li' + user?.item?.userId?._id}>
                        <ListItem.Title style={{ color: colors.text, fontFamily: 'Outfit-Bold' }}>
                            {user?.item?.userId?.username}
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            );
        }
    };

    return (
        <FlatList
            style={{ backgroundColor: colors.background, width: '100%' }}
            data={userDataList}
            renderItem={renderItem}
            keyExtractor={(item) => item?._id}
            extraData={userDataList}
        />
    );
};
export default CircleUserListScreen;
