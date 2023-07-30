import React, { useRef } from 'react';
import { View, Animated, Dimensions, Text, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

// time formatting lib
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { List, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// redux
import { useSelector } from 'react-redux';
import { selectUserId } from 'store/slices/userSlice';

// utils
import { DateBetween } from 'utils/customFormatters';

// custom components
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';
import MemareeText from 'components/common/textAndInputs/MemareeText';
import RoundedImage from 'components/common/images/RoundedImage';

// styles
import { NotificationsStyles } from 'styles';

const Notification = (props) => {
    const { colors }: CustomTheme = useTheme();
    const { handleDeleteNotification } = props;
    const translateX = useRef(new Animated.Value(0))?.current;
    const screenWidth = Dimensions.get('window').width;
    const userID = useSelector(selectUserId);
    // name, profilePic, action, postUrl, seen, postPreview, time, id,
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const onPanGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: translateX,
                },
            },
        ],
        { useNativeDriver: true },
    );

    const onPanHandlerStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            if (event.nativeEvent.translationX * -1 > screenWidth * 0.4) {
                Animated.timing(translateX, {
                    toValue: screenWidth,
                    duration: 0,
                    useNativeDriver: true,
                }).start(() => {
                    handleDeleteNotification(props?._id);
                });
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }).start();
            } else {
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            }
        }
    };

    let text;

    switch (props?.type) {
        case 'post-comment':
            text = `Commented: ${props?.comment?.content?.caption}`;
            break;

        case 'reply-comment':
            text = `Replied to a Commented: ${props?.commentBody}`;
            break;

        case 'remembered-post':
            text = 'Remembered your post.';
            break;
        case 'remembered-profile':
            text = 'Remembered your profile.';
            break;
        case 'new-group-post':
            text = `New Post in ${props?.group?.name}`;
            break;
        default:
            text = 'New post';
            break;
    }

    return (
        <>
            <PanGestureHandler
                key={`Pa${props?._id}`}
                onGestureEvent={onPanGestureEvent}
                onHandlerStateChange={onPanHandlerStateChange}
                activeOffsetX={[-10, 10]}
            >
                <Animated.View
                    key={`An${props?._id}`}
                    style={[
                        {
                            transform: [
                                {
                                    translateX: translateX.interpolate({
                                        inputRange: [-screenWidth, 0],
                                        outputRange: [-screenWidth, 0],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <TouchableOpacity
                        key={`To${props?._id}`}
                        style={[
                            NotificationsStyles.container,
                            { flex: 1, justifyContent: 'center' },
                        ]}
                        onPress={() => {
                            handleDeleteNotification(props?._id);
                            if (props?.type === 'new-group-post') {
                                navigation.navigate('GroupsScreen', {
                                    screenTitle: props?.group?.name,
                                    groupId: props?.group?._id,
                                    owner: props?.group?.owner._id,
                                });
                            } else {
                                navigation.navigate('ViewPostScreen', { post: props?.post });
                            }
                        }}
                    >
                        <View style={{ width: '100%', height: 60 }}>
                            <List.Item
                                key={`Li${props?._id}`}
                                title={`${props?.fromUser?.username}   ${DateBetween(
                                    props?.createdAt,
                                )}`}
                                titleStyle={{ color: colors.text }}
                                description={text}
                                descriptionStyle={{ color: colors.text }}
                                left={() => (
                                    <TouchableOpacity
                                        key={`Tou${props?._id}`}
                                        onPress={() => {
                                            if (userID === props?.fromUser?._id) {
                                                navigation.navigate('SelfProfileScreen');
                                            } else {
                                                navigation.navigate('OtherProfileScreen', {
                                                    id: props?.fromUser?._id,
                                                });
                                            }
                                        }}
                                    >
                                        <GradientAvatar
                                            key={`Ga${props?._id}`}
                                            source={props?.fromUser?.profilePicUrl}
                                            size={56}
                                        />
                                    </TouchableOpacity>
                                )}
                                right={() => (
                                    <View
                                        key={`View2${props?._id}`}
                                        style={[
                                            NotificationsStyles.postPreview,
                                            {
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            },
                                        ]}
                                    >
                                        <RoundedImage
                                            key={`Im${props?._id}`}
                                            imageStyle={[
                                                NotificationsStyles.postPreview,
                                                { height: '100%', aspectRatio: 1 },
                                            ]}
                                            postCardSmall={true}
                                            uri={props?.post?.signedUrl}
                                            borderRadius={6}
                                            thumbnail={true}
                                        />
                                    </View>
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </PanGestureHandler>
        </>
    );
};

export default Notification;
