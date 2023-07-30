import React, { useLayoutEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomSheetModal from '@gorhom/bottom-sheet';
import Animated, { Layout, SlideOutUp } from 'react-native-reanimated';

// types
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useQuery } from '@apollo/client';
import { ActivityIndicator, useTheme } from 'react-native-paper';

// gpl queries
import { USER_QUERY } from './gpl/profileQueries';

// utils formatter
import { ShorttenText } from 'utils/customFormatters';

// custom components
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';
import ProfileModal from 'components/common/bottomMenuModals/ProfileModal';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { TabNavigator, contentContainer } from './style/ProfileStyles';

// svgs
import { CircleTitle, VisionTitle } from 'components/common/misc/Titles';
import { throttle } from 'lodash';
import RememberToggleButton from './components/RememberUserButton';
import CircleButton from './components/CircleButton';
import UserCircleFeed from '../feed/userFeeds/UserCircleFeed';
import UserVisionFeed from '../feed/userFeeds/UserVisionFeed';

const Tab = createMaterialTopTabNavigator();

type OtherProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'OtherProfileScreen'>;

const OtherProfileScreen = (props: OtherProfileScreenProps) => {
    const { colors }: CustomTheme = useTheme();
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const screenWidth = Dimensions.get('window').width;

    const [showHeader, setShowHeader] = useState(true);

    // Fetch these initial values from database...
    const [friendStatus, setFriendStatus] = useState('');
    const [remembered, setRemembered] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);

    const id = props?.route?.params?.id;

    // fetch profile using apollo client
    const { data, loading, error } = useQuery(USER_QUERY, {
        variables: { query: { _id: id }, limit: 1 },
        fetchPolicy: 'cache-and-network',
    });

    const profile = data?.user;

    useLayoutEffect(() => {
        if (profile) {
            props?.navigation.setOptions({
                headerTitle: () => (
                    <MemareeText
                        style={{
                            fontSize: 23,
                            color: colors.text,
                        }}
                    >
                        {profile?.username && ShorttenText(profile?.username ?? '', 20)}
                    </MemareeText>
                ),
                // headerLeft: () => <BackButton />,
                /* COMMENTED OUT FOR NOW UNTIL WE ADD REPORT AND BLOCK FUNCTIONALITY */
                // headerRight: () => (
                //   <ProfileHeaderRight
                //     isCurrentUser={false}
                //     bottomSheetRef={bottomSheetRef}
                //   />
                // ),
            });
            setFriendStatus(profile?.friendStatus);
            setRemembered(profile?.isRemembered);
        }
    }, [profile]);

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
            console.log('other profile handlescroll throttle error: ', err);
        }
    }, 16);

    if (loading || !data)
        return (
            <SafeAreaProvider style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </SafeAreaProvider>
        );
    if (error) return <MemareeText>Error! {error?.message}</MemareeText>;
    console.log('user', profile);
    return (
        <>
            <SafeAreaProvider>
                {showHeader && (
                    <Animated.View
                        style={{ marginBottom: 10 }}
                        exiting={SlideOutUp}
                        layout={Layout}
                    >
                        <View
                            style={{
                                paddingHorizontal: 16,
                                marginVertical: 4,
                                flexDirection: 'row',
                                marginBottom: 16,
                            }}
                        >
                            <View style={{ marginRight: 20 }}>
                                <GradientAvatar
                                    size={screenWidth * 0.3}
                                    source={profile?.profilePicUrl}
                                    style={{ alignSelf: 'center', marginBottom: 12 }}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <View
                                    style={{
                                        marginBottom: 4,
                                        flex: 0,
                                    }}
                                >
                                    <MemareeText
                                        style={{
                                            color: colors.text,
                                            fontSize: 20,
                                        }}
                                        numberOfLines={1}
                                    >
                                        {profile?.displayName}
                                    </MemareeText>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        marginBottom: 8,
                                    }}
                                >
                                    <MemareeText
                                        numberOfLines={isTruncated ? 10 : 3}
                                        adjustsFontSizeToFit={true}
                                        style={{ color: colors.text, fontFamily: 'Outfit' }}
                                    >
                                        {profile?.bio || 'bio'}
                                    </MemareeText>
                                </View>
                                {profile?.bio?.length > 90 ? (
                                    <TouchableOpacity onPress={() => setIsTruncated(!isTruncated)}>
                                        <MemareeText
                                            style={{
                                                fontSize: 12,
                                                color: colors.text,
                                                fontFamily: 'Outfit',
                                            }}
                                        >
                                            {isTruncated ? 'See less...' : 'See more...'}
                                        </MemareeText>
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                        </View>
                        <View
                            style={{
                                marginHorizontal: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}
                        >
                            <RememberToggleButton
                                rememberingUserId={id}
                                isRemembered={remembered}
                                setRemembered={setRemembered}
                            />
                            <CircleButton
                                circlingUserId={id}
                                friendStatus={friendStatus}
                                setFriendStatus={setFriendStatus}
                            />
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
                            tabBarActiveTintColor: colors.tab,
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
                                            userId: profile?._id,
                                            onScroll: handleScroll,
                                        },
                                    }}
                                />
                            )}
                        />
                        {friendStatus === 'friend' && (
                            <Tab.Screen
                                name="UserCircleFeed"
                                options={{ tabBarLabel: CircleTitle }}
                                children={({ route }) => (
                                    <UserCircleFeed
                                        route={{
                                            params: {
                                                ...route.params,
                                                userId: profile?._id,
                                                onScroll: handleScroll,
                                            },
                                        }}
                                    />
                                )}
                            />
                        )}
                    </Tab.Navigator>
                </Animated.View>
            </SafeAreaProvider>
            <ProfileModal bottomSheetRef={bottomSheetRef} />
        </>
    );
};

export default OtherProfileScreen;
