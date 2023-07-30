import React, { useState } from 'react';
import { FlatList } from 'react-native';
// types
import { RootStackParamList } from 'types/Screens';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { useMutation, useQuery } from '@apollo/client';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';

// custom components
import { SuggestedUsersScreen } from './suggestedUsersScreen';

// gpl queries
import {
    SEARCH_USERS,
    USERS_RECENT,
    UPDATE_RECENT_SEARCH,
    USERS_SUGGESTIONS,
} from 'components/screens/searchScreen/gpl/search';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// Icon
import { selectUserId } from 'store/slices/userSlice';
import { SearchUserList } from './list/searchUserList';

const USER_LIMIT = 10;

export const UserListSearchScreen = () => {
    const { colors }: CustomTheme = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const userId = useSelector(selectUserId);

    let userInput = useSelector(
        (state: { search: { userInput: string } }) => state?.search?.userInput,
    );
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const {
        loading: loadingSuggestion,
        error: errorSuggestion,
        data: suggestedDataList,
        refetch,
        fetchMore,
    } = useQuery(USERS_SUGGESTIONS, {
        variables: {
            input: {
                limit: USER_LIMIT,
            },
        },
    });

    const {
        loading: userLoading,
        error: userError,
        data: userData,
    } = useQuery(SEARCH_USERS, {
        variables: { input: userInput.toLowerCase() },
        fetchPolicy: 'network-only',
        skip: userInput === '',
    });
    const [updateOneUser, { error: errorLazy }] = useMutation(UPDATE_RECENT_SEARCH);
    const {
        loading: loadingRecent,
        error: errorRecent,
        data: suggestedRecent,
        refetch: refetchRecent,
    } = useQuery(USERS_RECENT);

    const navigateToProfile = async (user) => {
        // update recent before navigation
        navigation.navigate('OtherProfileScreen', { id: user?._id });
        const tempSuggestedRecent = [];

        suggestedRecent?.getRecentUserSearch?.forEach((element) => {
            tempSuggestedRecent.push(element?._id);
        });

        // Checks for duplicate and max number
        if (!tempSuggestedRecent.includes(user?._id)) {
            tempSuggestedRecent.unshift(user?._id);
            while (tempSuggestedRecent.length > 3) {
                tempSuggestedRecent.pop();
            }

            updateOneUser({
                variables: {
                    set: {
                        recentSearch: { link: tempSuggestedRecent },
                    },
                    query: {
                        _id: userId,
                    },
                },
            });
            if (errorLazy) {
                console.log(errorLazy);
            }
        }
    };
    const isFocused = useIsFocused();
    useFocusEffect(
        React.useCallback(() => {
            if (isFocused) {
                refetchRecent();
                refetch();
                setHasMore(true);
                setIsFetchingMore(false);
            }
        }, []),
    );
    const onFetchMore = () => {
        if (isFetchingMore) {
            return;
        }
        setIsFetchingMore(true);
        if (suggestedDataList && suggestedDataList.getMySuggestedUsers?.length && hasMore) {
            fetchMore({
                variables: {
                    input: {
                        limit: USER_LIMIT,
                        createdAt_lt:
                            suggestedDataList.getMySuggestedUsers[
                                suggestedDataList.getMySuggestedUsers.length - 1
                            ].createdAt,
                    },
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (fetchMoreResult.getMySuggestedUsers.length < USER_LIMIT) {
                        setHasMore(false);
                    }
                    if (!fetchMoreResult || fetchMoreResult.getMySuggestedUsers.length === 0) {
                        return previousResult;
                    }
                    setIsFetchingMore(false);

                    return {
                        getMySuggestedUsers: [
                            ...previousResult.getMySuggestedUsers,
                            ...fetchMoreResult.getMySuggestedUsers,
                        ],
                    };
                },
            });
        }
    };

    if (userError) {
        console.log('userSearchScreen', userError);
        return (
            <MemareeText
                style={{
                    color: colors.text,
                    textAlign: 'center',
                }}
            >
                Oops! Something went wrong
            </MemareeText>
        );
    }

    try {
        return (
            <>
                {userInput !== '' && userData?.searchUsers?.length === 0 && !userLoading ? (
                    <MemareeText
                        style={{
                            color: colors.text,
                            width: '100%',
                            textAlign: 'center',
                            marginTop: 50,
                        }}
                    >
                        No match found for "{userInput}"
                    </MemareeText>
                ) : userInput === '' ? (
                    <SuggestedUsersScreen
                        userInput={userInput}
                        loadingSuggestion={loadingSuggestion}
                        errorSuggestion={errorSuggestion}
                        suggestedDataList={suggestedDataList}
                        onFetchMore={onFetchMore}
                        suggestedRecent={suggestedRecent}
                        errorRecent={errorRecent}
                        loadingRecent={loadingRecent}
                        navigateToProfile={navigateToProfile}
                    />
                ) : (
                    <FlatList
                        style={{ backgroundColor: colors.background, width: '100%' }}
                        data={userData?.searchUsers}
                        renderItem={(data) => (
                            <SearchUserList
                                data={data}
                                type=""
                                navigateToProfile={navigateToProfile}
                            />
                        )}
                        keyExtractor={(item) => 'Li2' + item?._id}
                        extraData={userData?.searchUsers}
                    />
                )}
            </>
        );
    } catch (error) {
        return <MemareeText style={{ color: colors.text }}>Error: {error.message}</MemareeText>;
    }
};
