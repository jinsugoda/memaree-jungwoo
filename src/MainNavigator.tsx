import React, { useEffect } from 'react';
import { StatusBar, View, NativeModules, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { HiddenItem, OverflowMenu, OverflowMenuProvider } from 'react-navigation-header-buttons';

// splash screen
import * as SplashScreen from 'expo-splash-screen';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';
import { RootStackParamList } from 'types/Screens';
import { useTheme } from 'react-native-paper';

// 3rd party hooks
import useAuth from './hooks/useAuth';
import useUserQuery from './hooks/useUserQuery';

// custom components - tos and policy screens
import TermsOfUseScreen from 'components/screens/settings/TermsOfUseScreen';
import PrivacyPolicyScreen from 'components/screens/settings/PrivacyPolicyScreen';

// custom components - registeration screens
import CreateAccountDetailsScreen from 'components/screens/auth/accountCreation/CreateAccountDetailsScreen';
import CreateAccountConfirmationScreen from 'components/screens/auth/accountCreation/CreateAccountConfirmationScreen';

// custom components - onboarding screen
import OnboardingScreen from 'components/screens/onboarding/OnBoardingScreen';

// custom components - login and home screens
import LoginSignupScreen from 'components/screens/auth/login/LoginSignupScreen';
import LoginScreen from 'components/screens/auth/login/LoginScreen';
import ForgotPasswordScreen from 'components/screens/auth/passwordRecovery/ForgotPasswordScreen';
import HomeScreen from 'components/screens/home/HomeScreen';

// custom components - search screen
import SearchScreen from 'components/screens/searchScreen/SearchScreen';

// custom components - circle screen
import CircleUserListScreen from 'components/screens/circle/CircleUserListScreen';

// custom component - view notifications screen
import NotificationScreen from 'components/screens/notifications/NotificationScreen';

// custom components - general components
import CommentScreen from 'components/screens/posts/comment/CommentScreen';

// custom component - group screen
import GroupPreviewScreen from 'components/screens/groups/GroupsPreviewScreen';
import { EditGroupScreen } from 'components/screens/groups/crud/EditGroupScreen';
import { CreateGroupScreen } from 'components/screens/groups/crud/CreateGroupScreen';
import { CreateGroupScreenImage } from 'components/screens/groups/crud/CreateGroupScreenImage';

// custom components - profile screens
import EditUserInfoScreen from 'components/screens/profile/editScreens/EditUserInfoScreen';
import SettingsScreen from 'components/screens/settings/SettingsScreen';
import { EditProfileScreen } from 'components/screens/profile/editScreens/EditProfileScreen';

// custom components - uploading screens
import EditingScreen from 'components/screens/posts/Editing/Editing';
import PreviewScreen from 'components/screens/posts/PreviewScreen';
import TakePhotoScreen from 'components/screens/posts/TakePhotoScreen';

// custom components - buttons
import { LeaveButton } from 'components/common/buttons/other/Leave';
import { BackButton } from 'components/common/buttons/navigation/BackButton';

// styles
import { Colors } from 'styles';

import * as NavigationBar from 'expo-navigation-bar';
import PeopleScreen from 'components/screens/circle/PeopleScreen';
import InviteUsersScreen from 'components/screens/searchScreen/InviteUsersScreen';
import MemareeText from 'components/common/textAndInputs/MemareeText';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
    const { colors }: CustomTheme = useTheme();
    const { cognitoUser, isLoading, isDone, event, logout } = useAuth();
    const { userLoading } = useUserQuery(cognitoUser, event, isDone);

    const isSignedIn = !!cognitoUser;

    StatusBar.setBarStyle('light-content');

    // logout();

    SplashScreen.preventAutoHideAsync();

    useEffect(() => {
        if (Platform.OS === 'android') {
            NavigationBar.setBackgroundColorAsync(colors.background);
        }
        if (!isLoading && !userLoading) {
            SplashScreen.hideAsync();
        }
    }, [isLoading, userLoading]);

    const headerStyles = {
        headerTintColor: colors.text,
        headerTitleStyle: {
            color: colors.text,
            marginLeft: -10,
            fontFamily: 'Outfit-Bold',
        },
        headerBackTitle: null,
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
            paddingLeft: 10,
        },
        headerStyle: {
            height: 70,
            backgroundColor: colors.background,
            shadowColor: colors.shadow,
        },
    };

    return (
        <OverflowMenuProvider>
            <>
                <View>
                    {/* <StatusBar animated={true} style={"dark-content"} /> */}
                    <StatusBar animated={true} backgroundColor={colors.background} />
                </View>
                {cognitoUser !== undefined ? (
                    <Stack.Navigator
                        screenOptions={{
                            headerTitleAlign: 'center',
                            headerStyle: {
                                backgroundColor: colors.background,
                            },
                            headerTintColor: Colors.darkText,
                            headerTitleStyle: {
                                fontFamily: 'Outfit-Bold',
                                color: colors.text,
                            },
                            cardStyle: { backgroundColor: colors.background }, // background color of the whole app
                            cardShadowEnabled: false,
                            headerShadowVisible: false,
                        }}
                    >
                        {isSignedIn ? (
                            <Stack.Group>
                                {cognitoUser['attributes']['custom:firstTime'] === '1' && (
                                    <Stack.Screen
                                        options={{ headerShown: false }}
                                        name="OnboardingScreen"
                                        component={OnboardingScreen}
                                    />
                                )}
                                <Stack.Screen
                                    name="HomeScreen"
                                    component={HomeScreen}
                                    options={{ headerShown: false, ...headerStyles }}
                                />
                                {cognitoUser['attributes']['custom:firstTime'] !== '1' && (
                                    <Stack.Screen
                                        options={{ headerShown: false }}
                                        name="OnboardingScreen"
                                        component={OnboardingScreen}
                                    />
                                )}
                                <Stack.Screen
                                    name="PreviewScreen"
                                    component={PreviewScreen}
                                    options={{
                                        headerTintColor: colors.text,
                                    }}
                                />

                                <Stack.Screen
                                    name="TakePhotoScreen"
                                    component={TakePhotoScreen}
                                    options={({ route }) => ({
                                        ...headerStyles,
                                        title: route?.params?.name,
                                        headerTintColor: colors.text,
                                    })}
                                />

                                <Stack.Screen
                                    name="SettingsScreen"
                                    component={SettingsScreen}
                                    options={({ route }) => ({
                                        ...headerStyles,
                                        headerTitle: 'Settings',
                                    })}
                                />

                                <Stack.Screen
                                    name="EditProfileScreen"
                                    component={EditProfileScreen}
                                    options={({ route }) => ({
                                        ...headerStyles,
                                        headerTitle: 'Edit Profile',
                                    })}
                                />

                                <Stack.Screen
                                    name="InviteUsersScreen"
                                    component={InviteUsersScreen}
                                    options={({ route }) => ({
                                        ...headerStyles,
                                        headerTitle: 'Invite People',
                                    })}
                                />

                                <Stack.Screen
                                    name="CommentScreen"
                                    component={CommentScreen}
                                    options={({ navigation }) => ({
                                        ...headerStyles,
                                        headerTitleAlign: 'center',
                                        title: 'Comments',
                                        headerRight: () => (
                                            <OverflowMenu
                                                OverflowIcon={() => (
                                                    <Ionicons
                                                        name="ellipsis-horizontal"
                                                        size={18}
                                                    />
                                                )}
                                            >
                                                <HiddenItem
                                                    title="option 1"
                                                    onPress={() => alert('option 1')}
                                                />
                                                <HiddenItem
                                                    title="option 2"
                                                    onPress={() => alert('option 2')}
                                                />
                                                <HiddenItem
                                                    title="option 2"
                                                    onPress={() => alert('option 2')}
                                                />
                                            </OverflowMenu>
                                        ),
                                    })}
                                />

                                <Stack.Screen
                                    name="NotificationScreen"
                                    component={NotificationScreen}
                                    options={({ navigation }) => ({
                                        ...headerStyles,
                                        headerTitleAlign: 'center',
                                        title: 'Notifications',
                                        // headerLeft: () => (<BackButton />),
                                    })}
                                />

                                <Stack.Screen
                                    name="PeopleScreen"
                                    component={PeopleScreen}
                                    options={({ navigation }) => ({
                                        ...headerStyles,
                                        headerTitleAlign: 'center',
                                        headerTitle: () => (
                                            <MemareeText
                                                style={{
                                                    fontSize: 22,
                                                    // fontFamily: 'Outfit',
                                                    color: colors.text,
                                                }}
                                            >
                                                People
                                            </MemareeText>
                                        ),
                                        // headerLeft: () => (<BackButton />),
                                    })}
                                />

                                <Stack.Screen
                                    name="CircleUserListScreen"
                                    component={CircleUserListScreen}
                                    options={({ route }) => ({
                                        ...headerStyles,
                                        title: route.params.screenTitle,
                                        // headerLeft: () => (<BackButton />),
                                    })}
                                />

                                <Stack.Screen
                                    name="GroupPreviewScreen"
                                    component={GroupPreviewScreen}
                                    options={() => ({
                                        ...headerStyles,
                                        title: 'Groups',
                                        // headerLeft: () => (<BackButton />),
                                        headerRight: () => (
                                            <OverflowMenu
                                                OverflowIcon={() => (
                                                    <Ionicons
                                                        name="ellipsis-horizontal"
                                                        size={18}
                                                    />
                                                )}
                                            >
                                                <HiddenItem
                                                    title="option 1"
                                                    onPress={() => alert('option 1')}
                                                />
                                            </OverflowMenu>
                                        ),
                                    })}
                                />

                                <Stack.Screen
                                    name="EditGroupScreen"
                                    component={EditGroupScreen}
                                    options={({ route }) => ({
                                        ...headerStyles,
                                        title: 'People',
                                        headerTitleAlign: 'center',
                                        // headerLeft: () => (<BackButton />),
                                        headerRight: () => (
                                            <LeaveButton groupId={route.params.groupId} />
                                        ),
                                    })}
                                />

                                <Stack.Screen
                                    name="CreateGroupScreen"
                                    component={CreateGroupScreen}
                                    options={() => ({
                                        ...headerStyles,
                                        // headerLeft: () => (<BackButton />),
                                    })}
                                />
                                <Stack.Screen
                                    name="CreateGroupScreenImage"
                                    component={CreateGroupScreenImage}
                                    options={() => ({
                                        ...headerStyles,
                                        title: 'Create Group',
                                        // headerLeft: () => (<BackButton />),
                                    })}
                                />
                            </Stack.Group>
                        ) : (
                            <Stack.Group>
                                <Stack.Screen
                                    name={'LoginSignupScreen'}
                                    component={LoginSignupScreen}
                                    options={{ ...headerStyles, title: '' }}
                                />
                                <Stack.Screen
                                    name={'LoginScreen'}
                                    component={LoginScreen}
                                    options={{ ...headerStyles, title: 'Log In' }}
                                />
                                <Stack.Screen
                                    name={'ForgotPasswordScreen'}
                                    component={ForgotPasswordScreen}
                                    options={{ ...headerStyles, title: 'Forgot Password' }}
                                />
                            </Stack.Group>
                        )}
                        <Stack.Screen
                            name="TermsOfUseScreen"
                            component={TermsOfUseScreen}
                            options={() => ({
                                ...headerStyles,
                                title: 'Terms of Use',
                                headerTitleAlign: 'center',
                                // headerLeft: () => <BackButton />,
                            })}
                        />
                        <Stack.Screen
                            name="PrivacyPolicyScreen"
                            component={PrivacyPolicyScreen}
                            options={() => ({
                                ...headerStyles,
                                title: 'Privacy Policy',
                                headerTitleAlign: 'center',
                                // headerLeft: () => <BackButton />,
                            })}
                        />
                        <Stack.Screen
                            name={'CreateAccountDetailsScreen'}
                            component={CreateAccountDetailsScreen}
                            options={{
                                ...headerStyles,
                                title: 'Sign Up',
                                headerMode: 'screen',
                            }}
                        />
                        <Stack.Screen
                            name={'CreateAccountConfirmationScreen'}
                            component={CreateAccountConfirmationScreen}
                            options={{ ...headerStyles, title: 'Confirm' }}
                        />
                    </Stack.Navigator>
                ) : (
                    <View style={{ flex: 1, backgroundColor: colors.background }}></View>
                )}
            </>
        </OverflowMenuProvider>
    );
};

export default MainNavigator;
