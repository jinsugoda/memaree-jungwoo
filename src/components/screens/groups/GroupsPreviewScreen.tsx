import React, { memo, useCallback, useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Button, List, Searchbar, useTheme } from 'react-native-paper';

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';

// custom components
import { GroupSingleRow } from './rows/GroupsSingleRow';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// gpl queries
import { ADD_POST, GET_GROUP, SEARCH_GROUP } from 'components/screens/groups/gpl/queries';

// Style
import { GroupPreviewStyle } from './style/GroupScreenStyle';
import { FlashList } from '@shopify/flash-list';
import { Group } from 'types/DataModels';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const GROUP_LIMIT = 10;

// Style
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import { selectUserId } from 'store/slices/userSlice';

type GroupPreviewScreenProps = NativeStackScreenProps<RootStackParamList, 'GroupPreviewScreen'>;
const GroupPreviewScreen = ({ route }: GroupPreviewScreenProps) => {
    const isFocused = useIsFocused();
    const { colors }: CustomTheme = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const screenWidth = Dimensions.get('window').width;
    let userID = useSelector(selectUserId);

    // const [sendData, setSendData] = useState([]);
    const [groupIds, setgroupIds] = useState([]);

    // const { loading, error, data, refetch } = useQuery(GET_GROUP_PREVIEW);

    let initialVariables = {
        input: {
            limit: GROUP_LIMIT,
        },
    };
    const {
        loading,
        error,
        data: GroupData,
        fetchMore,
        refetch,
    } = useQuery(GET_GROUP, {
        variables: initialVariables,
        fetchPolicy: 'cache-and-network',
        onError: (error) => {
            console.error('ApolloError:', error.message);
        },
    });
    const groupIdsRef = React.useRef(groupIds);
    useEffect(() => {
        groupIdsRef.current = groupIds;
    }, [groupIds]);

    useFocusEffect(
        React.useCallback(() => {
            if (isFocused) {
                refetch();
            }
        }, []),
    );
    const [addPostToArray] = useMutation(ADD_POST);
    const ref = React.useRef(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchQueryDisplay, setSearchQueryDisplay] = useState('');

    const onChangeSearch = (query: string) => {
        setSearchQueryDisplay(query);
        debouncedOnChangeSearch(query);
    };

    const debouncedOnChangeSearch = useCallback(
        debounce((query) => {
            setSearchQuery(query);
        }, 400), //the debounce delay
        [],
    );

    const {
        loading: userLoading,
        error: userError,
        data: userData,
    } = useQuery(SEARCH_GROUP, {
        variables: { input: searchQuery.toLowerCase() },
        fetchPolicy: 'network-only',
        skip: searchQuery === '',
    });

    const sharePost = async () => {
        await addPostToArray({
            variables: {
                input: {
                    postId: route?.params?.postId,
                    groupIds,
                },
            },
        });

        navigation.goBack();
    };

    let pressable = groupIds.length === 0;
    const handleOnGroupPress = useCallback((groupId) => {
        console.log(groupId);

        if (groupIdsRef.current.includes(groupId)) {
            setgroupIds(groupIdsRef.current.filter((id) => id !== groupId));
        } else {
            setgroupIds([...groupIdsRef.current, groupId]);
        }
    }, []);

    const [isFetchingMore, setIsFetchinMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const onFetchMore = () => {
        console.log('fetingMore', isFetchingMore);
        if (isFetchingMore) {
            return;
        }
        setIsFetchinMore(true);
        if (GroupData && GroupData?.getMyGroups_V2?.length && hasMore) {
            fetchMore({
                variables: {
                    input: {
                        limit: GROUP_LIMIT,
                        lastActivityAt_lt:
                            GroupData.getMyGroups_V2[GroupData?.getMyGroups_V2?.length - 1]
                                .lastActivityAt,
                    },
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (fetchMoreResult?.getMyGroups_V2?.length < GROUP_LIMIT) {
                        setHasMore(false);
                    }
                    if (!fetchMoreResult || fetchMoreResult?.getMyGroups_V2?.length === 0) {
                        return previousResult;
                    }
                    setIsFetchinMore(false);

                    return {
                        getMyGroups_V2: [
                            ...previousResult?.getMyGroups_V2,
                            ...fetchMoreResult?.getMyGroups_V2,
                        ],
                    };
                },
            });
        }
    };

    const renderItem = (list) => {
        return (
            <ScrollView
                style={{
                    flex: 1,
                    width: '100%',
                    alignContent: 'center',
                }}
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <List.Section style={{ flex: 1, width: '95%' }}>
                    {list.map((element) => {
                        return (
                            <GroupSingleRow
                                key={element?._id}
                                group={element}
                                postId={route?.params?.postId}
                                onPress={() => handleOnGroupPress(element?._id)}
                            />
                        );
                    })}
                </List.Section>
            </ScrollView>
        );
    };
    let content;
    if (loading)
        content = (
            <SafeAreaProvider style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </SafeAreaProvider>
        );

    if (searchQuery !== '') {
        if (userLoading) {
            content = (
                <ActivityIndicator
                    color={'green'}
                    size={'large'}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: -100,
                        bottom: 0,
                    }}
                />
            );
        } else if (userError) {
            content = (
                <MemareeText
                    style={{
                        color: colors.text,
                        textAlign: 'center',
                    }}
                >
                    Oops! Something went wrong
                </MemareeText>
            );
        } else if (userData?.searchSharableGroup?.length <= 0) {
            content = (
                <MemareeText
                    style={{
                        color: colors.text,
                        width: '100%',
                        textAlign: 'center',
                        marginTop: 50,
                    }}
                >
                    No match found for "{searchQuery}"
                </MemareeText>
            );
        } else if (userData?.searchSharableGroup) {
            content = userData?.searchSharableGroup && renderItem(userData?.searchSharableGroup);
        }
    } else if (loading) content = <MemareeText>loading...</MemareeText>;
    else if (error) {
        console.log('GroupPreviewScreen', error);
        content = <MemareeText>error </MemareeText>;
    } else {
        content = (
            <View style={{ width: screenWidth, height: '100%' }}>
                <FlashList
                    data={GroupData.getMyGroups_V2 as Group[]}
                    contentContainerStyle={{ paddingTop: 15, paddingBottom: 110 }}
                    renderItem={(element) =>
                        element.item.readOnly ? (
                            <></>
                        ) : (
                            <GroupSingleRow
                                key={element?.item?._id}
                                group={element.item}
                                postId={route?.params?.postId}
                                onPress={() => handleOnGroupPress(element?.item?._id)}
                            />
                        )
                    }
                    numColumns={1}
                    drawDistance={12}
                    onEndReached={onFetchMore}
                    onEndReachedThreshold={12}
                    estimatedItemSize={186}
                    showsVerticalScrollIndicator={false}
                ></FlashList>
            </View>
        );
    }

    // data?.getSharableGroup && renderItem(data?.getSharableGroup)
    return (
        <SafeAreaView style={GroupPreviewStyle.ContainerSafeAreaView}>
            <Searchbar
                style={[GroupPreviewStyle.SearchBar]}
                placeholder="Search"
                placeholderTextColor={colors.text}
                onChangeText={(newSearch) => onChangeSearch(newSearch)}
                value={searchQueryDisplay}
                iconColor={colors.text}
                ref={ref}
                cursorColor={colors.text}
                inputStyle={{ color: colors.text }}
            />
            {/* <ScrollView style={GroupPreviewStyle.groupListContainer}>
                <View style={GroupPreviewStyle.DefaultHeight} />
                {d ata?.getSharableGroup.map((element) => {
                    return (
                        <GroupSingleRow
                            key={element?._id}
                            group={element}
                            postId={route?.params?.postId}
                            onPress={() => handleOngroupPress(element?._id)}
                        />
                    );
                })}
            </ScrollView> */}
            {content}
            <View style={GroupPreviewStyle.ButtonContainer}>
                <Button
                    onPress={() => navigation.goBack()}
                    textColor={colors.text}
                    labelStyle={{ fontFamily: 'Outfit-Bold' }}
                    style={[
                        GroupPreviewStyle.PreviewButton,
                        {
                            backgroundColor: colors.background,
                            borderColor: colors.text,
                        },
                    ]}
                >
                    Cancel
                </Button>
                {
                    <Button
                        onPress={() => sharePost()}
                        disabled={pressable}
                        labelStyle={{
                            color: pressable ? 'white' : 'black',
                            fontFamily: 'Outfit-Bold',
                        }}
                        style={[
                            GroupPreviewStyle.PreviewButton,
                            {
                                backgroundColor: pressable ? '#2F2F2F' : colors.tertiary,
                                borderColor: pressable ? '#2F2F2F' : colors.tertiary,
                            },
                        ]}
                    >
                        Share
                    </Button>
                }
            </View>
        </SafeAreaView>
    );
};

export default memo(GroupPreviewScreen);
