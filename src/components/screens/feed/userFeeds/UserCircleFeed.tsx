import React, { useCallback } from 'react';
import { View } from 'react-native';

// 3rd party hooks
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';

// gpl queries
import { CirclePostsForProfileQry } from '../gql/ProfileFeeds';

// redux
import { selectUser } from 'store/slices/userSlice';

// custom components
import FeedComponent from '../composables/FeedComponent';
import AddToYourCircle from '../emptyFeed/addToMessage/AddToYourCircle';
import OtherUserEmptyVision from '../emptyFeed/misc/OtherUserEmptyFeed';

// constants
const COLUMN_COUNT = 3;
const POST_LIMIT = 20;

interface UserCircleFeedProps {
    route: {
        params?: {
            openPostOptionsBottomSheet?: (posterId: string, postId: string) => void;
            openSharePostBottomSheet?: (postId: string) => void;
            userId: string;
            onScroll: (e) => void;
        };
    };
}

const UserCircleFeed = (props: UserCircleFeedProps) => {
    const user = useSelector(selectUser);
    // const isFocused = useIsFocused();

    // useFocusEffect(
    //     useCallback(() => {
    //         if (isFocused) {
    //             refetch();
    //         }
    //     }, [isFocused]),
    // );

    const query = CirclePostsForProfileQry;
    const initialVariables = {
        input: {
            limit: POST_LIMIT,
            userId: props?.route?.params?.userId,
        },
    };

    const { loading, error, data, fetchMore, refetch } = useQuery(query, {
        variables: initialVariables,
        fetchPolicy: 'cache-and-network',
    });

    return (
        <View
            style={{
                flex: 0,
                height: '100%',
                width: '100%',
                alignItems: 'center',
            }}
        >
            <FeedComponent
                feedType={'circle'}
                columnCount={COLUMN_COUNT}
                onScroll={props?.route?.params?.onScroll}
                emptyComponent={
                    user._id === props?.route?.params?.userId ? (
                        <AddToYourCircle />
                    ) : (
                        <OtherUserEmptyVision feedType="circle" />
                    )
                }
                openPostOptionsBottomSheet={props?.route?.params?.openPostOptionsBottomSheet}
                openSharePostBottomSheet={props?.route?.params?.openSharePostBottomSheet}
                postsKey={'circlePostsForProfile'}
                variables={initialVariables}
                posts={data?.circlePostsForProfile}
                loading={loading}
                error={error}
                fetchMore={fetchMore}
                refetch={refetch}
            />
        </View>
    );
};

export default UserCircleFeed;
