import React, { useRef } from 'react';
import { View, Animated, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

// time formatting lib
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

// types
import { notificationItem } from 'types/Item';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// custom components
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { NotificationsStyles } from 'styles';
import { ImageRotationFix } from 'styles/stylesheets/imagesStyles';

const MessageNotification = (props: notificationItem) => {
    const { colors }: CustomTheme = useTheme();
    const {
        name,
        profilePic,
        action,
        postUrl,
        seen,
        postPreview,
        time,
        id,
        handleDeleteNotification,
    } = props;
    const translateX = useRef(new Animated.Value(0))?.current;
    const screenWidth = Dimensions.get('window').width;

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
                    handleDeleteNotification(id);
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

    return (
        <View>
            <PanGestureHandler
                onGestureEvent={onPanGestureEvent}
                onHandlerStateChange={onPanHandlerStateChange}
            >
                <Animated.View
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
                    <TouchableOpacity style={NotificationsStyles.container} onPress={() => {}}>
                        <View style={NotificationsStyles.avatarContainer}>
                            <GradientAvatar source={profilePic} size={56} />
                        </View>
                        <View style={NotificationsStyles.textContainer}>
                            <MemareeText style={[NotificationsStyles.name, { color: colors.text }]}>
                                {name}
                            </MemareeText>
                            <View style={NotificationsStyles.actionPreview}>
                                <MemareeText
                                    style={[
                                        NotificationsStyles.actionPreviewText,
                                        { color: colors.text },
                                    ]}
                                >
                                    {action}
                                </MemareeText>
                            </View>
                        </View>
                        <View style={NotificationsStyles.time}>
                            <MemareeText
                                style={[NotificationsStyles.timeText, { color: colors.text }]}
                            >
                                {dayjs(time).fromNow()}
                            </MemareeText>
                        </View>
                        <View style={NotificationsStyles.notificationIndicatorContainer}>
                            {!seen && <View style={NotificationsStyles.notificationIndicator} />}
                        </View>
                        <View style={NotificationsStyles.postPreview}>
                            <Image
                                source={{ uri: `${postPreview}` }}
                                style={[NotificationsStyles.postPreview, ImageRotationFix]}
                                resizeMode="cover"
                                defaultSource={require('assets/400x400.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

export default MessageNotification;
