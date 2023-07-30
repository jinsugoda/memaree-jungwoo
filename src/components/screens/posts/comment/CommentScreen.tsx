import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
    KeyboardAvoidingView,
    Keyboard,
    ActivityIndicator,
    View,
    Platform,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {FlashList} from '@shopify/flash-list';

// types
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/Screens';
import {CommentData} from 'types/DataModels';
import {CommentStyles} from 'styles';

// 3rd party hooks
import {useSelector} from 'react-redux';
import {useMutation, useQuery} from '@apollo/client';
import {useHeaderHeight} from '@react-navigation/elements';

// gpl queries
import {
    ADD_COMMENT_AS_SUBCOMMENT,
    ADD_TOP_LEVEL_COMMENT_TO_POST,
    CREATE_COMMENT,
    GETCOMMENTSUBCOMMENTS,
    GETPOSTCOMMMENTS,
} from './commentQueries';

// redux
import {selectUser} from 'store/slices/userSlice';

// custom components
import CommentThread from './CommentThread';
import MemareeText from 'components/common/textAndInputs/MemareeText';
import TextAndImageInput from 'components/common/textAndInputs/TextAndImageInputs';

// utils
import Logger, {ErrorType} from 'utils/logger';

// styles
import {screenRoot} from 'styles/stylesheets/ScreenStyles';
import {Divider, ScreenWidth} from '@rneui/base';
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {CustomTheme} from "styles/theme/customThemeProps";
import {useTheme} from "react-native-paper";

// constants
const POST_COMMENT_LIMIT = 10;

type CommentScreenProps = NativeStackScreenProps<RootStackParamList, 'CommentScreen'>;

