import React, { memo, useCallback, useRef, useState } from 'react';
import { View, TouchableOpacity, Pressable, TextStyle, Keyboard, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ResizeMode, Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
// types
import { MasonryListRenderItemInfo } from '@shopify/flash-list/dist/MasonryFlashList';
import { CustomTheme } from 'styles/theme/customThemeProps';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';
import { CommentData, Post } from 'types/DataModels';

// 3rd party hooks
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';

// redux
import { selectUser, selectUserId } from 'store/slices/userSlice';

// utils
import { ShorttenText } from 'utils/customFormatters';

// queries
import {
    ADD_COMMENT_AS_SUBCOMMENT,
    ADD_TOP_LEVEL_COMMENT_TO_POST,
    CREATE_COMMENT,
} from 'components/screens/posts/comment/commentQueries';
import { GET_TOP_COMMENTS } from './gql/PostcardLargequeries';

// custom component
import PostInteractionButtons from 'components/common/buttonGroups/PostInteractionButtons';
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';
import RoundedImage from 'components/common/images/RoundedImage';
import MemareeText from 'components/common/textAndInputs/MemareeText';
import TextAndImageInput from 'components/common/textAndInputs/TextAndImageInputs';

// styles
import { PostStyles, PostcardStyles } from 'styles';

const maxLengthPerLine = 100;
interface TruncatableProps {
    toggleTruncate: () => void;
    isTruncated: boolean;
    text: string;
    textStyle?: TextStyle;
}

const Truncatable = ({ toggleTruncate, isTruncated, text, textStyle }: TruncatableProps) => {
    const { colors }: CustomTheme = useTheme();
    const split = text.split('\n');
    const numLines = split.length;

    let truncatedText = '';

    if (numLines > 3) {
        for (let i = 0; i < 3; i++) {
            truncatedText += ShorttenText(split[i], maxLengthPerLine) + '\n';
        }
    } else {
        truncatedText = ShorttenText(text, 100);
    }
    return (
        <Pressable onPress={toggleTruncate}>
            <MemareeText style={[{ color: colors.text, fontWeight: '600' }, textStyle]}>
                {isTruncated ? text : truncatedText}
                {'\n'}
                {text?.length > truncatedText?.length && (
                    <MemareeText style={[{ color: '#D9D9D9', fontWeight: '600' }, textStyle]}>
                        {isTruncated ? 'See less' : 'See more...'}
                    </MemareeText>
                )}
            </MemareeText>
        </Pressable>
    );
};

interface PostCardLargeProps extends MasonryListRenderItemInfo<Post> {
    openPostOptionsBottomSheet?: (posterId: string, postId: string) => void;
    openSharePostBottomSheet?: (postId: string) => void;
    inGroup?: boolean;
    visible: boolean;
    isFocused: boolean;
}

const MAX_CHARACTERS = 50;
const placeholder =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.png';

const PostCardLarge = (props: PostCardLargeProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { colors }: CustomTheme = useTheme();
    const userId = useSelector(selectUserId);
    const [isTruncated, setIsTruncated] = useState(false);
    const user = useSelector(selectUser);
    const inputRef = useRef(null);
    const [replyTo, setReplyTo] = useState(null);
    const [comments, setComments] = useState<CommentData[]>([]);
    const [displayComments, setDisplayComments] = useState([]);
    const [addCommentCount, setAddCommentCount] = useState(0);
    const screenWidth = Dimensions.get('window').width;

    // const [newReplyId, setNewReplyId] = useState(null);

    const toggleTruncate = () => {
        setIsTruncated((prev) => !prev);
    };
    const [addComment] = useMutation(CREATE_COMMENT);
    const [addCommentToPost] = useMutation(ADD_TOP_LEVEL_COMMENT_TO_POST);
    const [addCommentToComment] = useMutation(ADD_COMMENT_AS_SUBCOMMENT);
    const post: Post = props?.item;
    const size = 30;

    let uri;
    let cacheKey;

    const { data } = useQuery(GET_TOP_COMMENTS, {
        variables: {
            query: {
                _id: post._id,
            },
            input: {
                limit: 2,
            },
        },
        onCompleted: (comments) => {
            setDisplayComments(comments?.post?.comments);
        },
    });

    if (post.originalPost) {
        uri = post.originalPost.signedUrl || placeholder;
        cacheKey = userId === post?.user?._id ? post?.originalPost.content?.imageUrls[0] : null;
    } else {
        uri = post.signedUrl || placeholder;
        cacheKey = userId === post?.user?._id ? post?.content?.imageUrls[0] : null;
    }

    const handleAddComment = async (caption: string, imageUrls: string[]) => {
        try {
            const res = await addComment({
                variables: {
                    data: {
                        post: { link: post._id },
                        user: { link: userId },
                        content: {
                            create: {
                                imageUrls: imageUrls,
                                caption: caption,
                            },
                        },
                    },
                },
            });
            if (res.data) {
                const newCommentId = res.data?.insertOneComment._id;
                try {
                    let status = null;

                    if (replyTo === null) {
                        status = await addCommentToPost({
                            variables: { postId: post._id, newCommentId: newCommentId },
                        });
                        // console.log("status ", JSON.stringify(status))
                    } else if (replyTo) {
                        status = await addCommentToComment({
                            variables: { parentCommentId: replyTo, newCommentId: newCommentId },
                        });
                        // console.log("status ", JSON.stringify(status))
                    }
                    // console.log(`Successfully added comment id to ${replyTo? "comment" : "post"}`);
                    return newCommentId;
                } catch (error) {}
            }
        } catch (error) {}
    };

    const addNewReply = useCallback(
        (commentText: string) => {
            const tempComment = {
                content: {
                    __typename: 'CommentContent',
                    caption: commentText,
                    imageUrls: [],
                },
                user: {
                    username: user.username,
                },
            };

            const tempDisplayComments = [...displayComments];

            tempDisplayComments.unshift(tempComment);
            while (tempDisplayComments.length > 2) {
                tempDisplayComments.pop();
            }
            setDisplayComments(tempDisplayComments);
            setAddCommentCount((n) => n + 1);
            handleAddComment(commentText, []).then((newCommentId) => {
                setComments((prev) => {
                    const _id = newCommentId;
                    // setNewReplyId(_id);
                    const newComment = {
                        _id: _id,
                        content: {
                            caption: commentText,
                            imageUrls: [],
                        },
                        reactions: [],
                        subComments: [],
                        user: {
                            _id: user?._id,
                            username: user?.username,
                            profilePicUrl: user?.profilePicUrl ?? 'DEFAULT',
                        },
                        createdAt: new Date(),
                        updatedAt: null,
                        deletedAt: null,
                    };
                    if (replyTo === null) {
                        return [newComment, ...prev];
                    }
                    return prev.map((comment) => {
                        if (replyTo === comment?._id) {
                            const commentCopy = { ...comment };
                            commentCopy.subComments = [...commentCopy.subComments, newComment];
                            return commentCopy;
                        } else {
                            return comment;
                        }
                    });
                });
                Keyboard.dismiss();
            });
            newReplyCleanup();
        },
        [replyTo, displayComments],
    );

    const newReplyCleanup = useCallback(() => {
        setReplyTo(null);
    }, [comments]);

    let isVideo = false;

    // console.log('POST', JSON.stringify(post));

    // For now, it is assumed that one video will be available at max.
    // and also videos and images will not be available mixed up
    if (
        post?.signedUrl &&
        post?.signedUrl.length &&
        (post?.signedUrl.includes('.mp4') || post?.signedUrl.includes('.mov'))
    ) {
        isVideo = true;
    }

    return (
        <View style={[PostcardStyles.largePostCardContainer]}>
            <View style={[PostcardStyles.visionImageContainer]}>
                <TouchableOpacity
                    onPress={() =>
                        props.openPostOptionsBottomSheet(post.user?._id || '', post?._id || '')
                    }
                    style={{
                        right: 0,
                        top: 0,
                        justifyContent: 'center',
                        paddingRight: 10,
                        position: 'absolute',
                        zIndex: 999,
                    }}
                >
                    <Ionicons
                        name="ellipsis-horizontal"
                        style={{
                            textShadowColor: 'black',
                            textShadowRadius: 3,
                        }}
                        size={24}
                        color={colors.text}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ overflow: 'hidden' }}
                    onPress={() =>
                        navigation.navigate('ViewPostScreen', {
                            post: post.originalPost || post,
                            queryData: !!post.originalPost,
                        })
                    }
                >
                    {!isVideo && (
                        <RoundedImage
                            uri={uri}
                            cacheKey={cacheKey}
                            imageStyle={PostcardStyles.visionImage}
                        />
                    )}
                    {isVideo && (
                        <Video
                            source={{ uri: post?.signedUrl }}
                            style={{ width: screenWidth, height: screenWidth * 1.25 }}
                            shouldPlay={props.visible && props.isFocused}
                            isLooping={true}
                            // useNativeControls={true}
                            resizeMode={ResizeMode.STRETCH}
                        />
                    )}
                </TouchableOpacity>
                <LinearGradient
                    colors={['rgba(28,27,31, 0)', 'rgba(28,27,31, 90)']}
                    style={PostcardStyles.visionBottomBarContainer}
                >
                    <TouchableOpacity
                        style={PostcardStyles.postingUserContainer}
                        onPress={() => {
                            if (userId === post?.user?._id) {
                                navigation.navigate('SelfProfileScreen');
                            } else {
                                navigation.navigate('OtherProfileScreen', {
                                    id: post?.user?._id,
                                });
                            }
                        }}
                    >
                        <GradientAvatar size={44} source={post?.user?.profilePicUrl ?? 'DEFAULT'} />
                        <MemareeText
                            style={[PostcardStyles.experienceText, { color: colors.text }]}
                        >
                            {post?.user?.username
                                ? ShorttenText(post.user.username, 20)
                                : 'placeholder_username'}
                        </MemareeText>
                    </TouchableOpacity>
                    <PostInteractionButtons
                        size={size}
                        post={post}
                        inGroup={props?.inGroup}
                        openSharePostBottomSheet={props?.openSharePostBottomSheet}
                        openPostOptionsBottomSheet={props?.openPostOptionsBottomSheet}
                    />
                </LinearGradient>
            </View>
            <View
                style={{
                    alignSelf: 'flex-start',
                    width: '100%',
                    paddingHorizontal: 16,
                }}
            >
                {post?.content?.caption && (
                    <View style={PostStyles.commentPreview}>
                        {post?.content?.caption?.length > MAX_CHARACTERS ? (
                            <Truncatable
                                toggleTruncate={toggleTruncate}
                                isTruncated={isTruncated}
                                text={post?.content?.caption || ''}
                                textStyle={{ fontFamily: 'Outfit' }}
                            />
                        ) : (
                            <MemareeText
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={[
                                    PostStyles.textReplyPreview,
                                    {
                                        color: colors.text,
                                        fontWeight: '600',
                                        fontSize: 16,
                                        fontFamily: 'Outfit',
                                        marginTop: 8,
                                    },
                                ]}
                            >
                                {post?.content?.caption || ''}
                            </MemareeText>
                        )}
                    </View>
                )}
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('CommentScreen', {
                            parentType: 'post',
                            parentId: post?._id,
                            enableReplies: true,
                            posterCaption: {
                                posterId: post?.originalPost
                                    ? post?.originalPost?.user?._id
                                    : post?.user?._id,
                                name: post?.originalPost
                                    ? post?.originalPost?.user?.username
                                    : post?.user?.username,
                                caption: post?.content?.caption,
                                poster: post?.originalPost
                                    ? post?.originalPost?.user?.profilePicUrl
                                    : post?.user?.profilePicUrl,
                            },
                        })
                    }
                >
                    {(data?.post?.numberOfComments || addCommentCount > 0) && (
                        <MemareeText
                            style={{
                                color: '#D9D9D9',
                                fontSize: 16,
                                fontFamily: 'Outfit',
                                fontWeight: '400',
                                marginBottom: 4,
                                marginTop: 10,
                            }}
                        >
                            View all comments{' '}
                            {`(${data?.post?.numberOfComments + addCommentCount})`}
                        </MemareeText>
                    )}
                    {displayComments.map((element, i) => {
                        return (
                            <View
                                key={
                                    element?._id ||
                                    i.toString() +
                                        element?.content?.caption +
                                        element?.user?.username
                                }
                                style={{ width: '90%', paddingVertical: 3 }}
                            >
                                <MemareeText
                                    numberOfLines={2}
                                    style={{ color: colors.text, fontFamily: 'Outfit' }}
                                >
                                    <MemareeText
                                        style={{
                                            color: colors.text,
                                            fontWeight: 'bold',
                                            fontSize: 17,
                                        }}
                                    >
                                        {ShorttenText(element?.user?.username, 20)}
                                    </MemareeText>
                                    {'  ' + element?.content?.caption}
                                </MemareeText>
                            </View>
                        );
                    })}
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 12,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '90%',
                        }}
                    >
                        <GradientAvatar
                            size={40}
                            source={user?.profilePicUrl}
                            style={{ alignSelf: 'center' }}
                        />
                        <TextAndImageInput
                            padding={4}
                            handleSubmit={addNewReply}
                            inputRef={inputRef}
                            backgroundColor={colors.background}
                        />
                    </View>
                    {/* <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('CommentScreen', {
                                parentType: 'post',
                                parentId: post?._id || '',
                                enableReplies: true,
                            })
                        }
                    >
                        <MemareeText
                            style={{ color: colors.text, fontSize: 16, fontWeight: '500' }}
                        >
                            {post?.numberOfComments
                                ? `View all comments (${post?.numberOfComments})`
                                : 'Be the first to Comment'}
                        </MemareeText>
                    </TouchableOpacity> */}

                    {/* Will be used later. DO NOT REMOVE. */}
                    {/* <TouchableOpacity
                        onPress={() =>
                            props?.openPostOptionsBottomSheet(post.user?._id || '', post?._id || '')
                        }
                    >
                        <Ionicons name="ellipsis-horizontal" size={18} color={colors.text} />

                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    );
};

export default memo(PostCardLarge);
