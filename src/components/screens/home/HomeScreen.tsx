import React, { useRef, useState, useCallback } from 'react';
import { Dimensions, LogBox } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButtons } from 'react-navigation-header-buttons';
import BottomSheet from '@gorhom/bottom-sheet';
import { Ionicons, Foundation, Octicons } from '@expo/vector-icons';

//types
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

// redux
import { selectUser } from 'store/slices/userSlice';

// custom components - titles
import { SearchTitle } from 'components/common/misc/Titles';

// custom components - tab screens
import SearchScreen from 'components/screens/searchScreen/SearchScreen';
import { GroupCardScreen } from '../groups/GroupCardScreen';

// custom components - misc screens
import { GroupsScreen } from 'components/screens/groups/GroupsScreen';
import ViewPostScreen from 'components/screens/posts/ViewPostScreen';
import FeedScreen from 'components/screens/feed/mainFeedScreens/FeedScreen';

// custom components - buttons
import NotificationButton from 'components/screens/notifications/buttons/NotificationButton';
import { BackButton } from 'components/common/buttons/navigation/BackButton';
import AddPostButton from 'components/common/buttons/navigation/AddPostButton';
import BottomTabNavigationButton from 'components/common/buttons/navigation/BottomTabNavigationButton';
import IoniconsHeaderButton from 'components/common/buttons/navigation/IoniconsHeaderButton';

// custom components - modals
import AddScreenModal from 'components/common/bottomMenuModals/AddScreenModal';
import SharePostModal from 'components/common/bottomMenuModals/SharePostModal';
import PostOptionsModal from 'components/common/bottomMenuModals/PostOptionsModal';

// profile screens
import OtherProfileScreen from 'components/screens/profile/OtherProfileScreen';
import SelfProfileScreen from 'components/screens//profile/SelfProfileScreen';

// styles
import { Colors, HomeStyles } from 'styles';

// svg assets
import HomeButtonSVG from 'assets/buttonIcons/home/HomeIcon.svg';
import HomeOutlineButtonSVG from 'assets/buttonIcons/home/HomeOutlineIcon.svg';
import SearchOutlineButtonSVG from 'assets/buttonIcons/general/SearchOutlineIcon.svg';
import SearchFilledButtonSVG from 'assets/buttonIcons/general/SearchFilledIcon.svg';
import GroupsButtonSVG from 'assets/buttonIcons/general/GroupsIcon.svg';
import ProfileOutlineButtonSVG from 'assets/buttonIcons/general/ProfileOutlinedIcon.svg';
import ProfileFilledButtonSVG from 'assets/buttonIcons/general/ProfileFilledIcon.svg';
import MemareeButton from 'assets/generalSVGs/MemareeButton.svg';