const CommentScreen = (props: CommentScreenProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const {colors}: CustomTheme = useTheme();

    const parentId = props?.route?.params?.parentId;
    const parentType = props?.route?.params?.parentType;
    const user = useSelector(selectUser);
    const headerHeight = useHeaderHeight();
    let query = null;
    let variables = {};
    if (parentType === 'comment') {
        query = GETCOMMENTSUBCOMMENTS;
        variables = {
            query: {
                _id: parentId,
            },
        };
    } else if (parentType === 'post') {
        query = GETPOSTCOMMMENTS;
        variables = {
            query: {
                _id: parentId,
            },
            input: {
                _id_lt: parentId,
                limit: POST_COMMENT_LIMIT,
            },
        };
    }
    const {data, loading, error, refetch} = useQuery(query, {
        variables: variables,
        fetchPolicy: 'network-only',
    });
    const [comments, setComments] = useState<CommentData[]>([]);
    const [isFocused, setFocused] = useState(false);

    const [addComment] = useMutation(CREATE_COMMENT);
    const [addCommentToPost] = useMutation(ADD_TOP_LEVEL_COMMENT_TO_POST);
    const [addCommentToComment] = useMutation(ADD_COMMENT_AS_SUBCOMMENT);

    const [inReplyMode, setInReplyMode] = useState(false);
    const [replyTo, setReplyTo] = useState(null);
    const [newReplyId, setNewReplyId] = useState(null);
    const screenWidth = Dimensions.get('window').width;
    const ptValue = screenWidth * 0.7;
    const flatListRef = useRef(null);
    const inputRef = useRef(null);

    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setInReplyMode(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setInReplyMode(false);
        });
        let refetchInterval: string | number | NodeJS.Timer;
        try {
            refetchInterval = setInterval(() => {
                console.log('Fetching new comments...');
                refetch();
            }, 10000);
        } catch (err) {
            console.log(`err - fetching new commetns: `, err);
        }
        return () => {
            clearInterval(refetchInterval);
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        if (parentType === 'post') {
            if (data && data?.post && data?.post?.comments) {
                setComments(data?.post?.comments);
            }
        } else if (parentType === 'comment') {
            if (data && data?.comment && data?.comment?.subComments) {
                setComments(data?.comment?.subComments);
            }
        }
    }, [data]);

    const handleAddComment = async (caption: string, imageUrls: string[]) => {
        try {
            const res = await addComment({
                variables: {
                    data: {
                        post: {link: parentId},
                        user: {link: user?._id},
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
                    if (parentType === 'comment') {
                        status = await addCommentToComment({
                            variables: {parentCommentId: parentId, newCommentId: newCommentId},
                        });
                    } else {
                        if (replyTo === null) {
                            status = await addCommentToPost({
                                variables: {postId: parentId, newCommentId: newCommentId},
                            });
                            // console.log("status ", JSON.stringify(status))
                        } else if (replyTo) {
                            status = await addCommentToComment({
                                variables: {parentCommentId: replyTo, newCommentId: newCommentId},
                            });
                            // console.log("status ", JSON.stringify(status))
                        }
                    }
                    
                    //console.log(`Successfully added comment id to ${replyTo? "comment" : "post"}`);
                    return newCommentId;
                } catch (error) {
                    Logger(
                        ErrorType.OTHER,
                        'CommentScreen',
                        error,
                        'src/components/screens/posts/comment/CommentScreen.tsx',
                        140,
                        0,
                        `Failed to add comment id to ${replyTo ? 'comment' : 'post'} error.`,
                        null,
                        'NO ENDPOINT',
                        {props},
                    );
                }
            }
        } catch (error) {
            Logger(
                ErrorType.OTHER,
                'CommentScreen',
                error,
                'src/components/screens/posts/comment/CommentScreen.tsx',
                123,
                0,
                `Failed to add comment to post: ${parentId} with user: ${user?._id}.`,
                null,
                'NO ENDPOINT',
                {props},
            );
        }
    };

    const handleReplyToComment = (index: number, commentId: string) => {
        setReplyTo(commentId);
        setInReplyMode(true);
        flatListRef?.current?.scrollToIndex({
            animated: true,
            index: index,
        });
        inputRef?.current?.focus();
    };

    const addNewReply = useCallback(
        (commentText: string) => {
            handleAddComment(commentText, []).then((newCommentId) => {
                setComments((prev) => {
                    const _id = newCommentId;
                    setNewReplyId(_id);
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
                            const commentCopy = {...comment};
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
        [replyTo],
    );

    const newReplyCleanup = useCallback(() => {
        const itemIndex = comments.findIndex((item) => item?._id === newReplyId);
        const itemParentIndex = comments.findIndex((item) => item?._id === replyTo);
        if (itemIndex !== -1) {
            flatListRef?.current?.scrollToIndex({
                animated: true,
                index: itemIndex,
            });
        }
        if (itemParentIndex !== -1) {
            flatListRef?.current?.scrollToIndex({
                animated: true,
                index: itemParentIndex,
                viewPosition: 1,
            });
        }
        setReplyTo(null);
        setNewReplyId(null);
    }, [comments]);

    if (loading) {
        return <ActivityIndicator/>;
    }

    if (error) {
        return <MemareeText>{error.message}</MemareeText>;
    }

    return (
        <KeyboardAvoidingView
            style={screenRoot}
            behavior={Platform.select({android: undefined, ios: 'padding'})}
            keyboardVerticalOffset={Platform.select({ios: headerHeight, android: headerHeight})}
        >
            {props?.route?.params?.posterCaption?.caption && (
                <View style={[CommentStyles.listItemContent]}>
                    <View style={[
                        CommentStyles.commentListItem,
                        {backgroundColor: colors.background, marginLeft: 13},
                    ]}>
                        <View style={[CommentStyles.topRow]}>
                            <TouchableOpacity
                                onPress={() => () => {
                                    if (user?._id === props?.route?.params?.posterCaption?.posterId) {
                                        navigation.navigate('SelfProfileScreen');
                                    } else {
                                        navigation.navigate('OtherProfileScreen', {
                                            id: props?.route?.params?.posterCaption?.posterId,
                                        });
                                    }
                                }}
                            >
                                <View style={[CommentStyles.avatarContainer]}>
                                    <GradientAvatar
                                        source={props?.route?.params?.posterCaption?.poster}
                                        size={CommentStyles.avatarSize}
                                        style={CommentStyles.avatarContainer}
                                    />
                                </View>
                            </TouchableOpacity>
                            <View>
                                <MemareeText style={{color: colors.text}}>
                                    {props?.route?.params?.posterCaption?.name}
                                </MemareeText>
                                <MemareeText
                                    style={{
                                        width: ptValue,
                                        color: colors.text,
                                        marginTop: 0,
                                        fontFamily: 'Outfit',
                                    }}
                                >
                                    {props?.route?.params?.posterCaption?.caption}
                                </MemareeText>
                            </View>
                        </View>
                    </View>
                    <View style={{width: screenWidth}}>
                        <Divider color="#2F2F2F" orientation="horizontal" width={3}/>
                    </View>
                </View>
            )}
            <FlashList
                data={comments}
                contentContainerStyle={inReplyMode ? CommentStyles.replyMode : null}
                ref={flatListRef}
                estimatedItemSize={230}
                renderItem={(prop) => (
                    <CommentThread
                        {...prop}
                        target={'Cell'}
                        enableReplies={props?.route?.params?.enableReplies}
                        ReplyToComment={handleReplyToComment}
                    />
                )}
            />
            <View style={{marginBottom: inReplyMode ? 20 : 40}}>
                <Divider color="#2F2F2F" orientation="horizontal" width={1}/>
                <View
                    style={{
                        flex: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginRight: 20,
                        paddingTop: 20,
                        width: isFocused ? ScreenWidth - 45 : ScreenWidth,
                    }}
                >
                    {isFocused && (
                        <GradientAvatar
                            size={45}
                            source={user?.profilePicUrl}
                            style={{backgroundColor: 'green'}}
                        />
                    )}
                    <TextAndImageInput
                        isFocused={isFocused}
                        handleFocus={handleFocus}
                        handleBlur={handleBlur}
                        handleSubmit={addNewReply}
                        inputRef={inputRef}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default CommentScreen;