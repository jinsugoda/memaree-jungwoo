import React, { memo, useCallback, useEffect, useState } from 'react';

// types
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Screens';

// context
import { useFeedContext } from '../FeedContext';

// 3d party hooks
import { useQuery } from '@apollo/client';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

// gpl queries
import { CircleAndVisionFlipsidePostsQry } from '../../gql/CircleAndVisionFlipsidePostsQry';
import { CirclePostsQry } from '../../gql/CirclePostsQry';

// custom components
import FeedComponent from '../../composables/FeedComponent';
import AddToYourCircle from '../../emptyFeed/addToMessage/AddToYourCircle';

// constants
const COLUMN_COUNT = 1;
const POST_COMMENT_LIMIT = 1;
const POST_LIMIT = 12;
export const postsKey = 'circlePosts';
const postsKey_flipped = 'getCircleAndVisionFlipsidePosts';
export const initialVariables = {
    input: {
        limit: POST_LIMIT,
    },
    commentsInput2: { limit: POST_COMMENT_LIMIT },
};

type CircleProps = NativeStackScreenProps<RootStackParamList, 'CircleScreen'>;

const CircleScreen = (props: CircleProps) => {
    const { isFlippedCircle, setIsFlippedCircle } = useFeedContext();
    const params = props?.route?.params;

    const isFocused = useIsFocused();

    const { loading, error, data, fetchMore, refetch } = useQuery(CirclePostsQry, {
        variables: initialVariables,
        fetchPolicy: 'cache-and-network',
    });
    const {
        loading: loading_flipped,
        error: error_flipped,
        data: data_flipped,
        fetchMore: fetchMore_flipped,
        refetch: refetch_flipped,
    } = useQuery(CircleAndVisionFlipsidePostsQry, {
        variables: initialVariables,
        fetchPolicy: 'cache-and-network',
    });

    // when the user flips, the flip-side data is fetched
    useEffect(() => {
        if (isFlippedCircle) {
            console.log('refetchingFlipped');
            refetch_flipped(initialVariables);
        }
    }, [isFlippedCircle]);

    useFocusEffect(
        useCallback(() => {
            if (isFocused && isFlippedCircle) {
                // refetch(initialVariables);
                console.log('setting is flipped c false');
                setIsFlippedCircle(false);
            }
        }, [isFocused]),
    );

    return (
        <FeedComponent
            feedType={'circle'}
            columnCount={COLUMN_COUNT}
            emptyComponent={<AddToYourCircle />}
            openPostOptionsBottomSheet={params?.openPostOptionsBottomSheet}
            openSharePostBottomSheet={params?.openSharePostBottomSheet}
            postsKey={isFlippedCircle ? postsKey_flipped : postsKey}
            variables={initialVariables}
            posts={isFlippedCircle ? data_flipped?.[postsKey_flipped] : data?.[postsKey]}
            loading={isFlippedCircle ? loading_flipped : loading}
            error={isFlippedCircle ? error_flipped : error}
            fetchMore={isFlippedCircle ? fetchMore_flipped : fetchMore}
            refetch={isFlippedCircle ? refetch_flipped : refetch}
        />
    );
};

export default memo(CircleScreen);
