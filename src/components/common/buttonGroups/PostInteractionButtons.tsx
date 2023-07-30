import React, { useEffect } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

// types
import { Post } from 'types/DataModels';

// 3rd party hooks
import { useSelector } from 'react-redux';

// redux
import { selectUserId } from 'store/slices/userSlice';

// custom components
import ShareButton from '../buttons/interaction/ShareButton';
import RememberButton from '../buttons/interaction/RememberButton';

// styles
import { PostcardStyles } from 'styles';
import { Ionicons } from '@expo/vector-icons';
import { CustomTheme } from 'styles/theme/customThemeProps';
import { useTheme } from 'react-native-paper';
import PostAnimatedEmoji from '../buttons/interaction/PostAnimatedEmoji';

type PostInteractionButtonsProps = {
    post: Post;
    size: number;
    inGroup?: boolean;
    openSharePostBottomSheet: (postId: string) => void;
    openPostOptionsBottomSheet: (posterId: string, postId: string) => void;
    containerStyle?: StyleProp<ViewStyle>;
};

const PostInteractionButtons = ({
    size,
    post,
    containerStyle,
    inGroup,
    openSharePostBottomSheet,
}: PostInteractionButtonsProps) => {
    const userID = useSelector(selectUserId);

    return (
        <View
            style={[
                PostcardStyles.visionActionBtn,
                containerStyle,
                { alignItems: 'center', gap: 20 },
            ]}
        >
            {post?.user?._id !== userID && (
                <RememberButton size={size} inverted={false} postId={post?._id} />
            )}
            {(post?.user?._id === userID || post.isSharedToVision || inGroup) && (
                <ShareButton
                    size={size}
                    postId={post.originalPost?._id || post._id}
                    openSharePostBottomSheet={openSharePostBottomSheet}
                />
            )}
            <PostAnimatedEmoji key={post?._id} postId={post?._id} userID={userID} />
        </View>
    );
};
export default PostInteractionButtons;
