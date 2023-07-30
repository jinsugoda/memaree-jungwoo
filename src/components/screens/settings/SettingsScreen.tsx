import React, { useState } from 'react';
import { Button, List, useTheme } from 'react-native-paper';

// types
import { RootStackParamList } from 'types/Screens';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 1st party hooks
import useAuth from 'hooks/useAuth';

// 3rd party hooks
import { useNavigation } from '@react-navigation/native';

// styles
import { ButtonStyles } from 'styles';
import { screenRoot } from 'styles/stylesheets/ScreenStyles';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

// constants
import { MEMAREE_URL } from '../../../../environment';
import { ScrollView, View } from 'react-native';
import MemareeText from 'components/common/textAndInputs/MemareeText';
import { Overlay } from '@rneui/base';
import { color } from 'react-native-reanimated';

import { useMutation } from '@apollo/client';
import { REMOVE_USER } from './gql/settingsQueries';
import { useSelector } from 'react-redux';
import { selectUserId } from 'store/slices/userSlice';

const SettingsScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { colors }: CustomTheme = useTheme();

    const { logout, deleteUser } = useAuth();

    const [modalVisible, setModalVisible] = useState(false);

    const [removeUser, { loading: loadingRemove }] = useMutation(REMOVE_USER);

    const userId = useSelector(selectUserId);
    return (
        <>
            <ScrollView>
                <List.Section style={[screenRoot]}>
                    <List.Item
                        title="Edit Profile"
                        onPress={() => navigation.navigate('EditProfileScreen')}
                        titleStyle={{
                            color: colors.text,
                            fontSize: 18,
                            fontFamily: 'Outfit-Bold',
                        }}
                        right={() => (
                            <FontAwesomeIcon
                                color={colors.text}
                                style={ButtonStyles.backButtonIcon}
                                icon={faChevronRight}
                                size={ButtonStyles.backButtonSize}
                            />
                        )}
                    />
                    {/* <List.Item
                        title="People"
                        onPress={() => navigation.navigate('PeopleScreen')}
                        titleStyle={{
                            color: colors.text,
                            fontSize: 18,
                            fontFamily: 'Outfit-Bold',
                        }}
                        right={() => (
                            <FontAwesomeIcon
                                color={colors.text}
                                style={ButtonStyles.backButtonIcon}
                                icon={faChevronRight}
                                size={ButtonStyles.backButtonSize}
                            />
                        )}
                    /> */}
                    <List.Item
                        title="Tutorial"
                        onPress={() => {
                            navigation.navigate('OnboardingScreen');
                        }}
                        titleStyle={{
                            color: colors.text,
                            fontSize: 18,
                            fontFamily: 'Outfit-Bold',
                        }}
                        right={() => (
                            <FontAwesomeIcon
                                color={colors.text}
                                style={ButtonStyles.backButtonIcon}
                                icon={faChevronRight}
                                size={ButtonStyles.backButtonSize}
                            />
                        )}
                    />
                    <List.Item
                        title="Invite People"
                        onPress={() => {
                            navigation.navigate('InviteUsersScreen');
                        }}
                        titleStyle={{
                            color: colors.text,
                            fontSize: 18,
                            fontFamily: 'Outfit-Bold',
                        }}
                        right={() => (
                            <FontAwesomeIcon
                                color={colors.text}
                                style={ButtonStyles.backButtonIcon}
                                icon={faChevronRight}
                                size={ButtonStyles.backButtonSize}
                            />
                        )}
                    />
                    {/* <List.Item
                    title="Notifications"
                    onPress={() => {
                        navigation.navigate('OnboardingScreen');
                    }}
                    titleStyle={{ color: colors.text, fontSize: 18 }}
                    right={() => (
                        <FontAwesomeIcon
                            color={colors.text}
                            style={ButtonStyles.backButtonIcon}
                            icon={faChevronRight}
                            size={ButtonStyles.backButtonSize}
                        />
                    )}
                /> */}
                </List.Section>
            </ScrollView>
            <List.Section>
                <List.Item
                    title="Terms of use"
                    onPress={() => navigation.navigate('TermsOfUseScreen')}
                    titleStyle={{ color: colors.text, fontSize: 15, fontFamily: 'Outfit-Bold' }}
                />
                <List.Item
                    title="Privacy policy"
                    onPress={() => navigation.navigate('PrivacyPolicyScreen')}
                    titleStyle={{ color: colors.text, fontSize: 15, fontFamily: 'Outfit-Bold' }}
                />
                <List.Item
                    title="Logout"
                    titleStyle={{ color: colors.text, fontSize: 15, fontFamily: 'Outfit-Bold' }}
                    onPress={logout}
                />
                <List.Item
                    title="Delete Account"
                    titleStyle={{ color: '#F84747', fontSize: 15, fontFamily: 'Outfit-Bold' }}
                    onPress={() => setModalVisible(!modalVisible)}
                />
            </List.Section>
            <Overlay
                animationType="slide"
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(!modalVisible)}
                fullScreen={true}
                overlayStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    elevation: 0,
                    margin: 0,
                }}
            >
                <View
                    style={{
                        flex: 0,
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        width: '100%',
                        borderRadius: 5,
                        backgroundColor: '#2F2F2F',
                        height: '30%',
                    }}
                >
                    <MemareeText style={{ color: colors.text, fontSize: 30 }}>
                        Delete your account?
                    </MemareeText>

                    <MemareeText style={{ color: colors.text, textAlign: 'center' }}>
                        All of your data and personal information will be
                        <MemareeText style={{ color: '#F84747' }}>
                            {' '}
                            permanently deleted{' '}
                        </MemareeText>{' '}
                        within 30 days.
                    </MemareeText>
                    <View
                        style={{
                            flex: 0,
                            justifyContent: 'space-around',
                            width: '100%',
                            flexDirection: 'row',
                        }}
                    >
                        <Button
                            labelStyle={{
                                color: colors.background,
                                fontFamily: 'Outfit-Bold',
                            }}
                            style={{
                                width: '40%',
                                backgroundColor: '#868686',
                                borderColor: '#868686',
                            }}
                            textColor={colors.background}
                            mode="outlined"
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={loadingRemove}
                            labelStyle={{
                                color: colors.background,
                                fontFamily: 'Outfit-Bold',
                            }}
                            style={{
                                width: '55%',
                                backgroundColor: colors.tertiary,
                                borderColor: colors.tertiary,
                            }}
                            textColor={colors.background}
                            mode="outlined"
                            onPress={() => {
                                removeUser({
                                    variables: {
                                        set: {
                                            removed: true,
                                        },
                                        query: {
                                            _id: userId,
                                        },
                                    },
                                    onCompleted: async () => {
                                        await deleteUser();
                                        logout();
                                    },
                                });
                            }}
                        >
                            {loadingRemove ? 'Removing...' : 'Delete Account'}
                        </Button>
                    </View>
                </View>
            </Overlay>
        </>
    );
};
export default SettingsScreen;
