import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

// 3rd party hooks
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useQuery } from '@apollo/client';

// gpl queries
import { VisionPostsForProfileQry } from '../gql/ProfileFeeds';

// redux
import { useSelector } from 'react-redux';
import { selectUser } from 'store/slices/userSlice';

// custom components
import OtherUserEmptyFeed from '../emptyFeed/misc/OtherUserEmptyFeed';
import FeedComponent from '../composables/FeedComponent';
import AddToYourVision from 'components/screens/feed/emptyFeed/addToMessage/AddToYourVision';

// constants
const COLUMN_COUNT = 3;
const POST_LIMIT = 20;

interface UserVisionFeedProps {
    route: {
        params?: {
            openPostOptionsBottomSheet?: (posterId: string, postId: string) => void;
            openSharePostBottomSheet?: (postId: string) => void;
            onScroll?: (e) => void;
            userId: string;
        };
    };
}

const UserVisionFeed = (props: UserVisionFeedProps) => {
    const user = useSelector(selectUser);
    const isFocused = useIsFocused();
    const [posts_state, setPosts] = useState([]); //use state to save post array

    // useFocusEffect(
    //     useCallback(() => {
    //         if (isFocused) {
    //             refetch();
    //         }
    //     }, [isFocused]),
    // );

    const query = VisionPostsForProfileQry;
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

    const handleRefetch = () => {
        try {
            props?.route?.params?.onScroll({ nativeEvent: { contentOffset: { y: 0 } } });
        } catch (err) {
            console.log('user vision feed handle refetch err: ', err);
        }
    };

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
                feedType={'vision'}
                columnCount={COLUMN_COUNT}
                onScroll={props?.route?.params?.onScroll}
                emptyComponent={
                    user._id === props?.route?.params?.userId ? (
                        <AddToYourVision />
                    ) : (
                        <OtherUserEmptyFeed feedType="vision" />
                    )
                }
                openPostOptionsBottomSheet={props?.route?.params?.openPostOptionsBottomSheet}
                openSharePostBottomSheet={props?.route?.params?.openSharePostBottomSheet}
                postsKey={'visionPostsForProfile'}
                variables={initialVariables}
                posts={data?.visionPostsForProfile}
                loading={loading}
                error={error}
                fetchMore={fetchMore}
                refetch={handleRefetch}
            />
        </View>
    );
};

export default UserVisionFeed;
