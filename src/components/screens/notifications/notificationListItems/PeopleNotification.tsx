import React, { useRef } from 'react';
import { View, Animated, Dimensions, Text, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Button, useTheme } from 'react-native-paper';

// time formatting lib
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

// types
import { RootStackParamList } from 'types/Screens';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomTheme } from 'styles/theme/customThemeProps';

//hook
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

// gpl queries
import { ADD_USER_TO_CIRCLE, JOIN_GROUP, JOIN_GROUP_USER } from '../gpl/query';
import { selectUserId } from 'store/slices/userSlice';

// utils
import { DateBetween } from 'utils/customFormatters';

// custom components
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { NotificationsStyles } from 'styles';

const PeopleNotification = (props) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const userID = useSelector(selectUserId);
    const { colors }: CustomTheme = useTheme();
    const { handleDeleteNotification } = props;
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
    const [addUserToCircleMutation] = useMutation(ADD_USER_TO_CIRCLE);
    const [joinGroup] = useMutation(JOIN_GROUP);
    const [joinGroupUser] = useMutation(JOIN_GROUP_USER);

    const submit = async () => {
        if (props?.type === 'add-to-circle') {
            await addUserToCircleMutation({
                variables: { input: { userId: props?.fromUser?._id } },
            });

            handleDeleteNotification(props?._id);
        } else if (props?.type === 'add-to-group') {
            const group = await joinGroup({
                variables: {
                    userId: userID,
                    groupId: props?.group._id,
                },
            });
            const User = await joinGroupUser({
                variables: {
                    groupId: props?.group._id,
                    userId: userID,
                },
            });
            if (group && User) handleDeleteNotification(props?._id);
        }
    };

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

    let content;

    switch (props?.type) {
        case 'add-to-circle':
            content = (
                <MemareeText
                    key={`Me${props?._id}`}
                    style={[NotificationsStyles.actionPreviewText, { color: colors.text }]}
                >
                    Sent a Circle Request
                </MemareeText>
            );
            break;
        case 'add-to-group':
            content = (
                <MemareeText
                    key={`Me${props?._id}`}
                    style={[NotificationsStyles.actionPreviewText, { color: colors.text }]}
                >
                    Sent a Group Request
                </MemareeText>
            );
            break;
        case 'user-remember':
            content = (
                <MemareeText
                    key={`Me${props?._id}`}
                    style={[NotificationsStyles.actionPreviewText, { color: colors.text }]}
                >
                    Remembered you
                </MemareeText>
            );
            break;
        default:
            break;
    }

    return (
        <PanGestureHandler
            onGestureEvent={onPanGestureEvent}
            onHandlerStateChange={onPanHandlerStateChange}
            key={`Pa${props?._id}`}
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
                        { flex: 1, justifyContent: 'space-between' },
                    ]}
                    onPress={
                        props?.type === 'user-remember'
                            ? () => {
                                  if (userID === props?.fromuser?._id) {
                                      navigation.navigate('SelfProfileScreen');
                                  } else {
                                      navigation.navigate('OtherProfileScreen', {
                                          id: props?.fromUser?._id,
                                      });
                                  }
                                  handleDeleteNotification(props?._id);
                              }
                            : null
                    }
                >
                    <View
                        key={`Vi${props?._id}`}
                        style={{
                            flex: 0,
                            width: '50%',
                            flexDirection: 'row',
                            flexShrink: 2,
                        }}
                    >
                        <TouchableOpacity
                            key={`Tou${props?._id}`}
                            style={[NotificationsStyles.avatarContainer, { width: 58 }]}
                            onPress={() => {
                                if (userID === props?.fromuser?._id) {
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
                        <View
                            key={`Vie${props?._id}`}
                            style={{ flexShrink: 1, width: '65%', flexDirection: 'column' }}
                        >
                            <View
                                key={`View${props?._id}`}
                                style={{
                                    flex: 0,
                                    flexDirection: 'row',
                                    width: '100%',
                                    alignItems: 'center',
                                }}
                            >
                                <MemareeText
                                    numberOfLines={1}
                                    key={`Te${props?._id}`}
                                    style={[NotificationsStyles.name, { color: colors.text }]}
                                >
                                    {props?.fromUser?.username}
                                </MemareeText>
                                <MemareeText
                                    key={`Tex${props?._id}`}
                                    style={[NotificationsStyles.timeText, { color: colors.text }]}
                                >
                                    {DateBetween(props?.createdAt)}
                                </MemareeText>
                            </View>
                            <View
                                key={`View2${props?._id}`}
                                style={[NotificationsStyles.actionPreview]}
                            >
                                {content}
                            </View>
                        </View>
                    </View>
                    <View
                        key={`View3${props?._id}`}
                        style={[
                            NotificationsStyles.postPreview,
                            { flexShrink: 3, width: '40%', justifyContent: 'center' },
                        ]}
                    >
                        {props?.type !== 'user-remember' && (
                            <Button
                                key={`Bu${props?._id}`}
                                labelStyle={{ color: 'black', fontFamily: 'Outfit-Bold' }}
                                onPress={() => {
                                    submit();
                                }}
                                style={{
                                    backgroundColor: colors.tertiary,
                                    borderColor: colors.tertiary,
                                    flex: 0,
                                    justifyContent: 'center',
                                    width: '100%',
                                    paddingVertical: 6,
                                }}
                            >
                                {props?.type === 'add-to-circle' ? `Add to Circle` : `Join Group`}
                            </Button>
                        )}
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </PanGestureHandler>
    );
};

export default PeopleNotification;
