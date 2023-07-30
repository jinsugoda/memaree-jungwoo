import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Keyboard,
    Dimensions,
    TextStyle,
    Pressable,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

// types
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';
import { CommentData, Post } from 'types/DataModels';

// custom components
import PostInteractionButtons from 'components/common/buttonGroups/PostInteractionButtons';
import PostOptionsModal from 'components/common/bottomMenuModals/PostOptionsModal';

// 3rd party hooks
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

// custom components
import { BackButton } from 'components/common/buttons/navigation/BackButton';
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';
import SharePostModal from 'components/common/bottomMenuModals/SharePostModal';
import RoundedImage from 'components/common/images/RoundedImage';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// utils
import { ShorttenText } from 'utils/customFormatters';

// redux
import { selectUser, selectUserId } from 'store/slices/userSlice';

// styles
import { PostStyles, PostcardStyles } from 'styles';
import { LinearGradient } from 'expo-linear-gradient';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import TextAndImageInput from 'components/common/textAndInputs/TextAndImageInputs';
import {
    ADD_COMMENT_AS_SUBCOMMENT,
    ADD_TOP_LEVEL_COMMENT_TO_POST,
    CREATE_COMMENT,
} from './comment/commentQueries';
import { GET_TOP_COMMENTS } from '../feed/postCards/gql/PostcardLargequeries';
import { ScrollView } from 'react-native-gesture-handler';
import { ResizeMode, Video } from 'expo-av';

// constants
const MAX_CHARACTERS = 20;

