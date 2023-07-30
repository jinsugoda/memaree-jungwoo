import React, { useLayoutEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomSheetModal from '@gorhom/bottom-sheet';
import { throttle } from 'lodash';

// types
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Screens';
import { gql } from '@apollo/client';

// 3rd party hooks
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

// redux
import { selectUser } from 'store/slices/userSlice';

// feed components
import UserVisionFeed from 'components/screens/feed/userFeeds/UserVisionFeed';
import UserCircleFeed from 'components/screens/feed/userFeeds/UserCircleFeed';

// custom components
import ProfileModal from 'components/common/bottomMenuModals/ProfileModal';
import ProfileHeaderRight from './components/ProfileHeaderRight';
import MemareeText from 'components/common/textAndInputs/MemareeText';
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';
import { BackButton } from 'components/common/buttons/navigation/BackButton';

// utils - formatter
import { ShorttenText } from 'utils/customFormatters';

// styles
import { TabNavigator, contentContainer } from 'components/screens/profile/style/ProfileStyles';
import { CustomTheme } from 'styles/theme/customThemeProps';

// svg icons
import { CircleTitle, VisionTitle } from 'components/common/misc/Titles';
import Animated, { SlideOutUp } from 'react-native-reanimated';
import { Layout } from 'react-native-reanimated';

export const GET_USER = gql`
    query {
        userContext {
            _id
            profilePicUrl
            username
            displayName
            bio
            firstName
            isFriend
            stats {
                rememberedByCount
                circleCount
            }
        }
    }
`;

const Tab = createMaterialTopTabNavigator();

type SelfProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'SelfProfileScreen'>;

const SelfProfileScreen = (props: SelfProfileScreenProps) => {
    const { colors }: CustomTheme = useTheme();
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const user = useSelector(selectUser);

    const [isTruncated, setIsTruncated] = useState(false);
    const [showHeader, setShowHeader] = useState(true);

    const screenWidth = Dimensions.get('window').width;

    useLayoutEffect(() => {
        props?.navigation.setOptions({
            headerTitle: () => (
                <MemareeText
                    style={{
                        fontSize: 23,
                        color: colors.text,
                    }}
                >
                    {ShorttenText(user?.username ?? '', 20)}
                </MemareeText>
            ),
            headerLeft: () => <BackButton />,
            headerRight: () => (
                <ProfileHeaderRight isCurrentUser={true} bottomSheetRef={bottomSheetRef} />
            ),
        });
    }, []);

    const handleScroll = throttle((event) => {
        try {
            const { velocity } = event.nativeEvent;

            let isScrollingUp = true;

            if (velocity) {
                isScrollingUp = velocity.y > 0;
            }

            if (isScrollingUp) {
                setShowHeader(true);
            } else {
                setShowHeader(false);
            }
        } catch (err) {
            console.log('self profile screen handle scroll throttle error: ', err);
        }
    }, 16);

    return (
        <>
            <SafeAreaProvider>
                {showHeader && (
                    <Animated.View
                        style={{
                            paddingHorizontal: 16,
                            flexDirection: 'row',
                        }}
                        exiting={SlideOutUp}
                        layout={Layout}
                    >
                        <View style={{ marginRight: 20, flexShrink: 0 }}>
                            <GradientAvatar
                                size={screenWidth * 0.3}
                                source={user?.profilePicUrl}
                                style={{ alignSelf: 'center', marginBottom: 12 }}
                            />
                        </View>
                        <View style={{ flexShrink: 1 }}>
                            <View style={{ flexGrow: 0 }}>
                                <View style={{ marginBottom: 4 }}>
                                    <MemareeText
                                        style={{
                                            color: colors.text,
                                            fontSize: 20,
                                        }}
                                    >
                                        {user?.displayName}
                                    </MemareeText>
                                </View>
                                <View
                                    style={{
                                        flexGrow: 0,
                                        marginBottom: 8,
                                    }}
                                >
                                    <MemareeText
                                        numberOfLines={isTruncated ? 10 : 3}
                                        style={{ color: colors.text, fontFamily: 'Outfit' }}
                                    >
                                        {user?.bio}
                                    </MemareeText>
                                </View>
                                {user?.bio.length > 90 ? (
                                    <TouchableOpacity onPress={() => setIsTruncated(!isTruncated)}>
                                        <MemareeText
                                            style={{
                                                fontSize: 12,
                                                color: colors.text,
                                                fontFamily: 'Outfit',
                                            }}
                                        >
                                            {isTruncated ? 'See less' : 'See more...'}
                                        </MemareeText>
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                        </View>
                    </Animated.View>
                )}
                <Animated.View style={[contentContainer]} layout={Layout}>
                    <Tab.Navigator
                        style={TabNavigator}
                        screenOptions={() => ({
                            tabBarIndicatorStyle: {
                                borderColor: colors.tab,
                                borderWidth: 2,
                            },
                            headerTitleStyle: {
                                fontFamily: 'Outfit-Bold',
                                color: colors.text,
                            },
                            tabBarActiveTintColor: colors.tertiary,
                            tabBarInactiveTintColor: colors.text,
                            headerShown: false,
                            presentation: 'transparentModal',
                            tabBarStyle: { backgroundColor: colors.background },
                            tabBarLabelStyle: { fontFamily: 'Outfit-Bold' },
                        })}
                    >
                        <Tab.Screen
                            name="UserVisionFeed"
                            options={{ tabBarLabel: VisionTitle }}
                            children={({ route }) => (
                                <UserVisionFeed
                                    route={{
                                        params: {
                                            ...route.params,
                                            userId: user?._id,
                                            onScroll: handleScroll,
                                        },
                                    }}
                                />
                            )}
                        />
                        <Tab.Screen
                            name="UserCircleFeed"
                            options={{ tabBarLabel: CircleTitle }}
                            children={({ route }) => (
                                <UserCircleFeed
                                    route={{
                                        params: {
                                            ...route.params,
                                            userId: user?._id,
                                            onScroll: handleScroll,
                                        },
                                    }}
                                />
                            )}
                        />
                    </Tab.Navigator>
                </Animated.View>
            </SafeAreaProvider>
            <ProfileModal bottomSheetRef={bottomSheetRef} />
        </>
    );
};

export default SelfProfileScreen;
