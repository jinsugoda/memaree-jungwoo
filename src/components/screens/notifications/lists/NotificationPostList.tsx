import React, { useImperativeHandle, useState } from 'react';
import { ScrollView, View } from 'react-native';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { useMutation, useQuery } from '@apollo/client';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

// redux
import { selectUserId } from 'store/slices/userSlice';

// gpl queries
import {
    GET_NOTIFICATIONS,
    SET_NOTIFICATIONS_SEEN,
} from 'components/screens/notifications/gpl/query';

// custom components
import PostNotification from '../notificationListItems/PostNotification';
import PeopleNotification from '../notificationListItems/PeopleNotification';
import MemareeText from 'components/common/textAndInputs/MemareeText';

const NotificationPostList = ({ route }) => {
    const isFocused = useIsFocused();
    const { colors }: CustomTheme = useTheme();
    const [data, setData] = useState([]);
    const [updateOneNotification] = useMutation(SET_NOTIFICATIONS_SEEN);
    const [cleared, setCleared] = useState(false);
    let userID = useSelector(selectUserId);

    const {
        loading,
        error,
        data: NotificationList,
        refetch,
    } = useQuery(GET_NOTIFICATIONS, {
        variables: {
            query: {
                user: {
                    _id: userID,
                },
                seen: false,
            },
        },
        onCompleted: (newData) => {
            newData?.notifications !== undefined && setData(newData?.notifications);
        },
    });
    useFocusEffect(
        React.useCallback(() => {
            if (isFocused) {
                refetch();
                setCleared(false);
            }
        }, []),
    );
    const handleDeleteNotification = (id: string) => {
        route?.params?.refetching();
        updateOneNotification({
            variables: {
                set: {
                    seen: true,
                },
                query: {
                    _id: id,
                },
            },
        });
        const index = data.findIndex((item) => item?._id === id);
        const newData = [...data];
        index > -1 && newData?.splice(index, 1);
        setData(newData);
    };
    const handleChildFunction = () => {
        setCleared(true);
        refetch();
    };

    useImperativeHandle(route?.params?.ref, () => ({
        childFunction: handleChildFunction,
    }));
    if (loading) return <MemareeText>Loading...</MemareeText>;
    if (error) return <MemareeText>Error...</MemareeText>;

    return (
        <View
            style={{
                flex: 0,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                backgroundColor: colors.background,
            }}
        >
            <ScrollView style={{ backgroundColor: colors.background, width: '92%' }}>
                <View style={{ height: 20 }} />
                {data?.map((e, i) => {
                    if (
                        (e?.type === 'post-comment' ||
                            e?.type === 'reply-comment' ||
                            e?.type === 'remembered-post' ||
                            e?.type === 'new-post' ||
                            e?.type === 'new-group-post') &&
                        !e?.seen
                    ) {
                        return (
                            !cleared && (
                                <PostNotification
                                    key={e?._id}
                                    {...e}
                                    handleDeleteNotification={handleDeleteNotification}
                                />
                            )
                        );
                    } else if (e?.type === 'user-remember') {
                        return (
                            !cleared && (
                                <PeopleNotification
                                    key={e?._id}
                                    {...e}
                                    handleDeleteNotification={handleDeleteNotification}
                                />
                            )
                        );
                    }
                })}
            </ScrollView>
        </View>
    );
};

export default NotificationPostList;
