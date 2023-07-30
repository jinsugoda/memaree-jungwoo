import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// types
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// custom components
import NotificationPostList from './lists/NotificationPostList';
import NotificationPeopleList from './lists/NotificationPeopleList';

// 3rd party hooks
import { useTheme } from 'react-native-paper';
import { useMutation, useQuery } from '@apollo/client';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

// gpl queries
import { CLEAR_NOTIFICATIONS, GET_NOTIFICATIONS_COUNT } from './gpl/query';

// styles
import { LaneStyles } from 'styles';

// svgs
import UpdatesLabelSVG from 'assets/tabBarSVGs/updatesLabel.svg';
import RequestsLabelSVG from 'assets/tabBarSVGs/requestsLabel.svg';

import UpdatesLabelAlertSVG from 'assets/tabBarSVGs/updatesLabelAlert.svg';
import RequestsLabeAlertSVG from 'assets/tabBarSVGs/requestsLabelAlert.svg';

const Tab = createMaterialTopTabNavigator();

type NotificationScreenProps = NativeStackScreenProps<RootStackParamList, 'NotificationScreen'>;
const NotificationScreen = (props: NotificationScreenProps) => {
    const isFocused = useIsFocused();
    const { colors }: CustomTheme = useTheme();
    const [currentScreen, setCurrentScreen] = useState('update');
    // const dispatch = useDispatch();
    const { loading, error, data, refetch } = useQuery(GET_NOTIFICATIONS_COUNT);
    const [updateManyNotifications] = useMutation(CLEAR_NOTIFICATIONS);
    const peopleListRef = useRef(null);
    const postListRef = useRef(null);
    const clearNotification = useCallback(() => {
        if (currentScreen === 'update') {
            updateManyNotifications({
                variables: {
                    set: {
                        seen: true,
                    },
                    query: {
                        AND: [
                            { user: { _id: '645d282e4a3fc06bf1625836' } },
                            { seen: false },
                            {
                                OR: [
                                    { type: 'post-comment' },
                                    { type: 'post-comment' },
                                    { type: 'remembered-post' },
                                ],
                            },
                        ],
                    },
                },
                onCompleted: () => {
                    refetching();
                    postListRef.current.childFunction();
                },
            });
        } else if (currentScreen === 'request') {
            updateManyNotifications({
                variables: {
                    set: {
                        seen: true,
                    },
                    query: {
                        AND: [
                            { user: { _id: '645d282e4a3fc06bf1625836' } },
                            { seen: false },
                            {
                                OR: [{ type: 'add-to-circle' }, { type: 'add-to-group' }],
                            },
                        ],
                    },
                },
                onCompleted: () => {
                    refetching();
                    peopleListRef.current.childFunction();
                },
            });
        }
    }, [currentScreen]);

    //// COMMENTED OUT TEMPORARILY ////
    // useEffect(() => {
    //     const unsubscribe = props.navigation.setOptions({
    //         headerRight: () =>
    //             <OverflowMenu
    //             OverflowIcon={() => <Ionicons color ={colors.text} name="ellipsis-horizontal" size={18} />}>
    //                 <HiddenItem title="clear" onPress={clearNotification} />
    //             </OverflowMenu>
    //         });
    //     return () => {
    //         unsubscribe;
    //     }
    // }, [clearNotification])

    useFocusEffect(
        useCallback(() => {
            if (isFocused) {
                refetch();
            }
        }, [data]),
    );

    const refetching = () => {
        refetch();
    };

    return (
        <SafeAreaView style={LaneStyles.container}>
            <View style={LaneStyles.tabContainer} collapsable={false}>
                <Tab.Navigator
                    initialRouteName="Updates"
                    backBehavior={'firstRoute'}
                    screenOptions={({ route }) => ({
                        tabBarIndicatorStyle: {
                            borderColor: colors.tab,
                            borderWidth: 2,
                        },
                        headerTitleStyle: {
                            fontFamily: 'Outfit-Bold',
                            color: colors.text,
                        },
                        tabBarActiveTintColor: colors.tertiary,
                        tabBarInactiveTintColor: colors.text,
                        tabBarLabelStyle: {
                            fontFamily: 'Outfit-Bold',
                        },
                        tabBarIconStyle: {
                            alignItems: 'center',
                        },
                        tabBarShowLabel: false,
                        cardStyle: { backgroundColor: colors.background },
                        presentation: 'transparentModal',
                    })}
                >
                    <Tab.Screen
                        name="Updates"
                        component={NotificationPostList}
                        options={{
                            tabBarStyle: { backgroundColor: colors.background },
                            tabBarIcon: (props) => {
                                return data?.getEachNotificationGroupCount.Post ? (
                                    <UpdatesLabelAlertSVG
                                        style={{ marginLeft: 2 }}
                                        fill={props.color}
                                    />
                                ) : (
                                    <UpdatesLabelSVG fill={props.color} />
                                );
                            },
                        }}
                        listeners={() => ({
                            focus: () => {
                                setCurrentScreen('update');
                            },
                        })}
                        initialParams={{ refetching: refetching, ref: postListRef }}
                    />
                    <Tab.Screen
                        name="Requests"
                        component={NotificationPeopleList}
                        options={{
                            tabBarStyle: { backgroundColor: colors.background },
                            tabBarIcon: (props) => {
                                return data?.getEachNotificationGroupCount.People ? (
                                    <RequestsLabeAlertSVG
                                        style={{ marginLeft: 4 }}
                                        fill={props.color}
                                    />
                                ) : (
                                    <RequestsLabelSVG fill={props.color} />
                                );
                            },
                        }}
                        listeners={() => ({
                            focus: () => {
                                setCurrentScreen('request');
                            },
                        })}
                        initialParams={{
                            refetching: refetching,
                            ref: peopleListRef,
                            refetchTotal: refetch,
                        }}
                    />
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    );
};

export default NotificationScreen;