const Tab = createBottomTabNavigator();

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
const HomeScreen = (props: HomeScreenProps) => {
    const { colors }: CustomTheme = useTheme();

    const [posterId, setPosterId] = useState('');
    const [postId, setPostId] = useState('');
    const headerStyles = {
        headerTintColor: colors.text,
        headerTitleStyle: {
            color: colors.text,
            marginLeft: -10,
        },
        headerBackTitle: null,
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
            paddingLeft: 10,
        },
        headerStyle: {
            backgroundColor: colors.background,
            shadowColor: colors.shadow,
        },
    };
    // bottom model refs
    const AddBottomSheetRef = useRef<BottomSheet>(null);
    const ShareBottomSheetRef = useRef<BottomSheet>(null);
    const postBottomSheetRef = useRef<BottomSheet>(null);

    const navigation = props?.navigation;

    const openPostOptionsBottomSheet = useCallback(
        (posterId: string, postId: string) => {
            setPosterId(posterId);
            setPostId(postId);
            postBottomSheetRef?.current?.expand();
        },
        [posterId, postId],
    );

    const openSharePostBottomSheet = useCallback(
        (postId) => {
            setPostId(postId);
            ShareBottomSheetRef?.current?.expand();
        },
        [postId],
    );

    //get device height
    const screenHeight = Dimensions.get('window').width;
    const ptValue = screenHeight * 0.0075;
    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
    return (
        <>
            <Tab.Navigator
                backBehavior={'history'}
                initialRouteName={'FeedScreen'}
                screenOptions={({ route }) => ({
                    tabBarHideOnKeyboard: true,
                    presentation: 'transparentModal',
                    tabBarActiveTintColor: Colors.primary,
                    tabBarInactiveTintColor: Colors.black,
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'Outfit-Bold',
                        color: colors.text,
                    },
                    tabBarStyle: {
                        backgroundColor: colors.background,
                        marginBottom: 7,
                        paddingBottom: 7,
                        borderTopWidth: 0,
                        marginTop: ptValue - 3,
                    },
                    tabBarLabelStyle: { fontFamily: 'Outfit-Bold' },
                    tabBarShowLabel: false,
                    headerStyle: {
                        backgroundColor: colors.background,
                        shadowColor: colors.background,
                    },
                    cardStyle: { backgroundColor: colors.background },
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                            <NotificationButton
                                containerStyle={{ marginLeft: 10 }}
                                onPress={() => navigation?.navigate('NotificationScreen')}
                            />
                        </HeaderButtons>
                    ),
                    headerRight: () => <></>,
                })}
            >
                <Tab.Screen
                    name="FeedScreen"
                    component={FeedScreen}
                    initialParams={{
                        openPostOptionsBottomSheet,
                        openSharePostBottomSheet,
                    }}
                    options={{
                        headerTitle: () => <MemareeButton width={40} height={40} />,
                        tabBarIcon: ({ focused, color }) => {
                            return (
                                <BottomTabNavigationButton
                                    icon={HomeButtonSVG}
                                    // fill={focused ? null : colors.background}
                                    fillOpacity={focused ? 1 : 0}
                                    label={'Home'}
                                    notification={0}
                                    selector={focused}
                                    size={28}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="SearchScreen"
                    component={SearchScreen}
                    initialParams={{ openPostOptionsBottomSheet, openSharePostBottomSheet }}
                    options={{
                        headerTitle: (props) => <SearchTitle />,
                        tabBarIcon: ({ focused }) => {
                            return (
                                <BottomTabNavigationButton
                                    icon={focused ? SearchFilledButtonSVG : SearchOutlineButtonSVG}
                                    label={'Search'}
                                    notification={0}
                                    selector={focused}
                                    size={28}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Add"
                    component={AddScreenModal}
                    options={{
                        tabBarButton: (props) => {
                            return (
                                <AddPostButton
                                    size={null}
                                    {...props}
                                    onPress={() =>
                                        navigation.navigate('TakePhotoScreen', {
                                            name: ' ',
                                            type: 'createPost',
                                        })
                                    }
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="GroupCardScreen"
                    component={GroupCardScreen}
                    initialParams={{
                        openPostOptionsBottomSheet,
                        openSharePostBottomSheet,
                    }}
                    options={{
                        headerTitle: () => '',
                        tabBarIcon: ({ focused }) => {
                            return (
                                <BottomTabNavigationButton
                                    icon={GroupsButtonSVG}
                                    fill={focused ? colors.tertiary : colors.background}
                                    stroke={focused ? colors.tertiary : 'white'}
                                    label={'Groups'}
                                    notification={0}
                                    selector={focused}
                                    size={28}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="SelfProfileScreen"
                    component={SelfProfileScreen}
                    options={() => ({
                        ...headerStyles,
                        tabBarIcon: ({ focused }) => {
                            return (
                                <BottomTabNavigationButton
                                    icon={
                                        focused ? ProfileFilledButtonSVG : ProfileOutlineButtonSVG
                                    }
                                    stroke={'none'}
                                    label={'Profile'}
                                    notification={0}
                                    selector={focused}
                                    size={28}
                                />
                            );
                        },
                    })}
                />
                <Tab.Screen
                    name="ViewPostScreen"
                    component={ViewPostScreen}
                    options={() => ({
                        presentation: 'transparentModal',
                        cardStyle: { backgroundColor: colors.background },
                        headerTitleAlign: 'center',
                        // headerLeft: () => <BackButton />,
                        tabBarItemStyle: { display: 'none' },
                    })}
                />
                <Tab.Screen
                    name="GroupsScreen"
                    component={GroupsScreen}
                    options={() => ({
                        presentation: 'transparentModal',
                        cardStyle: { backgroundColor: colors.background },
                        headerTitleAlign: 'center',
                        // headerLeft: () => <BackButton />,
                        tabBarItemStyle: { display: 'none' },
                    })}
                />

                <Tab.Screen
                    name="OtherProfileScreen"
                    component={OtherProfileScreen}
                    options={() => ({
                        ...headerStyles,
                        tabBarItemStyle: { display: 'none' },
                    })}
                />
            </Tab.Navigator>
            <AddScreenModal bottomSheetRef={AddBottomSheetRef} />
            <SharePostModal bottomSheetRef={ShareBottomSheetRef} postId={postId} />
            <PostOptionsModal
                bottomSheetRef={postBottomSheetRef}
                posterId={posterId}
                postId={postId}
            />
        </>
    );
};
export default HomeScreen;
