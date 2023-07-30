import React, { ReactNode, useEffect, useState } from 'react';
import { Image } from 'expo-image';

// types
import { Post } from 'types/DataModels';
import { OperationVariables } from '@apollo/client';

// custom components
import PostList from './PostList';

interface FeedComponentProps {
    feedType: string;
    columnCount: number;
    emptyComponent: ReactNode;
    openPostOptionsBottomSheet?: (posterId: string, postId: string) => void;
    openSharePostBottomSheet?: (postId: string) => void;
    postsKey: string;
    variables: OperationVariables;
    posts: Post[];
    loading: boolean;
    error: {
        message: string;
    };
    fetchMore: (args: any) => void;
    refetch: (args: any) => void;
    onScroll?: (e) => void;
    inGroup?: boolean;
}

const FeedComponent = (props: FeedComponentProps) => {
    const [isFetchingMore, setIsFetchinMore] = useState(false);

    useEffect(() => {
        const GetAllImageUrls = (posts: Post[]) =>
            [].concat(...Object.values(posts).map((p) => p?.signedUrl));
        const imageToPreload = GetAllImageUrls(props?.posts ? props?.posts : []);
        Image.prefetch(imageToPreload);
    }, [props?.posts]);

    useEffect(() => {
        setIsFetchinMore(false);
    }, [props?.feedType]);

    const onFetchMore = () => {
        if (isFetchingMore) {
            return;
        }
        setIsFetchinMore(true);
        if (props?.posts && props?.posts.length) {
            const unique = [...new Set(props?.posts?.map((item) => item?._id))];
            console.log('fetching more, current unique id length: ', unique?.length);
            props?.fetchMore({
                variables: {
                    input: {
                        ...props?.variables?.input,
                        _id_lt: props?.posts[props?.posts.length - 1]._id,
                    },
                },
                updateQuery: (
                    previousResult,
                    { fetchMoreResult }: { fetchMoreResult?: Post[] },
                ) => {
                    setIsFetchinMore(false);
                    if (!fetchMoreResult || fetchMoreResult[props?.postsKey].length === 0) {
                        return previousResult;
                    }
                    return {
                        [props?.postsKey]: [
                            ...previousResult[props?.postsKey],
                            ...fetchMoreResult[props?.postsKey],
                        ],
                    };
                },
            });
        }
    };

    const onRefetch = () => {
        props?.refetch(props?.variables);
    };

    return (
        <PostList
            columnCount={props?.columnCount}
            posts={props?.posts ? props?.posts : []}
            emptyComponent={props?.emptyComponent}
            loading={props?.loading}
            error={props?.error?.message}
            openPostOptionsBottomSheet={props?.openPostOptionsBottomSheet}
            openSharePostBottomSheet={props?.openSharePostBottomSheet}
            onFetchMore={onFetchMore}
            onRefetch={onRefetch}
            onScroll={props?.onScroll}
            feedType={props?.feedType}
            inGroup={props?.inGroup}
        />
    );
};

export default FeedComponent;