const PostQry = gql`
    query Post($query: PostQueryInput) {
        post(query: $query) {
            _id
            numberOfComments
            content {
                caption
                imageUrls
            }
            createdAt
            user {
                _id
                profilePicUrl
                username
            }
            signedUrl
        }
    }
`;

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
                {/* {isTruncated ? text : ShorttenText(text.replace(/\n/g, ' '), 140)} */}
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
type ViewPostScreenProps = NativeStackScreenProps<RootStackParamList, 'ViewPostScreen'>;
const ViewPostScreen = (props: ViewPostScreenProps) => {
    const navigation = props.navigation;
    const { colors }: CustomTheme = useTheme();
    const userId = useSelector(selectUserId);

    const [fetchPost, { data, loading, error }] = useLazyQuery(PostQry);

    const [addCommentCount, setAddCommentCount] = useState(0);
    useEffect(() => {
        console.log('query data', props.route.params?.queryData);
        if (props.route.params?.queryData) {
            fetchPost({
                variables: {
                    query: {
                        _id: props.route.params.post._id,
                    },
                },
            });
        }
    }, [props.route.params.queryData, props.route.params.post?._id]);

    const post: Post = data?.post || props.route.params.post;
    const size = 30;
    const profilePicUrl = post?.user?.profilePicUrl ?? 'DEFAULT';

    const [replyTo, setReplyTo] = useState(null);
    const user = useSelector(selectUser);
    const [displayComments, setDisplayComments] = useState([]);
    const [isTruncated, setIsTruncated] = useState(false);

    const toggleTruncate = () => {
        setIsTruncated(!isTruncated);
    };

    const inputRef = useRef(null);
    const postBottomSheetRef = useRef<BottomSheet>(null);
    const [comments, setComments] = useState<CommentData[]>([]);
    const ShareBottomSheetRef = useRef<BottomSheet>(null);
    const [addComment] = useMutation(CREATE_COMMENT);
    const [addCommentToPost] = useMutation(ADD_TOP_LEVEL_COMMENT_TO_POST);
    const [addCommentToComment] = useMutation(ADD_COMMENT_AS_SUBCOMMENT);
    const screenWidth = Dimensions.get('window').width;

    const openSharePostBottomSheet = () => {
        ShareBottomSheetRef.current?.expand();
    };

    //DONT REMOVE IT. WE WILL USE THAT FEATURE
    useEffect(() => {
        navigation.setOptions({
            // headerLeft: () => <BackButton />,
            // headerRight: () => (
            // <TouchableOpacity
            //     style={{ marginRight: 15 }}
            //     onPress={() => postBottomSheetRef.current?.expand()}
            // >
            //     <Ionicons name="ellipsis-horizontal" size={18} color={colors.text} />
            // </TouchableOpacity>
            // ),
        });
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: ShorttenText(props.route.params.post.user.username, 12),
        });
    }, [props.route.params.post]);

    const openPostOptionsBottomSheet = () => {
        postBottomSheetRef.current?.expand();
    };
    const { data: CommentData } = useQuery(GET_TOP_COMMENTS, {
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

    const newReplyCleanup = useCallback(() => {
        setReplyTo(null);
    }, [comments]);

    return (
        <ScrollView>
            <View style={[PostStyles.mainContainer]}>
                <View style={[PostcardStyles.visionImageContainer]}>
                    <TouchableOpacity
                        onPress={() => openPostOptionsBottomSheet()}
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
                    {!isVideo && (
                        <RoundedImage
                            uri={post.signedUrl}
                            cacheKey={
                                userId === post?.user?._id ? post?.content?.imageUrls[0] : null
                            }
                            imageStyle={[PostcardStyles.visionImage]}
                            aspectRatio={1}
                        />
                    )}
                    {isVideo && (
                        <Video
                            source={{ uri: post?.signedUrl }}
                            style={{ width: screenWidth, height: screenWidth * 1.25 }}
                            shouldPlay={true}
                            isLooping={true}
                            //useNativeControls={true}
                            resizeMode={ResizeMode.STRETCH}
                        />
                    )}
                    <LinearGradient
                        colors={['rgba(28,27,31, 0)', 'rgba(28,27,31, 90)']}
                        style={PostcardStyles.visionBottomBarContainer}
                    >
                        <TouchableOpacity
                            style={PostcardStyles.postingUserContainer}
                            onPress={() => {
                                if (userId === post.user._id) {
                                    navigation.navigate('SelfProfileScreen');
                                } else {
                                    navigation.navigate('OtherProfileScreen', {
                                        id: post.user._id,
                                    });
                                }
                            }}
                        >
                            <GradientAvatar size={44} source={profilePicUrl} />
                            <MemareeText
                                style={[
                                    PostcardStyles.experienceText,
                                    { color: colors.text },
                                    { fontSize: 14 },
                                ]}
                            >
                                {ShorttenText(post.user.username, 30)}
                            </MemareeText>
                        </TouchableOpacity>
                        <PostInteractionButtons
                            size={size}
                            post={post}
                            openSharePostBottomSheet={openSharePostBottomSheet}
                            openPostOptionsBottomSheet={openPostOptionsBottomSheet}
                        />
                    </LinearGradient>
                </View>
                <View
                    style={{
                        alignSelf: 'flex-start',
                        width: '100%',
                        paddingHorizontal: 16,
                        paddingTop: 16,
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
                        {(CommentData?.post?.numberOfComments || addCommentCount > 0) && (
                            <MemareeText
                                style={{
                                    color: '#D9D9D9',
                                    fontSize: 16,
                                    fontFamily: 'Outfit',
                                    fontWeight: '400',
                                    marginBottom: 4,
                                }}
                            >
                                View all comments{' '}
                                {`(${CommentData?.post?.numberOfComments + addCommentCount})`}
                            </MemareeText>
                        )}
                        {displayComments.map((element) => {
                            return (
                                <View style={{ width: '90%', paddingVertical: 3 }}>
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
                            marginTop: 25,
                        }}
                    >
                        <View
                            style={{
                                flex: 0,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: 20,
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
                    </View>
                </View>
                <SharePostModal bottomSheetRef={ShareBottomSheetRef} postId={post._id} />
                <PostOptionsModal
                    bottomSheetRef={postBottomSheetRef}
                    posterId={post.user._id}
                    postId={post._id}
                />
            </View>
        </ScrollView>
    );
};
export default ViewPostScreen;
