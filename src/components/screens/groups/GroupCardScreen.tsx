import React, { useCallback, useEffect, useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import isEqual from 'lodash.isequal';

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Group } from 'types/DataModels';

// 3rd party hooks
import { useQuery } from '@apollo/client';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

//queries
import { GET_GROUP } from './gpl/queries';

// custom components
import GroupCard from './card/GroupCard';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// utils
import Logger, { ErrorType } from 'utils/logger';

const GROUP_LIMIT = 10;

type GroupCardScreenProps = NativeStackScreenProps<RootStackParamList, 'GroupCardScreen'>;
export const GroupCardScreen = (props: GroupCardScreenProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { colors }: CustomTheme = useTheme();
    const isFocused = useIsFocused();

    const [isFetchingMore, setIsFetchinMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [GroupDataState, setGroupDataState] = useState(null);
    let initialVariables = {
        input: {
            limit: GROUP_LIMIT,
        },
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.tertiary,
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 40,
                        borderRadius: 99,
                        paddingLeft: 10,
                        // paddingHorizontal: 10,
                        // paddingVertical: 10,
                        marginTop: 10,
                        marginRight: 10,
                    }}
                    onPress={() => navigation.navigate('CreateGroupScreenImage')}
                >
                    <FontAwesomeIcon size={13} icon={faPlus} />
                    <MemareeText
                        style={{ color: colors.background, marginLeft: 5, width: 80, fontSize: 12 }}
                    >
                        New Group
                    </MemareeText>
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <MemareeText
                    style={{
                        color: colors.text,
                        fontSize: 24,
                        fontFamily: 'Outfit-Bold',
                        margin: 10,
                        marginLeft: 20,
                        minHeight: 35,
                    }}
                >
                    Groups
                </MemareeText>
            ),
        });
    }, []);
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
        onCompleted: (data) => {
            const GroupDataWithoutSignedGroupImageUrl = GroupData?.getMyGroups_V2.map((item) => {
                const { signedGroupImageUrl, ...rest } = item;
                return rest;
            });

            const GroupDataStateWithoutSignedGroupImageUrl = GroupDataState?.getMyGroups_V2.map(
                (item) => {
                    const { signedGroupImageUrl, ...rest } = item;
                    return rest;
                },
            );
            if (
                !isEqual(
                    GroupDataWithoutSignedGroupImageUrl?.slice(0, GROUP_LIMIT),
                    GroupDataStateWithoutSignedGroupImageUrl?.slice(0, GROUP_LIMIT),
                )
            )
                setGroupDataState(data);
        },
    });
    useFocusEffect(
        useCallback(() => {
            if (isFocused) {
                refetch();
            }
        }, [isFocused]),
    );

    useEffect(() => {
        if (error) {
            console.log(error);
            console.log('FAILED TO UPDATE GROUP IMAGE', error);
            Logger(
                ErrorType.OTHER,
                'GroupCardScreen',
                error,
                'src/components/screens/groups/GroupCardScreen.tsx',
                204,
                0,
                'FAILED TO UPDATE GROUP IMAGE.',
                null,
                'NO ENDPOINT',
                {
                    GroupData,
                },
            );
        }
    }, [error]);

    // Handlers
    const onFetchMore = () => {
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
                            GroupData?.getMyGroups_V2[GroupData?.getMyGroups_V2?.length - 1]
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

    if (error) {
        console.log(error);
        return (
            <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                <MemareeText style={{ color: colors.text, textAlign: 'center' }}>
                    Oops! Something went wrong
                </MemareeText>
            </View>
        );
    }

    if (loading && !GroupData) {
        return (
            <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <FlashList
                data={GroupDataState?.getMyGroups_V2 as Group[]}
                contentContainerStyle={{ paddingTop: 15, paddingBottom: 50 }}
                renderItem={(prop) => (
                    <GroupCard
                        {...prop}
                        openPostOptionsBottomSheet={
                            props?.route?.params?.openPostOptionsBottomSheet as () => void
                        }
                        openSharePostBottomSheet={
                            props?.route?.params?.openSharePostBottomSheet as () => void
                        }
                    />
                )}
                numColumns={2}
                drawDistance={12}
                onEndReached={onFetchMore}
                onEndReachedThreshold={12}
                estimatedItemSize={186}
                showsVerticalScrollIndicator={false}
            ></FlashList>
        </View>
    );
};
