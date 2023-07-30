import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@rneui/base';

// types
import { RootStackParamList } from 'types/Screens';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomTheme } from 'styles/theme/customThemeProps';

// gpl queries
import { GET_GROUP_ALL, GroupPostsQry, GroupUsersQry } from './gpl/queries';

// 3rd party hooks
import { useQuery } from '@apollo/client';
import { useTheme } from 'react-native-paper';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';

// redux
import { selectUserId } from 'store/slices/userSlice';

// custom components
import ShareToYourGroup from 'components/screens/feed/emptyFeed/misc/ShareToYourGroup';
import FeedComponent from '../feed/composables/PostList';
import { LeaveButton } from 'components/common/buttons/other/Leave';
import { BackButton } from 'components/common/buttons/navigation/BackButton';
import { GradientAvatarSingleRow } from 'components/common/avatars/groups/singleAvatarsGroup/GradientAvatarSingleRow';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { ProfileStyles } from 'styles';
import { pageRoot, screenRoot } from 'styles/stylesheets/ScreenStyles';
import {
    DEV_WELCOME_GROUP_ID,
    PRD_WELCOME_GROUP_ID,
    STG_WELCOME_GROUP_ID,
} from '../../../../environment';

// constants
const USER_LIMIT = 10;
const POST_LIMIT = 10;
export const GroupsScreen = (props) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { colors }: CustomTheme = useTheme();

    const userID = useSelector(selectUserId);

    const [isFetchingMoreUsers, setIsFetchingMoreUsers] = useState(false);
    const [isFetchingMorePosts, setIsFetchingMorePosts] = useState(false);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const isFocused = useIsFocused();

    let lastScrollY = 0;

    const scrollY = useRef(new Animated.Value(0)).current;

    const headerTranslate = scrollY.interpolate({
        inputRange: [0, 90],
        outputRange: [0, -90],
        extrapolate: 'clamp',
    });

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }, // Animated.event() second argument
    );

    const usersInitialVariables = {
        input: {
            groupId: props?.route?.params?.groupId,
            limit: USER_LIMIT,
        },
    };

    const postInitialVariables = {
        input: {
            groupId: props?.route?.params?.groupId,
            limit: POST_LIMIT,
        },
    };

    const { data: usersData, fetchMore: usersFetchMore } = useQuery(GroupUsersQry, {
        variables: usersInitialVariables,
    });
    const { data: groupData } = useQuery(GET_GROUP_ALL, {
        variables: { query: { _id: props?.route?.params?.groupId } },
    });

    const {
        loading: postsLoading,
        error: postsError,
        data: postsData,
        fetchMore: postsFetchMore,
        refetch: postsRefetch,
    } = useQuery(GroupPostsQry, {
        variables: postInitialVariables,
        fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
        navigation.setOptions({
            headerTitle: props?.route?.params?.screenTitle,
            headerRight: () =>
                props?.route?.params?.owner?._id === userID ? (
                    <TouchableOpacity
                        style={{ marginRight: 15 }}
                        onPress={() => {
                            navigation.navigate('EditGroupScreen', {
                                name: props?.route?.params?.screenTitle,
                                groupId: props.route.params?.groupId,
                            });
                        }}
                    >
                        <Icon
                            type={'material-community'}
                            name="pencil-outline"
                            size={ProfileStyles.ProfileScreenIconSize}
                            color={colors.text}
                        />
                    </TouchableOpacity>
                ) : (
                    <LeaveButton groupId={props?.route?.params?.groupId} />
                ),
            // headerLeft: () => <BackButton />,
        });
    }, [
        props?.route?.params?.screenTitle,
        props?.route?.params?.owner,
        props?.route?.params?.groupId,
        userID,
    ]);

    useFocusEffect(
        React.useCallback(() => {
            if (isFocused) {
                postsRefetch();
            }
        }, []),
    );
    const users = usersData?.groupUsers;
    // Handlers
    const handleFetchMoreUsers = async () => {
        console.log('fetching more users???');
        if (isFetchingMoreUsers) {
            return;
        }
        if (
            groupData?._id === DEV_WELCOME_GROUP_ID ||
            groupData?._id === STG_WELCOME_GROUP_ID ||
            groupData?._id === PRD_WELCOME_GROUP_ID
        ) {
            setIsFetchingMoreUsers(false);
        }
        setIsFetchingMoreUsers(true);
        if (users?.length && users?.length < groupData?.group.userCount) {
            await usersFetchMore({
                variables: {
                    input: {
                        ...usersInitialVariables?.input,
                        _id_gt: users[users?.length - 1]._id,
                        limit: 5,
                    },
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult || fetchMoreResult?.groupUsers?.length === 0) {
                        return previousResult;
                    }
                    setIsFetchingMoreUsers(false);
                    return {
                        groupUsers: previousResult?.groupUsers?.concat(fetchMoreResult?.groupUsers),
                    };
                },
            });
        }
    };

    const handleFetchMorePosts = () => {
        if (isFetchingMorePosts) {
            return;
        }
        setIsFetchingMorePosts(true);
        if (postsData?.groupPosts && postsData?.groupPosts?.length && hasMorePosts) {
            postsFetchMore({
                variables: {
                    input: {
                        ...postInitialVariables?.input,
                        _id_lt: postsData?.groupPosts[postsData?.groupPosts?.length - 1]._id,
                    },
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (fetchMoreResult.groupPosts?.length < POST_LIMIT) {
                        setHasMorePosts(false);
                    }
                    if (!fetchMoreResult || fetchMoreResult?.groupPosts?.length === 0) {
                        return previousResult;
                    }
                    setIsFetchingMorePosts(false);
                    return {
                        groupPosts: [...previousResult?.groupPosts, ...fetchMoreResult?.groupPosts],
                    };
                },
            });
        }
    };

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 90],
        outputRange: [-90, 0],
        extrapolate: 'clamp',
    });
    const screenHeight = Dimensions.get('window').height;
    return (
        <View style={[pageRoot, { padding: 0, margin: 0 }]}>
            <Animated.View
                style={{
                    zIndex: 19,
                    transform: [{ translateY: headerTranslate }],
                }}
            >
                <View style={{ marginLeft: 10, marginBottom: -90, zIndex: 20 }}>
                    <MemareeText
                        style={{
                            color: colors.text,
                            marginLeft: 10,
                            fontSize: 14,
                        }}
                    >
                        {groupData?.group.userCount && `People (${groupData?.group?.userCount})`}
                    </MemareeText>
                    <View style={{ paddingBottom: 10, marginTop: -5 }}>
                        {usersData && (
                            <GradientAvatarSingleRow
                                users={users}
                                size={50}
                                borderWidth={5}
                                marginLeft={0}
                                handleFetchMore={handleFetchMoreUsers}
                            />
                        )}
                    </View>
                </View>
            </Animated.View>
            <View
                style={[
                    {
                        flex: 1,
                        // height:screenHeight,
                        flexGrow: 1,
                        paddingRight: 0,
                    },
                ]}
            >
                <FeedComponent
                    LiveOnScroll={handleScroll}
                    contentContainerStyle={{ zIndex: 1, paddingTop: 90 }}
                    columnCount={1}
                    posts={postsData?.groupPosts}
                    emptyComponent={
                        <ShareToYourGroup
                            groupName={` ${props?.route?.params?.screenTitle}` ?? ''}
                        />
                    }
                    openPostOptionsBottomSheet={props.route?.params?.openPostOptionsBottomSheet}
                    openSharePostBottomSheet={props.route?.params?.openSharePostBottomSheet}
                    loading={postsLoading} // only when NO posts are there, the loading icon is shown.
                    error={postsError?.message}
                    onFetchMore={handleFetchMorePosts}
                    onRefetch={postsRefetch}
                    inGroup={true}
                />
            </View>
        </View>
    );
};
