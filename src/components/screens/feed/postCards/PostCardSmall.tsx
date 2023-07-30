import React, { memo, useEffect } from 'react';
import { View, Pressable } from 'react-native';

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';
import { MasonryListRenderItemInfo } from '@shopify/flash-list/dist/MasonryFlashList';
import { Post } from 'types/DataModels';

// 3rd party hooks
import { useNavigation } from '@react-navigation/native';

// custom components
import RoundedImage from 'components/common/images/RoundedImage';

// redux
import { useSelector } from 'react-redux';
import { selectUserId } from 'store/slices/userSlice';

// styles
import { PostcardStyles } from 'styles';
import Logger, { ErrorType } from 'utils/logger';

interface PostCardSmallProps extends MasonryListRenderItemInfo<Post> {
    openPostOptionsBottomSheet: (posterId: string, postId: string) => void;
    openSharePostBottomSheet: (postId: string) => void;
}

const PostCardSmall = (props: PostCardSmallProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const userId = useSelector(selectUserId);
    const post = props?.item;

    const url = post?.content?.imageUrls.length && post.content.imageUrls[0];

    useEffect(() => {
        if (!url) {
            Logger(
                ErrorType.OTHER,
                'PostCardSmall',
                new Error('Custom error: POST IS NOT DEFINED RIGHT FOR SOME REASON!'),
                'PostCardSmall.tsx',
                134,
                0,
                'POST IS NOT DEFINED RIGHT FOR SOME REASON!',
                null,
                'NO ENDPOINT',
                {
                    post,
                },
            );
        }
    }, [post]);

    return (
        <Pressable onPress={() => navigation.navigate('ViewPostScreen', { post: post })}>
            <View style={[PostcardStyles.container]} key={post.user?._id}>
                <RoundedImage
                    uri={post.signedUrl}
                    cacheKey={userId === post?.user?._id ? post?.content?.imageUrls[0] : null}
                    postCardSmall={true}
                    thumbnail={true}
                />
            </View>
        </Pressable>
    );
};

export default memo(PostCardSmall);
